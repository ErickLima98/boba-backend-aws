import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model, QueryBuilder, Transaction } from 'objection';
import { ICommonError } from '../core/interfaces/general-error.interface';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  /**
   * Abstracts logic for creating and rolling back a transaction
   *
   * @returns {Promise<Type>} Defined response, or iternal error if exception is thrown
   */
  async databaseTransaction<Type>(
    executeFunction: (t: Transaction) => Promise<Type>,
  ): Promise<Type> {
    const transaction: Transaction = await Model.startTransaction();
    try {
      const res: Type = await executeFunction(transaction);
      await transaction.commit(); // Commits transaction if everything goes right
      return res;
    } catch (err: any) {
      // Log errors
      if (err instanceof HttpException) {
        this.logger.error(err.message, err.stack, err.getResponse());
      } else {
        this.logger.error(err);
      }

      // Rollback transaction
      await transaction.rollback();

      // Parse error response
      if (!this.isCommonErrorObject(err)) {
        // Take into account if a unique attribute is duplicated (ie: existing email)
        if (err['name'] && err['name'] === 'UniqueViolationError') {
          // Throws parsed unique constraint error
          this.throwUniqueConstraintError(err);
        } else if (err['name'] && err['name'] === 'ForeignKeyViolationError') {
          // Throws parsed foreign key contraint error
          this.throwForeignKeyViolationError(err);
        } else {
          // If it isn't a unique constraint error, we throw a Internal Server Error
          // (the true error has already been logged)
          const error: ICommonError = {
            status_code: 500,
            message: 'Internal server error',
            validation_errors: [],
            error: 'Internal server error',
          };
          throw new InternalServerErrorException(error);
        }
      }
      throw new HttpException(err['response'], err['status']);
    }
  }

  /**
   * Method that forcefully finds one entity or raises a NotFoundException
   *
   * @param {Promise<Type>} query Find query
   * @returns {Promise<Type>} Query result if found. Else, raises exception
   */
  async forcefullyFindOne<Type>(
    query: QueryBuilder<Model, Model>,
  ): Promise<Type> {
    const result: Type = (await query) as Type;
    if (!result) {
      const error: ICommonError = {
        status_code: 404,
        message: `Can't find the specified${this.getResponseClassType(query)}`,
        validation_errors: [],
        error: 'Not Found',
      };
      throw new NotFoundException(error);
    }
    return result;
  }

  // PRIVATE METHODS
  /**
   * Method that determines if an error response has the structure
   * of the interface 'ICommonError'
   *
   * @param {any} obj Error response returned by the service
   * @returns {boolean} Boolean flag indicating if the error is of type ICommonError or not
   */
  private isCommonErrorObject(obj: any): boolean {
    if (obj.response) {
      obj = obj.response;
    }
    if (typeof obj !== 'object') {
      return false;
    }
    return 'status_code' in obj && 'message' in obj && 'error' in obj;
  }

  /**
   * Throws a readable / parsed response if a foreign key constraint error is caught
   * @param {any} err Unique constraint error
   */
  private throwForeignKeyViolationError(err: any) {
    let errorMessage: string = err.nativeError.detail;
    errorMessage = errorMessage
      .replace('(', '')
      .replace(')', '')
      .replace('"', '')
      .replace('"', '');
    errorMessage = errorMessage
      .replace('(', '')
      .replace(')', '')
      .replace('Key ', '')
      .replace('=', ' ');
    const error: ICommonError = {
      message: errorMessage,
      status_code: 400,
      validation_errors: [],
      error: 'Bad Request',
    };
    throw new BadRequestException(error);
  }

  /**
   * Throws a readable / parsed response if a unique constraint error is caught
   * @param {any} err Unique constraint error
   */
  private throwUniqueConstraintError(err: any) {
    // Initialize variables
    let validationErrors: object[];
    let errorMessage: string = '';
    let badRequest = true;

    // Check if the error response indicates which unique attributes are being duplicated
    if (err['columns']) {
      validationErrors = err['columns'].map((col: string) => {
        return {
          [col]: ['A record with the specified value already exists'],
        };
      });
    } else {
      badRequest = false;
      errorMessage = 'Duplicate record';
    }

    // Instantiate error
    const error: ICommonError = {
      status_code: badRequest ? 400 : 422,
      message: errorMessage,
      validation_errors: validationErrors,
      error: badRequest ? 'Bad request' : 'Unprocessable Entity',
    };

    // Throw error
    if (badRequest) {
      throw new BadRequestException(error);
    }
    throw new UnprocessableEntityException(error);
  }

  private getResponseClassType(query: QueryBuilder<Model, Model>) {
    try {
      const classType: string = query.modelClass().toString();
      return classType
        .split(' ')[1]
        .replace('Entity', '')
        .replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
        .replace('Entity', '');
    } catch (e) {
      return ' entity';
    }
  }
}

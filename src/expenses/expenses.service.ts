import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesQueryDto } from './dto/query-expense.dto';
import { CommonService } from 'src/core/commons/common-service';
import { ExpenseEntity } from 'src/database/entities/expense.entity';
import { ModelClass, OrderByDescriptor } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';
import { isAfter, parse } from 'date-fns';
import { ICommonError } from 'src/core/interfaces/general-error.interface';
import { RangeDaysDTO } from 'src/sales/dto/range-days.dto';

@Injectable()
export class ExpensesService extends CommonService {
  constructor(
    @Inject(ExpenseEntity.name)
    private expensesService: ModelClass<ExpenseEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(ExpensesService.name);
  }

  async create(createExpenseDto: CreateExpenseDto) {
    return this.databaseService.databaseTransaction<ExpenseEntity>(
      async (trx) => {
        const expense: ExpenseEntity = await this.expensesService
          .query(trx)
          .insert(createExpenseDto);
        return await ExpenseEntity.getFullEntityData(expense.$id(), trx);
      },
    );
  }

  async findAll(query: ExpensesQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.expensesService
      .query()
      .select(ExpenseEntity.paginationAttributes)
      .where((builder) => ExpenseEntity.filters(query, builder))
      .andWhere({ is_inactive: false })
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async listExpensesPerDate(rangeDaysDto: RangeDaysDTO) {
    const dateFormat = 'dd-MM-yyyy';

    const startDate = parse(rangeDaysDto.start_date, dateFormat, new Date());
    const endDate = parse(rangeDaysDto.end_date, dateFormat, new Date());

    if (isAfter(startDate, endDate)) {
      const error: ICommonError = {
        status_code: 409,
        message: 'End date must be greater than or equal to start date',
        validation_errors: [],
        error: 'Conflict',
      };
      throw new ConflictException(error);
    }
    return await ExpenseEntity.query()
      .select(ExpenseEntity.paginationAttributes)
      .whereBetween('expenses.expense_date', [
        rangeDaysDto.start_date,
        rangeDaysDto.end_date,
      ])
      .andWhere('expenses.is_inactive', false)
      .orderBy('expenses.expense_date')
      .orderBy('expenses.expense_hour');
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<ExpenseEntity>(
      ExpenseEntity.getFullEntityData(id),
    );
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.databaseService.databaseTransaction<ExpenseEntity>(
      async (trx) => {
        const expense: ExpenseEntity =
          await this.databaseService.forcefullyFindOne<ExpenseEntity>(
            this.expensesService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await expense.$query(trx).update(updateExpenseDto);
        return await ExpenseEntity.getFullEntityData(id, trx);
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<ExpenseEntity>(
      async (trx) => {
        const expense: ExpenseEntity =
          await this.databaseService.forcefullyFindOne<ExpenseEntity>(
            this.expensesService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await expense.$query(trx).update({ is_inactive: true });
        return expense;
      },
    );
  }
}

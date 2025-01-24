import { Logger } from '@nestjs/common';
import { Model, OrderByDirection, Page, QueryBuilder } from 'objection';
import { CommonQueryDto } from './common-query.dto';
import { PaginationQueryConverted } from './pagination-query-converted';
import { ObjectionOrderByParams } from './objection-order-by-params';
import { PaginatedResponse } from './paginated-response';

export abstract class CommonService {
  constructor(serviceName: string) {
    this.logger = new Logger(serviceName);
  }

  logger: Logger;

  /**
   * Method that evaluates if the request has pagination
   *
   *
   * @param {CommonQueryDto} query dto with pagination
   * @param {string} defaultOrder Default order to be used, has default: 'created_at:desc'
   * @returns {PaginationQueryConverted} Query options with not null response
   */
  paginatedResponse(
    query: CommonQueryDto,
    defaultOrder: string = 'created_at:desc',
    defaultLimit: number = 100,
  ): PaginationQueryConverted {
    const orderString: string = query.order_by ? query.order_by : defaultOrder;
    let limit: string | number;
    if (query.limit && +query.limit === -1) {
      limit = 'all';
    } else {
      limit = query.limit ? +query.limit : defaultLimit;
    }
    const page: number = query.page ? +query.page - 1 : 0;
    return new PaginationQueryConverted(
      limit,
      page,
      this.convertOrderParams(orderString),
    );
  }

  /**
   * Method that returns the data with pagination options
   *
   * @param {Page<Model>} response response with data and pagination options
   * @param {PaginationQueryConverted} paginationOptions defined limit and page values
   * @returns {PaginatedResponse<Type>} metadata and pagination options
   */
  generateMetaResponse<Type>(
    response: Page<Model>,
    paginationOptions: PaginationQueryConverted,
  ): PaginatedResponse<Type> {
    const isPaginated = typeof paginationOptions.limit === 'number';
    return new PaginatedResponse(
      response.results as Type[],
      response.total,
      isPaginated ? +paginationOptions.limit : 'all',
      isPaginated ? paginationOptions.page + 1 : 1,
      isPaginated ? Math.ceil(response.total / +paginationOptions.limit) : 1,
    );
  }

  /**
   * Method that paginates the results with multiple entities
   *
   * @param {QueryBuilder<Model, Model[]>} queryBuilder query to paginate
   * @param {PaginationQueryConverted} paginationOptions Pagination options
   * @returns {Promise<Page<Model>>} Paginated entities
   */
  async paginateBuilderResults(
    queryBuilder: QueryBuilder<Model, Model[]>,
    paginationOptions: PaginationQueryConverted,
  ): Promise<Page<Model>> {
    // If there's a pagination limit, we paginate the results
    if (typeof paginationOptions.limit === 'number') {
      return await queryBuilder.page(
        paginationOptions.page,
        paginationOptions.limit,
      );
    }
    // If there's no pagination limit, we return all results
    return await queryBuilder.range();
  }

  /**
   * Method that removes accents from a string
   *
   * @param {string} value String to unaccent
   * @returns {string} Unnaccented string
   */
  unaccentString(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // PRIVATE METHODS
  /**
   * Method that converts a formatted order string, to an array of
   * order-by-objects that work with objection
   *
   * @param {string} orderBy formatted string (ie: 'attribute:asc,attribute_2:desc')
   * @returns {ObjectionOrderBy[]} Array containing array of order-by objects
   */
  private convertOrderParams(orderBy: string): ObjectionOrderByParams[] {
    const response: ObjectionOrderByParams[] = [];
    const orders = orderBy.split(',');
    orders.forEach((order) => {
      const filters = order.split(':');
      response.push(
        new ObjectionOrderByParams(
          filters[0],
          this.isTypeOfOrderByDirection(filters[1]) ? filters[1] : 'DESC',
          'last',
        ),
      );
    });
    return response;
  }

  /**
   * Method that determintes if the specified order set in the request is part
   * of the order-values allowed by objection
   *
   * @param {string} input Specified order value
   * @returns {boolean} Boolean indicating if the specified order value is valid or not
   */
  private isTypeOfOrderByDirection(input: string): input is OrderByDirection {
    return ['asc', 'desc', 'ASC', 'DESC'].includes(input);
  }
}

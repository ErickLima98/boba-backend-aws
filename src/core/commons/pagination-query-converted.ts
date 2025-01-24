import { ObjectionOrderByParams } from './objection-order-by-params';

export class PaginationQueryConverted {
  constructor(
    limit: number | string,
    page: number,
    orderBy: ObjectionOrderByParams[],
  ) {
    this.limit = limit;
    this.page = page;
    this.orderBy = orderBy;
  }

  limit: number | string;
  page: number;
  orderBy: ObjectionOrderByParams[];
}

import { OrderByDirection } from 'objection';

export class ObjectionOrderByParams {
  constructor(column: string, order: OrderByDirection, nulls: string) {
    this.column = column;
    this.order = order;
    this.nulls = nulls;
  }

  column: string;
  order: OrderByDirection;
  nulls: string;
}

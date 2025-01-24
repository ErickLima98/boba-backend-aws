import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateInventoryHistoryDto } from './dto/create-inventory-history.dto';
import { CommonService } from 'src/core/commons/common-service';
import { InventoryHistoryEntity } from 'src/database/entities/inventory-history.entity';
import { ModelClass } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { RangeDaysDTO } from './dto/range-days.dto';
import { isAfter, parse } from 'date-fns';
import { ICommonError } from 'src/core/interfaces/general-error.interface';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';
import { InventoryHistoryQueryDto } from './dto/query-inventory-history.dto';
import { UpdateInventoryHistoryDto } from './dto/update-inventory-history.dto';
@Injectable()
export class InventoryHistoryService extends CommonService {
  constructor(
    @Inject(InventoryHistoryEntity.name)
    private inventoryHistoryService: ModelClass<InventoryHistoryEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(InventoryHistoryService.name);
  }

  async create(createInventoryHistoryDto: CreateInventoryHistoryDto) {
    return this.databaseService.databaseTransaction(async (trx) => {
      const {
        user_id: userId,
        current_cash: currentCash,
        products,
      } = createInventoryHistoryDto;
      if (
        createInventoryHistoryDto.products &&
        createInventoryHistoryDto.products.length > 0
      ) {
        for (const product of products) {
          await this.inventoryHistoryService.query(trx).insert({
            user_id: userId,
            current_cash: currentCash,
            ...product,
          });
        }
      }
      return {};
    });
  }

  async findAll(query: InventoryHistoryQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.inventoryHistoryService
      .query()
      .select(InventoryHistoryEntity.paginationAttributes)
      .where((builder) => InventoryHistoryEntity.filters(query, builder))
      .andWhere({ is_inactive: false });
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async listPerDay(rangeDaysDto: RangeDaysDTO) {
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

    return await this.inventoryHistoryService
      .query()
      .select(InventoryHistoryEntity.paginationAttributes)
      .whereBetween('inventory_history.ingresed_product_date', [
        rangeDaysDto.start_date,
        rangeDaysDto.end_date,
      ])
      .orderBy('inventory_history.ingresed_product_date');
  }

  async update(
    id: string,
    updateInventoryHistoryDto: UpdateInventoryHistoryDto,
  ) {
    return this.databaseService.databaseTransaction<InventoryHistoryEntity>(
      async (trx) => {
        const inventoryHistory: InventoryHistoryEntity =
          await this.databaseService.forcefullyFindOne<InventoryHistoryEntity>(
            this.inventoryHistoryService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await inventoryHistory.$query(trx).update(updateInventoryHistoryDto);
        return await InventoryHistoryEntity.getFullEntityData(id, trx);
      },
    );
  }

  async remove(id: number) {
    return this.databaseService.databaseTransaction<InventoryHistoryEntity>(
      async (trx) => {
        const inventoryHistory: InventoryHistoryEntity =
          await this.databaseService.forcefullyFindOne<InventoryHistoryEntity>(
            this.inventoryHistoryService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await inventoryHistory.$query(trx).update({ is_inactive: true });
        return inventoryHistory;
      },
    );
  }
}

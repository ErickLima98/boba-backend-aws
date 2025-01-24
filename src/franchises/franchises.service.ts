import { Inject, Injectable } from '@nestjs/common';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { CommonService } from 'src/core/commons/common-service';
import { FranchiseEntity } from 'src/database/entities/franchise.entity';
import { ModelClass, OrderByDescriptor } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { FranchiseQueryDto } from './dto/query-franchise.dto';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';

@Injectable()
export class FranchisesService extends CommonService {
  constructor(
    @Inject(FranchiseEntity.name)
    private franchiseService: ModelClass<FranchiseEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(FranchisesService.name);
  }

  async create(createFranchiseDto: CreateFranchiseDto) {
    return this.databaseService.databaseTransaction<FranchiseEntity>(
      async (trx) => {
        const franchise: FranchiseEntity = await this.franchiseService
          .query(trx)
          .insert(createFranchiseDto);
        return await FranchiseEntity.getFullEntityData(franchise.$id(), trx);
      },
    );
  }

  async findAll(query: FranchiseQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.franchiseService
      .query()
      .select(FranchiseEntity.paginationAttributes)
      .where((builder) => FranchiseEntity.filters(query, builder))
      .andWhere({ is_inactive: false })
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<FranchiseEntity>(
      FranchiseEntity.getFullEntityData(id),
    );
  }

  update(id: string, updateFranchiseDto: UpdateFranchiseDto) {
    return this.databaseService.databaseTransaction<FranchiseEntity>(
      async (trx) => {
        const franchise: FranchiseEntity =
          await this.databaseService.forcefullyFindOne<FranchiseEntity>(
            this.franchiseService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await franchise.$query(trx).update(updateFranchiseDto);
        return await FranchiseEntity.getFullEntityData(id, trx);
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<FranchiseEntity>(
      async (trx) => {
        const franchise: FranchiseEntity =
          await this.databaseService.forcefullyFindOne<FranchiseEntity>(
            this.franchiseService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await franchise.$query(trx).update({ is_inactive: true });
        return franchise;
      },
    );
  }
}

import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { CommonService } from 'src/core/commons/common-service';
import { SaleEntity } from 'src/database/entities/sale.entity';
import { ModelClass, OrderByDescriptor, Transaction } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { BeveragePreOrdersService } from 'src/beverage-pre-orders/beverage-pre-orders.service';
import { FoodPreOrdersService } from 'src/food-pre-orders/food-pre-orders.service';
import { BeverageEntity } from 'src/database/entities/beverage.entity';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';
import { SalesQueryDto } from './dto/query-sale.dto';
import { FoodEntity } from 'src/database/entities/food.entity';
import { BeveragePreOrderEntity } from 'src/database/entities/beverage-pre-order.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { FoodPreOrderEntity } from 'src/database/entities/food-pre-order.entity';
import { RangeDaysDTO } from './dto/range-days.dto';
import { ICommonError } from 'src/core/interfaces/general-error.interface';
import { isAfter, parse } from 'date-fns';
import { DiscountInventoyDto } from './dto/update-inventory.dto';
import { SumInventoyDto } from './dto/sum-inventory.dto';

@Injectable()
export class SalesService extends CommonService {
  constructor(
    @Inject(SaleEntity.name)
    private salesService: ModelClass<SaleEntity>,
    private readonly databaseService: DatabaseService,
    private readonly beveragePreOrderService: BeveragePreOrdersService,
    private readonly foodPreOrderService: FoodPreOrdersService,
    @Inject(ProductEntity.name)
    private productService: ModelClass<ProductEntity>,
    @Inject(BeverageEntity.name)
    private beverageService: ModelClass<BeverageEntity>,
    @Inject(BeveragePreOrderEntity.name)
    private beveragePreOrdersServices: ModelClass<BeveragePreOrderEntity>,
    @Inject(FoodPreOrderEntity.name)
    private foodPreOrdersServices: ModelClass<FoodPreOrderEntity>,
    @Inject(FoodEntity.name)
    private foodService: ModelClass<FoodEntity>,
  ) {
    super(SalesService.name);
  }

  async create(createSaleDto: CreateSaleDto) {
    return this.databaseService.databaseTransaction<SaleEntity>(async (trx) => {
      const {
        beverages,
        foods,
        total_beverage: totalBeverages,
        total_food: totalFoods,
        total_sale: totalSale,
        ...saleDto
      } = createSaleDto;
      const sale: SaleEntity = await this.salesService.query(trx).insert({
        ...saleDto,
        total: 0,
      });

      // get beverages
      for (const bevera of beverages) {
        // beverage pre-order
        await this.beveragePreOrderService.create(
          bevera,
          sale,
          totalBeverages,
          trx,
        );
      }

      // get food
      if (foods && foods.length > 0) {
        for (const foo of foods) {
          // food pre-order
          await this.foodPreOrderService.create(foo, sale, totalFoods, trx);
        }
      }

      // Actualizar total de la venta
      await sale.$query(trx).update({ total: totalSale });
      return await SaleEntity.getFullEntityData(sale.$id(), trx);
    });
  }

  async findAll(query: SalesQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.salesService
      .query()
      .select(SaleEntity.paginationAttributes)
      .where((builder) => SaleEntity.filters(query, builder))
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<SaleEntity>(
      SaleEntity.getFullEntityData(id),
    );
  }

  async listSalesPerDate(rangeDaysDto: RangeDaysDTO) {
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
    return await SaleEntity.query()
      .select(SaleEntity.paginationAttributes)
      .whereBetween('sales.sale_date', [
        rangeDaysDto.start_date,
        rangeDaysDto.end_date,
      ])
      .orderBy('sales.sale_date')
      .orderBy('sales.sale_hour');
  }

  async listSalesPerMonth(month: string, year: string) {
    return await SaleEntity.query()
      .select(SaleEntity.paginationAttributes)
      .whereRaw('EXTRACT(MONTH FROM "created_at") = ?', [month])
      .andWhereRaw('EXTRACT(YEAR FROM "created_at") = ?', [year])
      .andWhere('is_inactive', false);
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    return this.databaseService.databaseTransaction<SaleEntity>(async (trx) => {
      const { beverages, foods, ...saledto } = updateSaleDto;
      const sale = await this.databaseService.forcefullyFindOne<SaleEntity>(
        this.salesService.query(trx).findById(id),
      );
      await sale.$query(trx).update(saledto);
      if (beverages && beverages.length > 0) {
        await this.beveragePreOrderService.update(sale, beverages, trx);
      }
      if (foods && foods.length > 0) {
        await this.foodPreOrderService.update(sale, foods, trx);
      }
      return await SaleEntity.getFullEntityData(id, trx);
    });
  }

  async discountInventory(discountInventoyDto: DiscountInventoyDto[]) {
    return this.databaseService.databaseTransaction<ProductEntity>(
      async (trx) => {
        let productToDiscount: ProductEntity | PromiseLike<ProductEntity>;
        for (const product of discountInventoyDto) {
          productToDiscount =
            await this.databaseService.forcefullyFindOne<ProductEntity>(
              this.productService.query(trx).findById(product.id),
            );
          await productToDiscount
            .$query(trx)
            .update({ amount: productToDiscount.amount - product.amount });
        }
        return productToDiscount;
      },
    );
  }

  async sumInventory(sumInventoryDto: SumInventoyDto[]) {
    return this.databaseService.databaseTransaction<ProductEntity>(
      async (trx) => {
        let productToSum: ProductEntity | PromiseLike<ProductEntity>;
        for (const product of sumInventoryDto) {
          productToSum =
            await this.databaseService.forcefullyFindOne<ProductEntity>(
              this.productService.query(trx).findById(product.id),
            );
          await productToSum
            .$query(trx)
            .update({ amount: productToSum.amount + product.amount });
        }
        return productToSum;
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<SaleEntity>(async (trx) => {
      // Obtener la venta
      const sale: SaleEntity =
        await this.databaseService.forcefullyFindOne<SaleEntity>(
          this.salesService
            .query(trx)
            .findById(id)
            .where({ is_inactive: false }),
        );

      // Obtener las pre-ordenes de bebidas asociadas a la venta
      const beveragePreOrders: BeveragePreOrderEntity[] =
        await this.beveragePreOrdersServices
          .query(trx)
          .where('sale_id', sale.id);

      // Obtener las pre-ordenes de comidas asociadas a la venta
      const foodPreOrders: FoodPreOrderEntity[] =
        await this.foodPreOrdersServices.query(trx).where('sale_id', sale.id);

      // Revertir las cantidades descontadas de las pre-ordenes de bebidas
      for (const bevera of beveragePreOrders) {
        const pajillas = await this.productService.query(trx).findById(1);
        const servilletas = await this.productService.query(trx).findById(2);

        if (
          bevera.coverage_type === BeveragePreOrderEntity.coverageTypeEnum[0]
        ) {
          const sellos = await this.productService.query(trx).findById(97);
          const amountToRevert = sellos.used_amount * bevera.amount;

          await sellos.$query(trx).update({
            amount: sellos.amount + amountToRevert,
          });
        } else if (
          bevera.coverage_type === BeveragePreOrderEntity.coverageTypeEnum[1]
        ) {
          const domos = await this.productService.query(trx).findById(98);
          const amountToRevert = domos.used_amount * bevera.amount;

          await domos.$query(trx).update({
            amount: domos.amount + amountToRevert,
          });
        }

        if (
          bevera.beverage_size === BeveragePreOrderEntity.beverageSizeEnum[0]
        ) {
          const vasoMedium = await this.productService.query(trx).findById(3);
          const amountToRevert = vasoMedium.used_amount * bevera.amount;

          await vasoMedium.$query(trx).update({
            amount: vasoMedium.amount + amountToRevert,
          });
        } else {
          const vasoLarge = await this.productService.query(trx).findById(4);
          const amountToRevertVasoLarge = vasoLarge.used_amount * bevera.amount;

          await vasoLarge
            .$query(trx)
            .update({ amount: vasoLarge.amount + amountToRevertVasoLarge });
        }

        if (bevera.product_id) {
          const bobaUsed = await this.productService
            .query(trx)
            .findById(bevera.product_id);
          const usedAmount = bobaUsed.used_amount ?? 45;
          const bobaMultiplier =
            bevera.extra_boba && bevera.extra_boba > 0
              ? 1 + bevera.extra_boba
              : 1;
          const totalBobaAmount = usedAmount * bobaMultiplier;

          const revertAmount =
            bobaUsed.amount + totalBobaAmount * bevera.amount;
          // Revertir las cantidades de los ingredientes utilizados
          await bobaUsed.$query(trx).update({ amount: revertAmount });
        }

        const amountToRevertPajillas = pajillas.used_amount * bevera.amount;
        await pajillas
          .$query(trx)
          .update({ amount: pajillas.amount + amountToRevertPajillas });

        const amountToRevertServilletas =
          servilletas.used_amount * bevera.amount;
        await servilletas
          .$query(trx)
          .update({ amount: servilletas.amount + amountToRevertServilletas });

        // Revertir los productos del inventario
        await this.revertProducts(bevera, sale, trx);
      }

      // Revertir las cantidades descontadas de las pre-ordenes de comidas
      if (foodPreOrders.length > 0) {
        for (const foo of foodPreOrders) {
          const food = await this.foodService.query(trx).findById(foo.food_id);
          await food.$query(trx).update({ amount: food.amount + foo.amount });
        }
      }
      // Marcar la venta como inactiva
      await sale.$query(trx).update({ is_inactive: true });

      return sale;
    });
  }

  async revertProducts(
    beveragePreOrder: BeveragePreOrderEntity,
    sale: SaleEntity,
    trx: Transaction,
  ) {
    const beverage = await this.beverageService
      .query(trx)
      .findById(beveragePreOrder.beverage_id);

    let recipe: { id: number; amount_medium: number; amount_large: number }[];

    if (
      typeof beverage.recipe !== 'undefined' &&
      beverage.recipe &&
      beverage.recipe.length > 0
    ) {
      recipe =
        typeof beverage.recipe === 'string'
          ? JSON.parse(beverage.recipe)
          : beverage.recipe;
    }
    if (typeof recipe !== 'undefined' && recipe.length > 0) {
      for (const element of recipe) {
        this.logger.log(`Element: ${element}`);
        this.logger.log(`Processing product ID: ${element.id}`);
        const product = await this.productService
          .query(trx)
          .findById(Number(element.id));

        if (!product) {
          this.logger.log('Product not present into Database');
        }

        const amountToDiscount = Math.ceil(
          (beveragePreOrder.beverage_size ===
          BeveragePreOrderEntity.beverageSizeEnum[0]
            ? element.amount_medium
            : element.amount_large) * beveragePreOrder.amount,
        );
        await product
          .$query(trx)
          .update({ amount: product.amount + amountToDiscount });
      }
    } else {
      this.logger.log('The used beverage has no recipe');
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateBeveragePreOrderDto } from './dto/create-beverage-pre-order.dto';
import { UpdateBeveragePreOrderDto } from './dto/update-beverage-pre-order.dto';
import { CommonService } from 'src/core/commons/common-service';
import { BeveragePreOrderEntity } from 'src/database/entities/beverage-pre-order.entity';
import { ModelClass, Transaction } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { SaleEntity } from 'src/database/entities/sale.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { BeverageProductEntity } from 'src/database/entities/beverage-product.entity';
import { BeverageEntity } from 'src/database/entities/beverage.entity';

@Injectable()
export class BeveragePreOrdersService extends CommonService {
  constructor(
    @Inject(BeveragePreOrderEntity.name)
    private beveragePreOrdersService: ModelClass<BeveragePreOrderEntity>,
    private readonly databaseService: DatabaseService,
    @Inject(ProductEntity.name)
    private productService: ModelClass<ProductEntity>,
    @Inject(BeverageProductEntity.name)
    private beverageProductService: ModelClass<BeverageProductEntity>,
    @Inject(BeverageEntity.name)
    private beverageService: ModelClass<BeverageEntity>,
  ) {
    super(BeveragePreOrdersService.name);
  }

  async create(
    createBeveragePreOrderDto: CreateBeveragePreOrderDto,
    sale: SaleEntity,
    totalBeverageSale: number,
    trx: Transaction,
  ) {
    const { product_id: productId, ...beveragePreOrderDto } =
      createBeveragePreOrderDto;

    let bobaUsed: ProductEntity;
    if (productId !== null || productId !== undefined) {
      bobaUsed = await this.productService.query(trx).findById(productId);
    }
    const pajillas = await this.productService.query(trx).findById(1);
    const servilletas = await this.productService.query(trx).findById(2);

    if (
      beveragePreOrderDto.coverage_type ===
      BeveragePreOrderEntity.coverageTypeEnum[0]
    ) {
      const sellos = await this.productService.query(trx).findById(97);
      const amountToDiscount = sellos.used_amount * beveragePreOrderDto.amount;
      await sellos.$query(trx).update({
        amount: sellos.amount - amountToDiscount,
      });
    } else if (
      beveragePreOrderDto.coverage_type ===
      BeveragePreOrderEntity.coverageTypeEnum[1]
    ) {
      const domos = await this.productService.query(trx).findById(98);
      const amountToDiscount = domos.used_amount * beveragePreOrderDto.amount;
      await domos.$query(trx).update({
        amount: domos.amount - amountToDiscount,
      });
    }

    if (
      beveragePreOrderDto.beverage_size ===
      BeveragePreOrderEntity.beverageSizeEnum[0]
    ) {
      const vasoMedium = await this.productService.query(trx).findById(3);
      const amountToDiscount =
        vasoMedium.used_amount * beveragePreOrderDto.amount;

      await vasoMedium.$query(trx).update({
        amount: vasoMedium.amount - amountToDiscount,
      });
    } else {
      const vasoLarge = await this.productService.query(trx).findById(4);
      const amountToDiscountVasoLarge =
        vasoLarge.used_amount * beveragePreOrderDto.amount;

      await vasoLarge
        .$query(trx)
        .update({ amount: vasoLarge.amount - amountToDiscountVasoLarge });
    }

    if (bobaUsed) {
      const usedAmount = bobaUsed.used_amount ?? 45;
      const bobaMultiplier =
        beveragePreOrderDto.extra_boba && beveragePreOrderDto.extra_boba > 0
          ? 1 + beveragePreOrderDto.extra_boba
          : 1;
      const totalBobaAmount = usedAmount * bobaMultiplier;

      const updateAmount =
        bobaUsed.amount - totalBobaAmount * beveragePreOrderDto.amount;

      //Automatic discount the used boba/jelly from products
      await bobaUsed.$query(trx).update({ amount: updateAmount });
    }

    const amountToDiscountPajillas =
      pajillas.used_amount * beveragePreOrderDto.amount;
    await pajillas
      .$query(trx)
      .update({ amount: pajillas.amount - amountToDiscountPajillas });

    const amountToDiscountServilletas =
      servilletas.used_amount * beveragePreOrderDto.amount;
    await servilletas
      .$query(trx)
      .update({ amount: servilletas.amount - amountToDiscountServilletas });

    //discount products used into the recipe, from inventory
    const beverage = await this.beverageService
      .query(trx)
      .findById(beveragePreOrderDto.beverage_id);

    if (
      beverage.recipe &&
      beverage.recipe.length > 0 &&
      Object.entries(beverage.recipe).length !== 0
    ) {
      console.log(beverage.recipe);
      await this.discountProducts(createBeveragePreOrderDto, beverage, trx);
    }

    return sale.$relatedQuery('beverage_pre_orders', trx).insert({
      ...beveragePreOrderDto,
      total: totalBeverageSale,
      product_id: productId,
    });
  }

  async discountProducts(
    beveragePreOrder: CreateBeveragePreOrderDto,
    beverage: BeverageEntity,
    trx: Transaction,
  ) {
    let recipe: { id: number; amount_medium?: number; amount_large?: number }[];

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
          .update({ amount: product.amount - amountToDiscount });
      }
    } else {
      this.logger.log('The used beverage has no recipe');
    }
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<BeveragePreOrderEntity>(
      BeveragePreOrderEntity.getFullEntityData(id),
    );
  }

  async update(
    sale: SaleEntity,
    updateBeveragePreOrderDto: UpdateBeveragePreOrderDto[],
    trx?: Transaction | null,
  ) {
    await this.deleteNotIncludedOrders(sale, updateBeveragePreOrderDto, trx);
    if (updateBeveragePreOrderDto && updateBeveragePreOrderDto.length > 0) {
      await sale
        .$relatedQuery('beverage_pre_orders', trx)
        .insert(updateBeveragePreOrderDto)
        .onConflict('id')
        .merge();
    }
  }

  private async deleteNotIncludedOrders(
    sale: SaleEntity,
    updateBeveragePreOrderDto: UpdateBeveragePreOrderDto[],
    trx: Transaction,
  ) {
    const existingOrderIds: string[] = await this.beveragePreOrdersService
      .query(trx)
      .select('id')
      .where('sale_id', sale.id)
      .then((items) => items.map((item) => item.$id()));

    const dtoOrdersIds: string[] = updateBeveragePreOrderDto.map(
      (detail) => detail.id,
    );
    const idsToDelete: string[] = existingOrderIds.filter(
      (item) => !dtoOrdersIds.includes(item),
    );

    if (idsToDelete && idsToDelete.length > 0) {
      await this.beveragePreOrdersService
        .query(trx)
        .delete()
        .whereIn('id', idsToDelete);
    }
  }
}

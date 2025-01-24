import { PartialType } from '@nestjs/swagger';
import { CreateBeverageProductDto } from './create-beverage-product.dto';

export class UpdateBeverageProductDto extends PartialType(
  CreateBeverageProductDto,
) {}

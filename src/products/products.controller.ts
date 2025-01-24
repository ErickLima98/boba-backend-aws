import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { ProductQueryDto } from './dto/query-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body(new ErrorValidationPipe()) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

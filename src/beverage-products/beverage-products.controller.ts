import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { BeverageProductsService } from './beverage-products.service';
import { CreateBeverageProductDto } from './dto/create-beverage-product.dto';
import { UpdateBeverageProductDto } from './dto/update-beverage-product.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { BeverageProductQueryDto } from './dto/query-beverage-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@ApiTags('beverage-products')
@Controller('beverage-products')
export class BeverageProductsController {
  constructor(
    private readonly beverageProductsService: BeverageProductsService,
  ) {}

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body(new ErrorValidationPipe())
    createBeverageProductDto: CreateBeverageProductDto,
  ) {
    return this.beverageProductsService.create(createBeverageProductDto);
  }

  @Roles(ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query() query: BeverageProductQueryDto) {
    return this.beverageProductsService.findAll(query);
  }

  @Roles(ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beverageProductsService.findOne(id);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe())
    updateBeverageProductDto: UpdateBeverageProductDto,
  ) {
    return this.beverageProductsService.update(id, updateBeverageProductDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.beverageProductsService.remove(id);
  }
}

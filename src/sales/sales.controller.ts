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
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { SalesQueryDto } from './dto/query-sale.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RangeDaysDTO } from './dto/range-days.dto';
import { DiscountInventoyDto } from './dto/update-inventory.dto';
import { SumInventoyDto } from './dto/sum-inventory.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body(new ErrorValidationPipe()) createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('sales-per-date')
  listSalesPerDate(@Query() rangeDaysDto: RangeDaysDTO) {
    return this.salesService.listSalesPerDate(rangeDaysDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('sales-per-month')
  listSalesPerMonth(
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.salesService.listSalesPerMonth(month, year);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query() query: SalesQueryDto) {
    return this.salesService.findAll(query);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('discount-inventory')
  @HttpCode(204)
  dicountInventory(@Body() discountInventoryDto: DiscountInventoyDto[]) {
    return this.salesService.discountInventory(discountInventoryDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('sum-inventory')
  @HttpCode(204)
  sumInventory(@Body() sumInventoryDto: SumInventoyDto[]) {
    return this.salesService.sumInventory(sumInventoryDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe()) createSaleDto: CreateSaleDto,
  ) {
    return this.salesService.update(id, createSaleDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}

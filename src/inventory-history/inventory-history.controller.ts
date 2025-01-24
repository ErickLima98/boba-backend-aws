import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import { InventoryHistoryService } from './inventory-history.service';
import { CreateInventoryHistoryDto } from './dto/create-inventory-history.dto';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { RangeDaysDTO } from './dto/range-days.dto';
import { InventoryHistoryQueryDto } from './dto/query-inventory-history.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { UpdateInventoryHistoryDto } from './dto/update-inventory-history.dto';

@Controller('inventory-history')
export class InventoryHistoryController {
  constructor(
    private readonly inventoryHistoryService: InventoryHistoryService,
  ) {}

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(204)
  @Post()
  create(
    @Body(new ErrorValidationPipe())
    createInventoryHistoryDto: CreateInventoryHistoryDto,
  ) {
    return this.inventoryHistoryService.create(createInventoryHistoryDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('inventory-history-per-date')
  listPerDay(@Query() rangeDaysDto: RangeDaysDTO) {
    return this.inventoryHistoryService.listPerDay(rangeDaysDto);
  }

  @Get()
  findAll(@Query() query: InventoryHistoryQueryDto) {
    return this.inventoryHistoryService.findAll(query);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe())
    updateInventoryHistoryDto: UpdateInventoryHistoryDto,
  ) {
    return this.inventoryHistoryService.update(id, updateInventoryHistoryDto);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryHistoryService.remove(+id);
  }
}

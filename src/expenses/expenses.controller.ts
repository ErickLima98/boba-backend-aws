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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { ExpensesQueryDto } from './dto/query-expense.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { RangeDaysDTO } from 'src/sales/dto/range-days.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body(new ErrorValidationPipe()) createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query() query: ExpensesQueryDto) {
    return this.expensesService.findAll(query);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('expenses-per-date')
  listExpensesPerDate(@Query() rangeDaysDto: RangeDaysDTO) {
    return this.expensesService.listExpensesPerDate(rangeDaysDto);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe()) updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}

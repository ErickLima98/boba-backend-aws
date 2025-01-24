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
import { BeveragesService } from './beverages.service';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { BeverageQueryDto } from './dto/query-beverage.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@ApiTags('beverages')
@Controller('beverages')
export class BeveragesController {
  constructor(private readonly beveragesService: BeveragesService) {}

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(
    @Body(new ErrorValidationPipe()) createBeverageDto: CreateBeverageDto,
  ) {
    return this.beveragesService.create(createBeverageDto);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query() query: BeverageQueryDto) {
    return this.beveragesService.findAll(query);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beveragesService.findOne(id);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe()) updateBeverageDto: UpdateBeverageDto,
  ) {
    return this.beveragesService.update(id, updateBeverageDto);
  }

  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.beveragesService.remove(id);
  }
}

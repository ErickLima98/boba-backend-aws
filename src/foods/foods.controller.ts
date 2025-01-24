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
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodQueryDto } from './dto/query-food.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Query() query: FoodQueryDto) {
    return this.foodsService.findAll(query);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL, ROLES.OPERADOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Roles(ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENCIAL)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}

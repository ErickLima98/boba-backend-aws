import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FranchisesService } from './franchises.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { ErrorValidationPipe } from 'src/core/pipes/custom-validator.pipe';
import { FranchiseQueryDto } from './dto/query-franchise.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ROLES } from 'src/core/enums/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('franchises')
@Controller('franchises')
@Roles(ROLES.SUPER_ADMIN)
@UseGuards(JwtAuthGuard, RoleGuard)
export class FranchisesController {
  constructor(private readonly franchisesService: FranchisesService) {}

  @Post()
  create(
    @Body(new ErrorValidationPipe()) createFranchiseDto: CreateFranchiseDto,
  ) {
    return this.franchisesService.create(createFranchiseDto);
  }

  @Get()
  findAll(@Query() query: FranchiseQueryDto) {
    return this.franchisesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchisesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ErrorValidationPipe()) updateFranchiseDto: UpdateFranchiseDto,
  ) {
    return this.franchisesService.update(id, updateFranchiseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.franchisesService.remove(id);
  }
}

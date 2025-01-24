import { Module } from '@nestjs/common';
import { FranchisesService } from './franchises.service';
import { FranchisesController } from './franchises.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FranchisesController],
  providers: [FranchisesService],
  imports: [DatabaseModule],
})
export class FranchisesModule {}

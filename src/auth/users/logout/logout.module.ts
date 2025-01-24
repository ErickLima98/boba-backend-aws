import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';

@Module({
  controllers: [LogoutController],
  providers: [LogoutService],
  imports: [UsersModule],
})
export class LogoutModule {}

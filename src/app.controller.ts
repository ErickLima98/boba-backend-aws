import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @HttpCode(200)
  alive(): string {
    return 'Boba backend API running';
  }
}

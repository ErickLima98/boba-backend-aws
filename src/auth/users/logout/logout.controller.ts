import { Controller, Post, Response, HttpCode, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LogoutDto } from 'src/auth/dto/logout.dto';
import { LogoutService } from './logout.service';

@ApiTags('logout')
@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @ApiBody({ type: LogoutDto })
  @HttpCode(200)
  @Post()
  async login(@Body() req: LogoutDto, @Response() res) {
    const user = await this.logoutService.logout(req.email, req.token);
    return res.status(200).json({
      message: 'Logout Successfully',
      user: user.email,
    });
  }
}

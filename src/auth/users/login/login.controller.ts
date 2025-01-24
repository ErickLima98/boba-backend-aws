import { Controller, Post, Response, HttpCode, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @Post()
  async login(@Body() req: LoginDto, @Response() res) {
    const user = await this.loginService.login(req);
    const token = user['token'];
    return res.set({ Authorization: `Bearer ${token}` }).json(user['user']);
  }
}

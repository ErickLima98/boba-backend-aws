import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoginService } from './users/login/login.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.loginService.validateUserCredentials(
      payload.email,
      payload.pass,
    );
    const token = req.headers['authorization']?.split(' ')[1];
    if (user.token != token) {
      const payloadUser = this.loginService.decodeToken(user.token) as any;
      if (!payloadUser.isActive) {
        throw new ForbiddenException();
      }
    }
    return {
      isActive: payload.isActive,
      user: payload.user,
      role: payload.role,
      email: payload.email,
    };
  }
}

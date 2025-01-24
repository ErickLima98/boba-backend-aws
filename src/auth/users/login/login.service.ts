import { UnauthorizedException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDTO: LoginDto): Promise<object> {
    const user: UserEntity = await this.validateUserCredentials(
      loginDTO.email,
      loginDTO.password,
    );
    const token: string = await this.generateToken(user, loginDTO.password);
    user.token = token;
    await this.usersService.updateLoginData(user);
    return { user, token };
  }

  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<UserEntity> {
    const user: UserEntity =
      await this.usersService.findAndReturnByEmailLogin(email);
    if (user === undefined) {
      throw new UnauthorizedException();
    }
    const match: boolean = await this.comparePassword(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }

  private async generateToken(
    user: UserEntity,
    password: string,
  ): Promise<string> {
    return sign(
      {
        isActive: true,
        user: user['fullName'],
        role: user.role,
        email: user.email,
        pass: password,
      },
      process.env.JWTKEY,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );
  }

  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    const match: boolean = await bcrypt.compare(
      enteredPassword || '',
      dbPassword || '',
    );
    return match;
  }

  decodeToken = (token: string) => {
    try {
      const decoded = verify(token, process.env.JWTKEY);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LogoutService {
  constructor(private readonly usersService: UsersService) {}

  async logout(email: string, token: string): Promise<UserEntity> {
    const user: UserEntity =
      await this.usersService.findAndReturnByEmailAndToken(email, token);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }
    user.token = await sign(
      {
        isActive: false,
        user: user['fullName'],
        role: user.role,
        email: user.email,
        pass: user.password,
      },
      process.env.JWTKEY,
    );
    await this.usersService.updateLogout(user);
    return user;
  }
}

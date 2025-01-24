import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ModelClass, OrderByDescriptor, Transaction } from 'objection';
import { CommonService } from 'src/core/commons/common-service';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';
import { UserQueryDto } from './dto/query-user.dto';

@Injectable()
export class UsersService extends CommonService {
  constructor(
    @Inject(UserEntity.name)
    private usersService: ModelClass<UserEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(UsersService.name);
  }
  async create(createUserDto: CreateUserDto) {
    return this.databaseService.databaseTransaction<UserEntity>(async (trx) => {
      const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
      return await this.usersService.query(trx).insert({
        ...createUserDto,
        password: encryptedPassword,
      });
    });
  }

  async findAndReturnByEmail(
    email: string,
    trx?: Transaction | null,
  ): Promise<UserEntity> {
    const user = await this.databaseService.forcefullyFindOne<UserEntity>(
      this.usersService
        .query(trx)
        .findOne({ email: email })
        .where({ is_inactive: false }),
    );
    return await UserEntity.getFullEntityData(user.id);
  }

  async findAndReturnByEmailLogin(
    email: string,
    trx?: Transaction | null,
  ): Promise<UserEntity> {
    return await this.usersService.query(trx).findOne({ email: email });
  }

  async findAll(query: UserQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.usersService
      .query()
      .select(UserEntity.paginationAttributes)
      .where((builder) => UserEntity.filters(query, builder))
      .andWhere('is_inactive', false)
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findAndReturnByEmailAndToken(
    email: string,
    token?: string,
    trx?: Transaction | null,
  ): Promise<UserEntity> {
    return await this.usersService
      .query(trx)
      .findOne({ email: email, token: token });
  }

  async updateLoginData(
    user: UserEntity,
    trx?: Transaction | null,
  ): Promise<UserEntity> {
    return await this.usersService.query(trx).patchAndFetchById(user.id, {
      last_login_at: new Date(),
      login_count: user['loginCount'] ? user['loginCount'] + 1 : 1,
      token: user.token,
    });
  }

  async updateLogout(
    user: UserEntity,
    trx?: Transaction | null,
  ): Promise<UserEntity> {
    return await this.usersService.query(trx).patchAndFetchById(user.id, {
      token: user.token,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.databaseService.databaseTransaction(async (trx) => {
      const user: UserEntity =
        await this.databaseService.forcefullyFindOne<UserEntity>(
          this.usersService.query(trx).findById(id),
        );
      if (updateUserDto.email) {
        await this.validateEmailIsNotInUse(updateUserDto.email);
      }
      let encryptedPassword: string;
      if (updateUserDto.password) {
        encryptedPassword = await bcrypt.hash(updateUserDto.password, 10);
      }
      await user
        .$query(trx)
        .update({ ...updateUserDto, password: encryptedPassword });
      return UserEntity.getFullEntityData(user.id);
    });
  }

  async validateEmailIsNotInUse(email: string): Promise<void> {
    const user = await this.usersService.query().where({ email: email });
    if (user.length > 0) {
      const error = {
        statusCode: 400,
        message: ['Email is already in use'],
        error: 'Bad Request',
      };
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<UserEntity>(async (trx) => {
      const user: UserEntity =
        await this.databaseService.forcefullyFindOne<UserEntity>(
          this.usersService
            .query(trx)
            .findById(id)
            .where({ is_inactive: false }),
        );
      await user.$query(trx).update({ is_inactive: true });
      return user;
    });
  }
}

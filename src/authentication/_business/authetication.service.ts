import { HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../../models/user.model';
//import { JwtService } from '@nestjs/jwt';
//import { UserModel } from '../..//user/_business/user.model';
//import { UserServiceImpl } from '../../user/_business/user.service.implementation';
import {
  Either,
  left,
  MyError,
  right,
} from '../../_core/_business/baseError.error';
import { authenticationServiceAbstraction } from './authentication.service.abstraction';
import { UserRepository } from './user.repo';

@Injectable()
export class authenticationService implements authenticationServiceAbstraction {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserByEmail(email: string): Promise<Either<UserModel, MyError>> {
    const user = await (await this.userRepository.createQueryBuilder())
      .where('user.email = :email', { email: email })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
    try {
      const user: UserModel = await (
        await this.userRepository.createQueryBuilder()
      )
        .where('user.email = :email', { email: email })
        .leftJoinAndSelect('user.role', 'role')
        .getOne();
      if (user) {
        return left(user);
      } else {
        return right(
          MyError.createError(
            HttpStatus.NOT_FOUND,
            'not found',
            'can not found this user',
            new Date(),
            `/api/user`,
          ),
        );
      }
    } catch (error) {
      return right(
        MyError.createError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'internal problem',
          'unkown problem on the database level',
        ),
      );
    }
  }

  async create(user: UserModel): Promise<Either<MyError, UserModel>> {
    console.log('user', user);
    try {
      const savedUser: UserModel = await this.userRepository.createEntity(user);
      return right(savedUser);
    } catch (error) {
      if (error.code == 23505) {
        return left(
          MyError.createError(
            HttpStatus.BAD_REQUEST,
            'email or username already exist',
            'you can not create two users with same email or username',
            new Date(),
            `/api/user`,
          ),
        );
      } else {
        return left(
          MyError.createError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'internal problem',
            'unkown problem on the database level',
            new Date(),
            `/api/user`,
          ),
        );
      }
    }
  }
}

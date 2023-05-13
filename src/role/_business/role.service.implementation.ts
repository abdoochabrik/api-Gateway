import { HttpStatus, Injectable } from '@nestjs/common';
import {
  Either,
  left,
  MyError,
  right,
} from '../../_core/_business/baseError.error';
import { RoleRepository } from '../_infrastructure/role.repo';
import { Role } from './role.enum';
import { RoleModel } from './role.model';
import { RoleServiceInterface } from './role.service.abstraction';

@Injectable()
export class RoleServiceImpl implements RoleServiceInterface {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async create(role: RoleModel): Promise<Either<MyError, RoleModel>> {
    try {
      const result = await this.roleRepository.createEntity(role);
      return right(result);
    } catch (error) {
      if (error.code == 23505) {
        return left(
          MyError.createError(
            HttpStatus.BAD_REQUEST,
            'role already exist',
            'you can not create same role twice',
            new Date(),
            `/api/role`,
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
  deleteById(id: string): Promise<Either<MyError, boolean>> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Either<MyError, RoleModel>> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Either<MyError, RoleModel[]>> {
    throw new Error('Method not implemented.');
  }
  update(id: string, R: RoleModel): Promise<Either<MyError, RoleModel>> {
    throw new Error('Method not implemented.');
  }

  public async getRoleByType(
    roleType: Role,
  ): Promise<Either<MyError, RoleModel>> {
    console.log('role', roleType);
    try {
      const result = await (await this.roleRepository.createQueryBuilder())
        .where('role.role = :role', { role: roleType })
        .getOne();
      console.log('res from db', result);
      if (result) {
        return right(result);
      } else {
        return left(
          MyError.createError(
            HttpStatus.NOT_FOUND,
            'not found',
            'can not found this role',
            new Date(),
            `/api/role`,
          ),
        );
      }
    } catch (error) {
      return left(
        MyError.createError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'internal problem',
          'unkown problem on the database level',
        ),
      );
    }
  }
}

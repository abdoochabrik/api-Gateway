import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Role } from '../../../role/_business/role.enum';
import { RoleModel } from '../../../role/_business/role.model';
import { RoleServiceImpl } from '../../../role/_business/role.service.implementation';
import { MyError } from '../../../_core/_business/baseError.error';

@Injectable()
export class GetRoleByTypeUseCase {
  constructor(private readonly roleService: RoleServiceImpl) {}

  public async getRoleByType(roleType: Role): Promise<MyError | RoleModel> {
    const result = await this.roleService.getRoleByType(roleType);
    if (result.isRight()) {
      return result.value;
    } else if (result.isLeft()) {
      switch (result.value.code) {
        case 404:
          throw new NotFoundException(result.value);
        default:
          throw new InternalServerErrorException(result.value);
      }
    }
  }
}

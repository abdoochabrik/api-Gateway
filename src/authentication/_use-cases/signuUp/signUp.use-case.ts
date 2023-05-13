import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { authenticationService } from 'src/authentication/_business/authetication.service';
import { UserModel } from '../../../models/user.model';
import { RoleModel } from 'src/role/_business/role.model';
import { GetRoleByTypeUseCase } from 'src/role/_use-cases/get-role-by-type/get-Role-By-Type.use-case';
import { MyError } from 'src/_core/_business/baseError.error';
import { CreateUserRequestDto } from './signUp.request.dto';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authenticationService: authenticationService,
    private readonly getRoleByTypeUseCase: GetRoleByTypeUseCase,
  ) {}

  public async signUp(
    user: CreateUserRequestDto,
  ): Promise<MyError | UserModel> {
    const { role, ...userdata } = user;
    const roleFromDb = (await this.getRoleByTypeUseCase.getRoleByType(
      role,
    )) as RoleModel;
    const userToCreate = { ...userdata, role: roleFromDb };
    const result = await this.authenticationService.create(userToCreate);
    if (result.isRight()) {
      return result.value;
    } else if (result.isLeft()) {
      switch (result.value.code) {
        case 400:
          throw new BadRequestException(result.value);
        default:
          throw new InternalServerErrorException(result.value);
      }
    }
  }
}

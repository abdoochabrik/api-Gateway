import { UserModel } from './user.model';
import { BaseModel } from '../_core/_business/base.model';
import { Role } from './role.enum';

export interface RoleModel extends BaseModel {
  role: Role;
  user?: UserModel;
}

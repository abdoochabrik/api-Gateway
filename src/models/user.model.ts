import { BaseModel } from '../_core/_business/base.model';
import { RoleModel } from './role.model';

export interface UserModel extends BaseModel {
  username?: string;
  email?: string;
  password?: string;
  isConnected?: boolean;
  role?: RoleModel;
}

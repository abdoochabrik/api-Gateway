import { UserModel } from './user.model';
import { BaseModel } from '../_core/_business/base.model';
import { profileType } from './profile.enum';

export interface ProfileModel extends BaseModel {
  livesIn?: string;
  profileType?: profileType;
  user?: UserModel;
}

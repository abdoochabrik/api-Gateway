import { FileModel } from './file.model';
import { ProfileModel } from './profile.model';
import { BaseModel } from 'src/_core/_business/base.model';

export interface BookModel extends BaseModel {
  name?: string;
  nbrPage?: number;
  price?: number;
  profile?: ProfileModel;
  image?: FileModel;
}

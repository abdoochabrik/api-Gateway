import { BaseModel } from '../_core/_business/base.model';

export interface FileModel extends BaseModel {
  filename?: string;
  data?: Uint8Array;
}

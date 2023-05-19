import { BaseModel } from "../../_core/_business/base.model";
import { SecretType } from "./secret.enum";


export interface SecretModel extends BaseModel {
    type:SecretType;
    value:string
    expirationDate:Date;
}
import { BaseEntity } from "../../_core/_infrastructure/base.entity";
import { Column, Entity } from "typeorm";
import { SecretModel } from "../_business/secret.model";
import { SecretType } from "../_business/secret.enum";


@Entity({ name: 'secret' })
export class SecretEntity extends BaseEntity implements SecretModel{

    @Column({type: 'enum', enum: SecretType,unique:true})
    type: SecretType;
    @Column({ type: 'varchar', length: 200, nullable:false}) 
    value: string;

    @Column({ type: 'date',nullable:false}) 
    expirationDate: Date;

} 
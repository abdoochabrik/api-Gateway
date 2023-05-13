//import {  UserEntity } from '../../entities/user.entity';
import { BaseEntity } from '../../_core/_infrastructure/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Role } from '../_business/role.enum';
import { RoleModel } from '../_business/role.model';
import { UserEntity } from 'src/entities/user.entity';

@Entity({ name: 'role' })
@Unique(['role'])
export class RoleEntity extends BaseEntity implements RoleModel {
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @OneToMany(() => UserEntity, (user) => user.role)
  user?: UserEntity;
}

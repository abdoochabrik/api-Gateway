import { BaseEntity } from '../_core/_infrastructure/base.entity';
import {
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserModel } from '../models/user.model';

import { RoleEntity } from './role.entity';

@Entity({ name: 'user_Info' })
@Unique(['email'])
export class UserEntity extends BaseEntity implements UserModel {
  @Column({ type: 'varchar', length: 10, unique: true })
  username?: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  @IsEmail()
  email?: string;

  @Column({ type: 'varchar', length: 300 })
  password?: string;

  @Column({ type: 'boolean', default: false })
  isConnected?: boolean;

  /*@Column({ type: 'varchar' })
  passwordSalt?: boolean;
  */
  /*@OneToMany(() => ProfileEntity, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  profiles?: ProfileEntity[];
  */
  @ManyToOne(() => RoleEntity, (role) => role.user, {
    onDelete: 'CASCADE',
  })
  role?: RoleEntity;

  /*@JoinColumn({ name: 'imageId' })
  @OneToOne(() => FileEntity, {
    nullable: true,
  })
  image?: FileEntity;*/
}

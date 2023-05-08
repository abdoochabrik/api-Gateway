/*import { BaseEntity } from '../../_core/_infrastructure/base.entity';
import { Entity, Column,ManyToOne, OneToMany } from 'typeorm';
import { ProfileModel } from '../_business/profile.model';
import { profileType } from '../_business/profile.enum';
import { UserEntity } from '../../user/_infrastructure/user.entity';
import { BookEntity } from '../../book/_infrastructure/book.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements ProfileModel{

  @Column({ type: 'varchar', length: 20, nullable:true})  
  livesIn?: string;

  @Column({type: 'enum', enum: profileType})
  profileType?: profileType;

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  user?:UserEntity

  @OneToMany(() => BookEntity, (book) => book.profile)
  books?:BookEntity[]

}
*/
import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { BaseModel } from '../_business/base.model';

export class BaseEntity implements BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;

  @VersionColumn()
  version?: number;
}
import { BaseEntity } from '../_core/_infrastructure/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BookModel } from '../models/book.model';
import { ProfileEntity } from '../entities/profile.entity';
import { FileEntity } from '../entities/file.entity';

@Entity({ name: 'book' })
export class BookEntity extends BaseEntity implements BookModel {
  @Column({ type: 'varchar', length: 20, nullable: false })
  name?: string;

  @Column({ type: 'int', nullable: false })
  nbrPage?: number;

  @Column({ type: 'int', nullable: true })
  price?: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.books)
  profile?: ProfileEntity;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  image?: FileEntity;

  @JoinColumn({ name: 'pdfId' })
  @OneToOne(() => FileEntity, {
    nullable: true,
  })
  pdf?: FileEntity;
}

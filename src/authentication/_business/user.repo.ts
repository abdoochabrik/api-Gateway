import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  public async createQueryBuilder() {
    return await this.userRepository.createQueryBuilder('user');
  }
}

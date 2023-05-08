import { FindOneOptions,Repository } from 'typeorm';
import { DeleteResult } from '../_business/base.types';
import { BaseEntity } from './base.entity';

//E stands for entity
export abstract class BaseRepository<E extends BaseEntity> {

    private baseRepository:Repository<E>;

    constructor(BaseRepository: Repository<E>) {
        this.baseRepository = BaseRepository
    }

    public async createEntity(entity:E): Promise<E> {
        return await this.baseRepository.save(entity);
    }

    public async deleteEntityById(entityId: string): Promise<DeleteResult<E>> {
      const entity = await this.baseRepository.findOne({where:{'id':entityId}} as FindOneOptions<E>)
      const deleteResult = await this.baseRepository.delete(entityId)
      const {affected} = deleteResult
      const result = new DeleteResult<E>(affected,[entity])
      return result;
    }

    public async paginateEntities(): Promise<E[]> {
        return await this.baseRepository.find();
    }

 

}
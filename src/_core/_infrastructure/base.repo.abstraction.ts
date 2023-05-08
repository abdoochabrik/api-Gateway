import { BaseEntity } from "typeorm";


export interface baseRepositoryInterface<E extends BaseEntity> {
    createEntity(E:E) : Promise<E>;
    getEntityById(entityId:string): Promise<E>;
    deleteEntityById(entityId:string):Promise<boolean>;
    paginateEntities() : Promise<E[]>
}
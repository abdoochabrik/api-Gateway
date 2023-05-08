import { BaseEntity } from "../_infrastructure/base.entity";

export class DeleteResult<entity extends BaseEntity> {

   readonly affected:number;
   readonly raw: entity[];

   constructor(affected:number,raw:entity[]) {
       this.affected = affected;
       this.raw = raw
   }

 /*  public createDeleteResult(affected:number,raw:entity[]) : DeleteResult<entity> {
       return new DeleteResult<entity>(affected,raw)
   }*/
}

export class UpdateResult<entity extends BaseEntity> {

    readonly affected:number;
    readonly raw: entity[];
 
    constructor(affected:number,raw:entity[]) {
        this.affected = affected;
        this.raw = raw
    }
 
  /*  public createDeleteResult(affected:number,raw:entity[]) : DeleteResult<entity> {
        return new DeleteResult<entity>(affected,raw)
    }*/
 }
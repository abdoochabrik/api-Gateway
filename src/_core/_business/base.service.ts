import { BaseModel } from "./base.model";
import { Either, MyError } from "./baseError.error";

//R means a ressource
export interface BaseService<R extends BaseModel> {
   create(R:R): Promise<Either<MyError,R>>;
   deleteById(id:string):Promise<Either<MyError,boolean>>;
   getById(id:string):Promise<Either<MyError,R>>;
   getAll():Promise<Either<MyError,R[]>>;
   update(id:string,R:R):Promise<Either<MyError,R>>;
}
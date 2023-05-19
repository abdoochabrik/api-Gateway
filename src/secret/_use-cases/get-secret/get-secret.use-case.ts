import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common/exceptions";
import { SecretModel } from "../../_business/secret.model";
import { SecretServiceImpl } from "../../_business/secret.service.implementation";
import { MyError } from "../../../_core/_business/baseError.error";
import { GetSecretRequestDto } from "./get-secret.request.dto";


@Injectable() 
export class GetSecretUseCase {

    constructor(private readonly secretService:SecretServiceImpl){}

    public async getSecretByType(type:GetSecretRequestDto):Promise<MyError | SecretModel> {
        const result = await this.secretService.getSecretByType(type.type)
        if(result.isRight()) {
            return result.value
        }
        else if(result.isLeft()){
            switch(result.value.code){
                case 404:
                    throw new NotFoundException(result.value);
                default:
                    throw new InternalServerErrorException(result.value);
               }
            }
        }
}

import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SecretModel } from "../../_business/secret.model";
import { SecretServiceImpl } from "../../_business/secret.service.implementation";
import { MyError } from "../../../_core/_business/baseError.error";
import { CreateSecretRequestDto } from "./create-secret-request.dto";


@Injectable()
export class CreateSecretUseCase {

    constructor(private readonly secretService:SecretServiceImpl){}

    public async createSecret(secret:CreateSecretRequestDto): Promise<MyError | SecretModel> {

        const secretToCreate:SecretModel = {
            type:secret.type,
            value:secret.value,
            expirationDate:new Date(secret.expirationDate)
        }

        const result =  await this.secretService.create(secretToCreate);
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 400:
                throw new BadRequestException(result.value);
            default:
                throw new InternalServerErrorException(result.value);
           }
           
        }
    }

}
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { RoleModel } from "../../_business/role.model";
import { RoleServiceImpl } from "../../_business/role.service.implementation";
import { MyError } from "../../../_core/_business/baseError.error";
import { CreateRoleRequestDto } from "./add-role.request.dto";


@Injectable()
export class CreateRoleUseCase {
    constructor(private readonly roleService:RoleServiceImpl){}

    public async createRole(role:CreateRoleRequestDto):Promise<MyError | RoleModel> {

        const result = await this.roleService.create(role)
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
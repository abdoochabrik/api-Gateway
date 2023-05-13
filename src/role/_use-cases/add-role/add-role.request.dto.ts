import { IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "../../_business/role.enum";


export class CreateRoleRequestDto {
    
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
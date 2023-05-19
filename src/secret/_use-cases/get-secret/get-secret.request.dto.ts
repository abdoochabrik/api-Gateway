import { IsEnum, IsNotEmpty } from "class-validator";
import { SecretType } from "../../_business/secret.enum";


export class GetSecretRequestDto {
    @IsNotEmpty()
    @IsEnum(SecretType)
    type:SecretType;
}
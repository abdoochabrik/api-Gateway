import { IsDate, IsEnum,IsISO8601,IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SecretType } from "../../_business/secret.enum";


export class CreateSecretRequestDto {

    @IsNotEmpty()
    @IsEnum(SecretType)
    type:SecretType;

    @IsNotEmpty()
    @IsString()
    value:string

    @IsISO8601({
        strict: true,
    })
    @IsOptional()
    expirationDate:Date;
}
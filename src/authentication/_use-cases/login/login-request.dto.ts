import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

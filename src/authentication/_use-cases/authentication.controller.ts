import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { MyError } from '../../_core/_business/baseError.error';
import { loginRequestDto } from './login/login-request.dto';
import { loginResponseDto } from './login/login-response.dto';
import { loginUseCase } from './login/login.use-case';
import { CreateUserRequestDto } from './signuUp/signUp.request.dto';
import { SignUpUseCase } from './signuUp/signUp.use-case';

@Controller('/authentication')
export class AuthenticationController {
  constructor(
    private readonly loginUseCase: loginUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Post('/login')
  public async login(
    @Body() userInfo: loginRequestDto,
  ): Promise<loginResponseDto | MyError> {
    return await this.loginUseCase.login(userInfo);
  }

  @Post('/signup')
  public async createUser(
    @Body() user: CreateUserRequestDto,
  ): Promise<MyError | UserModel> {

    return await this.signUpUseCase.signUp(user);
  }
}

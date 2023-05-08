import { Body, Controller, Get, Post } from '@nestjs/common';
import { MyError } from '../../_core/_business/baseError.error';
import { loginRequestDto } from './login/login-request.dto';
import { loginResponseDto } from './login/login-response.dto';
import { loginUseCase } from './login/login.use-case';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly loginUseCase: loginUseCase) {}

  @Post('/login')
  public async login(
    @Body() userInfo: loginRequestDto,
  ): Promise<loginResponseDto | MyError> {
    return await this.loginUseCase.login(userInfo);
  }
  @Get('/login')
  public async test() {
    return 'worked';
  }
}

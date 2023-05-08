import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { authenticationService } from '../../_business/authetication.service';
//import { UserModel } from '../../../user/_business/user.model';
import { MyError } from '../../../_core/_business/baseError.error';
//import { authenticationService } from '../../_business/authetication.service';
import { loginRequestDto } from './login-request.dto';
import { loginResponseDto } from './login-response.dto';

@Injectable()
export class loginUseCase {
  constructor(
    private readonly authenticationService: authenticationService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    userInfo: loginRequestDto,
  ): Promise<loginResponseDto | MyError> {
    const result = await this.authenticationService.getUserByEmail(
      userInfo.email,
    );
    if (result.isLeft()) {
      const { password, ...rest } = result.value;
      if (password != userInfo.password) {
        throw new UnauthorizedException();
      }
      const payload = {
        username: rest.username,
        sub: rest.id,
        role: rest.role,
      };
      const access_token = await this.jwtService.signAsync(payload);
      const response = new loginResponseDto(rest, access_token);
      return response;
    } else if (result.isRight()) {
      switch (result.value.code) {
        case 404:
          throw new NotFoundException(result.value);
        default:
          throw new InternalServerErrorException(result.value);
      }
    }
  }
}

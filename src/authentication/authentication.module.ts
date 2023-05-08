import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
//import { UserServiceImpl } from '../user/_business/user.service.implementation';
import { authenticationService } from './_business/authetication.service';
import { AuthenticationController } from './_use-cases/authentication.controller';
import { loginUseCase } from './_use-cases/login/login.use-case';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './_business/constants';
import { UserRepository } from './_business/user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [loginUseCase, authenticationService, UserRepository],
})
export class AuthenticationModule {}

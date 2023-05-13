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
import { SignUpUseCase } from './_use-cases/signuUp/signUp.use-case';
import { GetRoleByTypeUseCase } from 'src/role/_use-cases/get-role-by-type/get-Role-By-Type.use-case';
import { RoleModule } from 'src/role/role.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    loginUseCase,
    authenticationService,
    UserRepository,
    SignUpUseCase,
  ],
})
export class AuthenticationModule {}

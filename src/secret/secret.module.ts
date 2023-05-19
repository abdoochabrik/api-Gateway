import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../_core/core.module';
import { SecretServiceImpl } from './_business/secret.service.implementation';
import { SecretEntity } from './_infrastructure/secret.entity';
import { CreateSecretUseCase } from './_use-cases/add-secret/add-secret.use-case';
import { SecretController } from './_use-cases/secret.controller';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { SecretRepository } from './_infrastructure/secret.repo';
import { GetSecretUseCase } from './_use-cases/get-secret/get-secret.use-case';
import { ParseEnumPipe } from '@nestjs/common/pipes';

@Global()
@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
          SecretEntity
        ]),
    ],

    controllers: [SecretController,],
    providers: [
              SecretServiceImpl,
              CreateSecretUseCase,
              GetSecretUseCase,
              SecretRepository,
             ],
    exports: [],
}
)

export class SecretModule {}


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './_core/core.module';
import { UserEntity } from './entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoleEntity } from './role/_infrastructure/role.entity';
import { RoleModule } from './role/role.module';
import { BookEntity } from './entities/book.entity';
import { ProfileEntity } from './entities/profile.entity';
import { FileEntity } from './entities/file.entity';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [
          UserEntity,
          RoleEntity,
          BookEntity,
          ProfileEntity,
          FileEntity,
        ],
        synchronize: true,
      }),
    }),
    RoleModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

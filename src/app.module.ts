import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Auth } from './modules/auth/entities/auth.entity';
import { AuthModule } from './modules/auth/auth.module';
import { Role } from './modules/role/entities/role.entity';
import { RoleModule } from './modules/role/role.module';
import { Position } from './modules/position/entities/position.entity';
import { PositionModule } from './modules/position/position.module';
import { Checkin } from './modules/checkin/entities/checkin.entity';
import { CheckinModule } from './modules/checkin/checkin.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Auth, Role, Position, Checkin],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: 'No Reply <noreply@gmail.com>',
        },
        template: {
          dir: process.cwd() + '/src/modules/auth/templates/',
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    RoleModule,
    PositionModule,
    CheckinModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

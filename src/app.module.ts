import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { PositionModule } from './modules/position/position.module';
import { CheckinModule } from './modules/checkin/checkin.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_DATABASE'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     autoLoadEntities: true,
    //   }),
    // }),
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get('MAIL_HOST'),
    //       secure: true,
    //       auth: {
    //         user: configService.get('MAIL_USER'),
    //         pass: configService.get('MAIL_PASS'),
    //       },
    //     },
    //     defaults: {
    //       from: 'No Reply <noreply@gmail.com>',
    //     },
    //     template: {
    //       dir: process.cwd() + '/src/modules/auth/templates/',
    //       adapter: new EjsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),

    AuthModule,
    RoleModule,
    PositionModule,
    CheckinModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

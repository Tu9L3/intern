import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { BaseAbstractRepostitory } from 'src/common/base/base.repository';
import { JwtService } from '@nestjs/jwt';
import { sendOtpDto } from './dto/sendOtp.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { verifyDto } from './dto/verify.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { forgotPassword } from './dto/forgotPassword.dto';
import { recoverPasswordDto } from './dto/recoveryPassword.dto';
import { changePasswordDto } from './dto/changePassword.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { dateDto } from './dto/date.dto';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
const saltOrRounds = 10;

@Injectable()
export class AuthService extends BaseAbstractRepostitory<Auth> {
  constructor(
    @InjectRepository(Auth)
    private authRepositoty: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {
    super(authRepositoty);
  }

  async createAcc(createAuthDto: CreateAuthDto) {
    const hassPassword = await bcrypt.hash(
      createAuthDto.password,
      saltOrRounds,
    );

    const user = this.create({
      email: createAuthDto.email,
      password: hassPassword,
    });

    const otp = this.generateOtp();
    await this.sendOtpEmail({ email: createAuthDto.email, otp: otp });

    user.otp = otp;

    await this.save(user);

    return user;
  }

  async sendOtpEmail(sendOtp: sendOtpDto) {
    const otp = sendOtp.otp;
    const email = sendOtp.email;
    await this.mailerService.sendMail({
      to: sendOtp.email,
      subject: 'Verification Code',
      template: 'welcome',
      context: { email, otp },
    });
  }

  async sendOtpForgotPass(sendOtp: sendOtpDto) {
    const otp = sendOtp.otp;
    const email = sendOtp.email;
    await this.mailerService.sendMail({
      to: sendOtp.email,
      subject: 'Forgot password code',
      template: 'forgotpass',
      context: { email, otp },
    });
  }

  async sendOtpChangePass(sendOtp: sendOtpDto) {
    const otp = sendOtp.otp;
    const email = sendOtp.email;
    await this.mailerService.sendMail({
      to: sendOtp.email,
      subject: 'Change password code',
      template: 'changepass',
      context: { email, otp },
    });
  }

  async login(loginDto: loginDto) {
    const user = await this.findByColumn('email', loginDto.email);

    if (!user.isVerify) {
      return 'Acc is not verify';
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      return 'Password is not valid';
    }

    const payload = {
      id: user.id,
      roles: user.roles,
      positions: user.positions,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_KEY'),
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_KEY'),
      expiresIn: '7d',
    });

    await this.cacheManager.set('refreshToken', refreshToken);

    await this.authRepositoty.save(user);

    return { accessToken, refreshToken, user };
  }
  async verify(verifyDto: verifyDto) {
    try {
      const user = await this.findByColumn('email', verifyDto.email);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.otp !== verifyDto.otp) {
        throw new BadRequestException('Invalid OTP');
      }

      user.otp = null;
      user.isVerify = true;

      await this.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async refreshToken() {
    const refreshToken: string = await this.cacheManager.get('refreshToken');
    const decode = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('REFRESH_KEY'),
    });

    const user = await this.findOneById(decode.id);

    const payload = {
      id: user.id,
      roles: user.roles,
      positions: user.positions,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_KEY'),
      expiresIn: '15m',
    });
    return { access_token, refreshToken, user };
  }

  async forgotPassword(forgotPasswordDto: forgotPassword) {
    const otp = this.generateOtp();
    const user = await this.findByColumn('email', forgotPasswordDto.email);

    user.otp = otp;
    await this.save(user);
    await this.sendOtpForgotPass({ email: forgotPasswordDto.email, otp: otp });
  }

  async recoverPassword(recoverPassword: recoverPasswordDto) {
    const user = await this.findByColumn('email', recoverPassword.email);

    if (user.otp === recoverPassword.otp) {
      const hashPassword = await bcrypt.hash(
        recoverPassword.newPassword,
        saltOrRounds,
      );

      user.password = hashPassword;

      await this.save(user);
    }
  }

  async changePassword(changePassword: changePasswordDto, req: Request) {
    const user = await this.findOneById(req['user'].id);
    const isMatch = await bcrypt.compare(
      changePassword.currentPassword,
      user.password,
    );

    if (!isMatch) {
      throw new Error('Password in valid');
    }

    if (changePassword.newPassword === changePassword.rewritePassword) {
      const hashPassword = await bcrypt.hash(
        changePassword.newPassword,
        saltOrRounds,
      );
      user.password = hashPassword;
      await this.save(user);
      return 'ChangePassword success';
    }
  }

  async logOut(req: Request) {
    const user = await this.findOneById(req['user'].id);
    await this.cacheManager.del('refreshToken');

    await this.save(user);

    return { user };
  }

  async updateUser(updateUserDto: updateUserDto, id: number) {
    const user = await this.findOneById(id);
    const parsedDate = new Date(updateUserDto.birthday);
    (user.email = updateUserDto.fullname),
      (user.email = updateUserDto.email),
      (user.birthday = parsedDate);
    await this.save(user);

    // return updateUserDto;
  }

  async findUserByDay(day: string) {
    try {
      const users = await this.authRepositoty
        .createQueryBuilder('auth')
        .where(`EXTRACT(DAY FROM auth.birthday) = :day`, { day })
        .getMany();

      const userInfo = users.map(
        ({ password, isVerify, createdAt, updatedAt, otp, ...userInfo }) =>
          userInfo,
      );

      return userInfo;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findUserByMonth(month: string) {
    const users = await this.authRepositoty
      .createQueryBuilder('auth')
      .where(`EXTRACT(MONTH FROM auth.birthday) = :month`, { month })
      .getMany();

    const userInfo = users.map(
      ({ password, isVerify, createdAt, updatedAt, otp, ...userInfo }) =>
        userInfo,
    );

    return userInfo;
  }

  async findUserByYear(year: string) {
    const users = await this.authRepositoty
      .createQueryBuilder('auth')
      .where(`EXTRACT(YEAR FROM auth.birthday) = :year`, { year })
      .getMany();

    const userInfo = users.map(
      ({ password, isVerify, createdAt, updatedAt, otp, ...userInfo }) =>
        userInfo,
    );

    return userInfo;
  }

  async findUserByDate(dateDto: dateDto) {
    const parsedDate = new Date(dateDto.date);
    const users = await this.authRepositoty.find({
      where: {
        birthday: parsedDate,
      },
    });

    const userInfo = users.map(
      ({ password, isVerify, createdAt, updatedAt, otp, ...userInfo }) =>
        userInfo,
    );

    return userInfo;
  }

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}

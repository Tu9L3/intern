import { IsEmail, IsNotEmpty } from 'class-validator';

export class sendOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  otp: string;
}

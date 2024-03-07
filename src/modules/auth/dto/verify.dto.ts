import { IsEmail, IsNotEmpty } from 'class-validator';

export class verifyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  otp: string;
}

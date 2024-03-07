import { IsNotEmpty } from 'class-validator';

export class recoverPasswordDto {
  @IsNotEmpty()
  newPassword: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  otp: string;
}

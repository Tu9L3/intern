import { IsNotEmpty } from 'class-validator';

export class changePasswordDto {
  @IsNotEmpty()
  currentPassword: string;
  @IsNotEmpty()
  newPassword: string;
  @IsNotEmpty()
  rewritePassword: string;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  birthday: string;
}

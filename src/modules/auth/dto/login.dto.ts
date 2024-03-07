import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

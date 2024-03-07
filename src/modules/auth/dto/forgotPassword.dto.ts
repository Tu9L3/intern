import { IsNotEmpty } from 'class-validator';

export class forgotPassword {
  @IsNotEmpty()
  email: string;
  // @IsNotEmpty()
  // recaptcha: string;
}

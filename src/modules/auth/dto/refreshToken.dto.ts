import { IsNotEmpty } from 'class-validator';

export class refreshTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  name: string;
}

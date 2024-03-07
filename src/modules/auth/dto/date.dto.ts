import { IsNotEmpty } from 'class-validator';

export class dateDto {
  @IsNotEmpty()
  date: string;
}

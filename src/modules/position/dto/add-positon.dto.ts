import { IsNotEmpty } from 'class-validator';

export class addPosForUser {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  positionId: number;
}

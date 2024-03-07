import { IsNotEmpty } from "class-validator";

export class DeletePos {
  @IsNotEmpty()
  positionId: number;
}

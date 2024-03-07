import { IsNotEmpty } from 'class-validator';

export class AddRoleDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  roleId: number;
}

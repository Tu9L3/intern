import { IsNotEmpty } from 'class-validator';

export class DeleteRoleDto {
  @IsNotEmpty()
  roleId: number;
}

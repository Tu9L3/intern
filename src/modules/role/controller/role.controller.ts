import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../role.service';
import { AddRoleDto } from '../dto/add-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('api/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Post('addRoleForUser')
  addRoleForUser(@Body() role: AddRoleDto) {
    return this.roleService.addRoleForUser(role);
  }

  @Get('findAll')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('removeForUser/:id')
  removeforuser(@Param('id') id: number, @Body() deleteRoleDto: DeleteRoleDto) {
    return this.roleService.removeforuser(id, deleteRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.removeRole(id);
  }
}

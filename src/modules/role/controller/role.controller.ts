import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from '../role.service';
import { AddRoleDto } from '../dto/add-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { AuthzGuard } from 'src/guards/authz/authz.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/guards/authz/roles.decorator';
import { RolesEnum } from 'src/enum';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Role')
@Controller('api/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles([RolesEnum.Admin])
  @UseGuards(AuthzGuard, AuthGuard)
  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthzGuard, AuthGuard)
  @Post('addRoleForUser')
  addRoleForUser(@Body() role: AddRoleDto) {
    return this.roleService.addRoleForUser(role);
  }

  @Get('findAll')
  findAll() {
    return this.roleService.findAll();
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthzGuard, AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthzGuard, AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthzGuard, AuthGuard)
  @Delete('removeForUser/:id')
  removeforuser(@Param('id') id: number, @Body() deleteRoleDto: DeleteRoleDto) {
    return this.roleService.removeforuser(id, deleteRoleDto);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthzGuard, AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.removeRole(id);
  }
}

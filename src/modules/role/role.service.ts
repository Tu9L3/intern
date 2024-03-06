import { Injectable } from '@nestjs/common';
import { BaseAbstractRepostitory } from 'src/common/base/base.repository';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService extends BaseAbstractRepostitory<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {
    super(roleRepository);
  }
  async createRole(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create({
      name: createRoleDto.name,
    });

    await this.roleRepository.save(role);

    return 'This action adds a new role';
  }

  async addRoleForUser(addRoleForUser: AddRoleDto) {
    const user = await this.authRepository.findOne({
      where: {
        id: addRoleForUser.userId,
      },
    });
    const role = await this.roleRepository.findOne({
      where: {
        id: addRoleForUser.roleId,
      },
    });

    if (user) {
      user.roles.push(role);
      await this.authRepository.save(user);
    }
  }

  async findAll() {
    const roles = await this.roleRepository.find();
    return roles;
  }

  async findOne(id: number) {
    const user = await this.authRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(
      {
        name: updateRoleDto.name,
      },
      {
        id: id,
      },
    );

    return `This action updates a #${id} role`;
  }

  async removeforuser(id: number, deleteRoleDto: DeleteRoleDto) {
    const user = await this.authRepository.findOne({
      where: {
        id: id,
      },
    });

    const roles = user.roles.filter((role: Role, i: number) => {
      return role.id != deleteRoleDto.roleId;
    });

    user.roles = roles;
    await this.authRepository.save(user);
  }

  async removeRole(id: number) {
    const user = await this.authRepository.findOne({
      where: {
        id,
      },
    });
    await this.authRepository.remove(user);
  }
}

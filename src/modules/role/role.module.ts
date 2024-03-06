import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './controller/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Auth } from '../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Auth])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { Role } from 'src/modules/role/entities/role.entity';

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(roles: string[], userRoles: Role[]) {
    return roles.some((role: string) =>
      userRoles.some((userRole: Role) => userRole.name === role),
    );
  }
}

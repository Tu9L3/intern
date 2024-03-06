import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Positions } from './pos.decorator';
import { Position } from 'src/modules/position/entities/position.entity';

@Injectable()
export class PosGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const poss = this.reflector.get(Positions, context.getHandler());
    if (!poss) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchPoss(poss, user.positions);
  }

  private matchPoss(poss: string[], userPoss: Position[]) {
    return poss.some((pos: string) =>
      userPoss.some((userPos: Position) => (userPos.name === pos)),
    );
  }
}

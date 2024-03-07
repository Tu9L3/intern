import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './controller/position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Auth } from '../auth/entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Auth]),JwtModule],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}

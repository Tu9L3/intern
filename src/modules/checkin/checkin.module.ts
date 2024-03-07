import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './controllers/checkin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkin } from './entities/checkin.entity';
import { Auth } from '../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin, Auth])],
  controllers: [CheckinController],
  providers: [CheckinService],
})
export class CheckinModule {}

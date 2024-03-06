import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './controllers/checkin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkin } from './entities/checkin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin])],
  controllers: [CheckinController],
  providers: [CheckinService],
})
export class CheckinModule {}

import { Injectable } from '@nestjs/common';
import { BaseAbstractRepostitory } from 'src/common/base/base.repository';
import { Checkin } from './entities/checkin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { updateUserCheckinDto } from './dto/updateUserCheckin.dto';

@Injectable()
export class CheckinService extends BaseAbstractRepostitory<Checkin> {
  constructor(
    @InjectRepository(Checkin)
    private checkinRepository: Repository<Checkin>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {
    super(checkinRepository);
  }

  async isLastDayOfMonth(dateDto: Date) {
    const nextDay = new Date(dateDto);
    nextDay.setDate(dateDto.getDate() + 1);
    return nextDay.getMonth() !== dateDto.getMonth();
  }

  async updateUserCheckin(updateUserCheckinDto: updateUserCheckinDto) {
    const user = await this.authRepository.findOne({
      where: {
        id: updateUserCheckinDto.userId,
      },
      relations: ['dailyCheckin'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const parsedDate = new Date(updateUserCheckinDto.date);

    if (!user.dailyCheckin?.length) {
      if (await this.isLastDayOfMonth(parsedDate)) {
        // Case 1.1: Hôm nay là cuối tháng
        const newCheckin = new Checkin();
        newCheckin.checkDate = parsedDate;
        newCheckin.eligibleForReward = true;
        newCheckin.accessMount = 1;

        await this.checkinRepository.save(newCheckin);

        user.lastCheckin = parsedDate;
        user.lastGetCheckinRewards = parsedDate;
      } else {
        // Case 1.2: Ngày trong tháng => Checkin
        const newCheckin = new Checkin();
        newCheckin.checkDate = parsedDate;
        newCheckin.eligibleForReward = false;
        newCheckin.accessMount = 1;

        await this.checkinRepository.save(newCheckin);

        user.lastCheckin = parsedDate;
      }

      await this.authRepository.save(user);
    } else {
      // Case 2: Đã từng điểm danh
      const lastCheckinDate = user.lastCheckin;
      if (
        lastCheckinDate &&
        lastCheckinDate.toDateString() === parsedDate.toDateString()
      ) {
        // Case 2.1: Hôm nay đã điểm danh
      } else {
        // Case 2.2: Hôm nay chưa điểm danh
        if (await this.isLastDayOfMonth(parsedDate)) {
          // Case 2.2.1: Hôm nay là cuối tháng
        } else {
          // Case 2.2.2: Hôm nay là ngày trong tháng
        }
      }
    }
  }
}

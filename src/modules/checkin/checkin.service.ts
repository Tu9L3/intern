import { Injectable } from '@nestjs/common';
import { BaseAbstractRepostitory } from 'src/common/base/base.repository';
import { Checkin } from './entities/checkin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckinService extends BaseAbstractRepostitory<Checkin> {
  constructor(
    @InjectRepository(Checkin)
    private checkinRepository: Repository<Checkin>,
  ) {
    super(checkinRepository);
  }

}

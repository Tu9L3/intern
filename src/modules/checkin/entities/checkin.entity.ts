import { BaseDB } from 'src/common/base/base.db';
import { Column, Entity } from 'typeorm';

@Entity()
export class Checkin extends BaseDB {
  @Column({ nullable: true })
  checkDate: Date;

  @Column({ nullable: true })
  eligibleForReward: boolean;

  @Column({ nullable: true })
  accessMount: number;

  @Column({ nullable: true })
  rewardDaysCount: number;
}

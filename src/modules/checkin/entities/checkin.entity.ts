import { BaseDB } from 'src/common/base/base.db';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Auth, (auth) => auth.dailyCheckin)
  auth: Auth
}

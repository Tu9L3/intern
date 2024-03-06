import { BaseDB } from 'src/common/base/base.db';
import { Position } from 'src/modules/position/entities/position.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Auth extends BaseDB {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerify: boolean;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column('date', { nullable: true })
  birthday: Date;

  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToMany(()=>Position,{cascade: true,eager: true})
  @JoinTable()
  positions: Position[]

}

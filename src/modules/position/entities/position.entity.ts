import { BaseDB } from 'src/common/base/base.db';
import { Column, Entity } from 'typeorm';

@Entity()
export class Position extends BaseDB {
  @Column()
  name: string;
}

import { BaseDB } from 'src/common/base/base.db';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends BaseDB {
  @Column()
  name: string;
}

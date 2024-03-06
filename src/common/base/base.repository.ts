import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    Repository,
    SelectQueryBuilder,
  } from 'typeorm';
  import { BaseInterfaceRepository } from './base.interface';
  import { BaseDB } from './base.db';
  
  export abstract class BaseAbstractRepostitory<T extends BaseDB>
    implements BaseInterfaceRepository<T>
  {
    private entity: Repository<T>;
    protected constructor(entity: Repository<T>) {
      this.entity = entity;
    }
  
    public async save(data: DeepPartial<T>): Promise<T> {
      return await this.entity.save(data);
    }
  
    public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
      return this.entity.save(data);
    }
  
    public create(data: DeepPartial<T>): T {
      return this.entity.create(data);
    }
  
    public createMany(data: DeepPartial<T>[]): T[] {
      return this.entity.create(data);
    }
  
    public async findOneById(id: any): Promise<T> {
      const options: FindOptionsWhere<T> = {
        id: id,
      };
      return await this.entity.findOneBy(options);
    }
  
    public async findByColumn<X>(column: keyof T, value: X): Promise<T> {
      const findOneOptions = { where: { [column]: value } } as FindOneOptions;
      return this.entity.findOne(findOneOptions);
    }
  
    public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
      return await this.entity.find(relations);
    }
  
    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
      return await this.entity.find(options);
    }
  
    public async remove(data: T): Promise<T> {
      return await this.entity.remove(data);
    }
  
    // findAll(filter?: object, options?: object): Promise<FindAllResponse<T>>;
  
    // async findAll(filter?: object, options?: object): Promise<T[]> {
    //   return await this.entity.findAll(filter, options);
    // }
  
    public async preload(entityLike: DeepPartial<T>): Promise<T> {
      return await this.entity.preload(entityLike);
    }
  }
  
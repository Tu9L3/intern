import { Injectable } from '@nestjs/common';
import { BaseAbstractRepostitory } from 'src/common/base/base.repository';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { addPosForUser } from './dto/add-positon.dto';
import { CreatePositionDto } from './dto/create-position.dto';
import { DeletePos } from './dto/delete-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService extends BaseAbstractRepostitory<Position> {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {
    super(positionRepository);
  }
  async createPos(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create({
      name: createPositionDto.name,
    });
    await this.positionRepository.save(position);
    return 'This action adds a new position';
  }

  async addPosForUser(addPos: addPosForUser) {
    const user = await this.authRepository.findOne({
      where: {
        id: addPos.userId,
      },
    });

    const position = await this.positionRepository.findOne({
      where: {
        id: addPos.positionId,
      },
    });

    if (user) {
      user.positions.push(position);
      await this.authRepository.save(user);
    }
  }

  async removePosUser(id: number, deletepos: DeletePos) {
    const user = await this.authRepository.findOne({
      where: {
        id: id,
      },
    });

    const poss = user.positions.filter((pos: Position) => {
      return pos.id != deletepos.positionId;
    });
    user.positions = poss;
    await this.authRepository.save(user);
  }

  async findAll() {
    const poss = await this.positionRepository.find();
    return poss;
  }

  async findOne(id: number) {
    const pos = await this.positionRepository.findOne({
      where: {
        id,
      },
    });

    return pos;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    await this.positionRepository.update({ name: updatePositionDto.name }, { id });

    return `This action updates a #${id} position`;
  }

  async removePos(id: number) {
    const pos = await this.positionRepository.find({
      where: {
        id,
      },
    });

    await this.positionRepository.remove(pos);

    return `This action removes a #${id} position`;
  }
}

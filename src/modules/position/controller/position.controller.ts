import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionService } from '../position.service';
import { addPosForUser } from '../dto/add-positon.dto';
import { CreatePositionDto } from '../dto/create-position.dto';
import { DeletePos } from '../dto/delete-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Controller('api/v1/position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('create')
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.createPos(createPositionDto);
  }

  @Post('addPos')
  addPosForUser(@Body() addPosForUserDto: addPosForUser) {
    return this.positionService.addPosForUser(addPosForUserDto);
  }

  @Delete('removePos/:id')
  removePosUser(@Param('id') id: number, @Body() deletepos: DeletePos) {
    return this.positionService.removePosUser(id, deletepos);
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.positionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  removePos(@Param('id') id: number) {
    return this.positionService.removePos(id);
  }
}

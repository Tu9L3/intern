import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from '../position.service';
import { addPosForUser } from '../dto/add-positon.dto';
import { CreatePositionDto } from '../dto/create-position.dto';
import { DeletePos } from '../dto/delete-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthzGuard } from 'src/guards/authz/authz.guard';
import { Roles } from 'src/guards/authz/roles.decorator';
import { RolesEnum } from 'src/enum';

@Controller('api/v1/position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Post('create')
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.createPos(createPositionDto);
  }

  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Post('addPos')
  addPosForUser(@Body() addPosForUserDto: addPosForUser) {
    return this.positionService.addPosForUser(addPosForUserDto);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Delete('removePos/:id')
  removePosUser(@Param('id') id: number, @Body() deletepos: DeletePos) {
    return this.positionService.removePosUser(id, deletepos);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Get()
  findAll() {
    return this.positionService.findAll();
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.positionService.findOne(id);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(id, updatePositionDto);
  }
  @Roles([RolesEnum.Admin])
  @UseGuards(AuthGuard, AuthzGuard)
  @Delete(':id')
  removePos(@Param('id') id: number) {
    return this.positionService.removePos(id);
  }
}

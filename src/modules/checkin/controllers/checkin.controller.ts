import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckinService } from '../checkin.service';
import { updateUserCheckinDto } from '../dto/updateUserCheckin.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Checkin')
@Controller('api/v1/checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post('update')
  updateUserCheckin(@Body() updateUserCheckinDto: updateUserCheckinDto) {
    return this.checkinService.updateUserCheckin(updateUserCheckinDto);
  }
}

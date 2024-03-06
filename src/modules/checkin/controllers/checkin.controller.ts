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
import { CreateCheckinDto } from '../dto/create-checkin.dto';
import { UpdateCheckinDto } from '../dto/update-checkin.dto';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  
}

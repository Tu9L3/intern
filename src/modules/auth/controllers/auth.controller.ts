import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { loginDto } from '../dto/login.dto';
import { verifyDto } from '../dto/verify.dto';
import { refreshTokenDto } from '../dto/refreshToken.dto';
import { forgotPassword } from '../dto/forgotPassword.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import { dateDto } from '../dto/date.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthzGuard } from 'src/guards/authz/authz.guard';
import { Role } from 'src/modules/role/entities/role.entity';
import { PosEnum, RolesEnum } from 'src/enum';
import { Roles } from 'src/guards/authz/roles.decorator';
import { Positions } from 'src/guards/pos/pos.decorator';
import { PosGuard } from 'src/guards/pos/pos.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createAcc(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify')
  verify(@Body() verifyDto: verifyDto) {
    return this.authService.verify(verifyDto);
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshTokenDto: refreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() forgotPassword: forgotPassword) {
    return this.authService.forgotPassword(forgotPassword);
  }

  @Post('logOut')
  logOut(@Request() req: Request) {
    return this.authService.logOut(req);
  }

  @Patch('update/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: updateUserDto) {
    return this.authService.updateUser(updateUserDto, id);
  }

  @Get('findUserByDay/:day')
  findUserByDay(@Param('day') day: string) {
    return this.authService.findUserByDay(day);
  }

  @Get('findUserByMonth/:month')
  findUserByMonth(@Param('month') month: string) {
    return this.authService.findUserByMonth(month);
  }

  @Get('findUserByYear/:year')
  findUserByYear(@Param('year') year: string) {
    return this.authService.findUserByYear(year);
  }

  @Get('findUserByDate')
  findUserByDate(@Body() dateDto: dateDto) {
    return this.authService.findUserByDate(dateDto);
  }

  @Roles([RolesEnum.Admin, RolesEnum.User])
  @Positions([PosEnum.Lead])
  @UseGuards(AuthGuard, AuthzGuard, PosGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }
}

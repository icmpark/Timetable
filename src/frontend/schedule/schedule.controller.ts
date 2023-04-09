import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthRenderGuard } from '../utils/check-auth.guard';

@UseGuards(AuthRenderGuard)
@Controller()
export class ScheduleRenderController {

  @Get('/')
  @Render('schedule/index')
  login() {
  }

  @Get('/user-manage')
  @Render('schedule/userinfo')
  userinfo() {
  }

  @Get('/schedule-manage')
  @Render('schedule/scheinfo')
  scheduleinfo() {
  }
}
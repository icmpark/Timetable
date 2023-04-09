import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthRenderGuard } from '../utils/check-auth.guard';

@UseGuards(AuthRenderGuard)
@Controller()
export class ScheduleRenderController {

  @Get('/')
  @Render('schedule/index')
  login() {
  }

  @Get('userinfo')
  @Render('schedule/userinfo')
  userinfo() {
  }
}
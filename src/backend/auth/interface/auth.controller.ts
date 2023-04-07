
import { Controller, Post, UseGuards, Get, Res, Req, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthenticatedGuard } from './guard/check-auth.guard';

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req) {
    return null;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Req() req) {
    req.logout(() => null);
  }
}
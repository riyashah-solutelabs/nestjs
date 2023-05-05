import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';
import { CONSTANTS } from './constants';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req): string {
    return this.authService.generateToken(req.user);
  }

  @Get('/android-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.ANDROID_DEVELOPER))
  androidDeveloperData(@Req() req): string {
    return (
      'this is private data for android developer' + JSON.stringify(req.user)
    );
  }

  @Get('/web-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.WEB_DEVELOPER))
  webDeveloperData(@Req() req): string {
    return 'this is private data for web developer' + JSON.stringify(req.user);
  }
}

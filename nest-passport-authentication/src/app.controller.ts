import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('app')
export class AppController {
  @Get()
  @UseGuards(AuthGuard('local'))
  getHello(@Req() req: Request): string {
    return 'this is private data' + JSON.stringify(req.user);
  }
}

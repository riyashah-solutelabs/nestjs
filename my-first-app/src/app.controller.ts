import { Controller, Post, UseInterceptors, Req, Res } from '@nestjs/common';
import { AppInterceptor } from './app.interceptor';
import { Response, Request } from 'express';

@Controller('app')
export class AppController {
  @Post()
  @UseInterceptors(AppInterceptor)
  helloworld(): any {
    // return res.json(req.body);
    return { body: 'This is body' };
  }
}

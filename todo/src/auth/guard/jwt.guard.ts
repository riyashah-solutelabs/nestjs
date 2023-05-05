import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Constants } from 'src/utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    //By pass url
    for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
      if (request.url === Constants.BY_PASS_URLS[x]) return true;
    }

    // AuthGuard('jwt') ma control pass krva
    return super.canActivate(context);
  }
}

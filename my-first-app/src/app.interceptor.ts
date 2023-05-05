import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('this is the interceptor');
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    request.body.name = 'this is the name';
    return next.handle().pipe(
      map((data) => {
        data = 'from interceptor';
        return data;
      }),
    );
  }
}

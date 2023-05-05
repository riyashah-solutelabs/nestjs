import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BookGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Guards');
    return true;
  }
}

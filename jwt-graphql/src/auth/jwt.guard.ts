import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const cookies = ctx.req.headers.cookie;
    // console.log(cookies.split('=')[1]);
    // const authorizationHeader = ctx.req.headers.authorization;
    const authorizationHeader = cookies.split('=')[1];
    // console.log(authorizationHeader);
    if (authorizationHeader) {
      const token = authorizationHeader;
      try {
        const user = jwt.verify(token, 'mysecretkey');
        ctx.user = user;
        return true;
      } catch (error) {
        throw new HttpException(
          'Invalid token : ' + error.message,
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      return false;
    }
  }
}

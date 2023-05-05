import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(request.session.userId);
    // return 'hi there';
    // interceptor ma request obj ma pass kryu htu e
    return request.currentUser;
  },
);

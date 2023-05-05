import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Roles = {
  ADMIN: 'ADMIN',
  NORMAL_USER: 'NORMAL_USER',
};

export class RoleGuard implements CanActivate {
  public role: string;

  constructor(role: string) {
    this.role = role;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    //authentication vakhte ctx.user ma store kri hti info tya thi role aave 6 - login  sign krti vkhte jwt
    // console.log(ctx.user);
    const { role } = ctx.user;
    if (role === this.role) return true;
    return false;
  }
}

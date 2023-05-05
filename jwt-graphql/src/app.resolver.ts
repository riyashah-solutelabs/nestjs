import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from './auth/jwt.guard';
import { RoleGuard, Roles } from './auth/role.guard';

@Resolver((of) => String)
export class AppResolver {
  @Query((returns) => String)
  index(): string {
    return 'Nestjs Graphql Server';
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard)
  securedResource(@Context('user') user: any): string {
    return 'Secure resource' + JSON.stringify(user);
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard, new RoleGuard('ADMIN'))
  securedDataForAdmin(@Context('user') user: any): string {
    return 'Secure Data for Admin' + JSON.stringify(user);
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
  securedDataForNormalUser(@Context('user') user: any): string {
    return 'Secure Data For Noraml User' + JSON.stringify(user);
  }

  @Query((returns) => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
    @Context('res') res,
  ): string {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    // return jwt.sign(payload, 'mysecretkey', { expiresIn: '1h' });
    const token = jwt.sign(payload, 'mysecretkey', { expiresIn: '1h' });
    // const expires = new Date(Date.now() * 150 * 24 * 60 * 60 * 1000);
    // res.cookie('authorizationHeader', 'Bearer ' + token, {
    res.cookie('authorizationHeader', token, {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      secure: true,
      domain: 'localhost',
    });
    return token;
  }
}

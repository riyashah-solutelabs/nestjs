import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../users/user.entity';
import { UserService } from '../users/users.service';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super();
  }

  validate(username: string, password: string): User {
    const user: User = this.usersService.getUserByName(username);
    if (user == undefined) throw new UnauthorizedException();
    if (user.password === password) return user;
  }
}

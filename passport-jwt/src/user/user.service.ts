import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class UserService {
  public users: User[] = [
    {
      username: 'User1',
      password: 'admin',
      email: 'user1@gmail.com',
      age: 20,
      role: CONSTANTS.ROLES.ANDROID_DEVELOPER,
    },
    {
      username: 'User2',
      password: 'admin',
      email: 'user2@gmail.com',
      age: 23,
      role: CONSTANTS.ROLES.WEB_DEVELOPER,
    },
    {
      username: 'User3',
      password: 'admin',
      email: 'user3@gmail.com',
      age: 28,
      role: CONSTANTS.ROLES.ANDROID_DEVELOPER,
    },
  ];

  getUserByName(username: string): User {
    return this.users.find((user) => user.username === username);
  }
}

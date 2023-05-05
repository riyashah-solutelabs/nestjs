import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  //aa list ma user hse to guard aagd jva dese ntr nai jva de
  public users: User[] = [
    {
      username: 'User1',
      password: 'admin',
      email: 'user1@gmail.com',
    },
    {
      username: 'User2',
      password: 'admin',
      email: 'user2@gmail.com',
    },
    {
      username: 'User3',
      password: 'admin',
      email: 'user3@gmail.com',
    },
  ];

  // ger object based on username
  getUserByName(username: string): User {
    return this.users.find((user) => user.username === username);
  }
}

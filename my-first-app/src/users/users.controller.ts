import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UsersController {
  //add book
  @Post('/add')
  addUser(): string {
    return 'add a user';
  }

  //find all books
  @Get()
  findAllUsers(): string {
    return 'return all users';
  }
}

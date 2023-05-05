import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookGuard } from './book.guard';

@Controller('book')
export class BookController {
  //add book
  @Post('/add')
  addBook(): string {
    return 'add a book';
  }

  //find all books
  @Get()
  @UseGuards(BookGuard)
  findAllBooks(): string {
    return 'return all books';
  }
}

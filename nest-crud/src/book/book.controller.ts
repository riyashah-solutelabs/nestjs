import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './data/book.dto';
import { randomUUID } from 'crypto';

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/add')
  addBook(@Body() body: Book) {
    body.id = randomUUID();
    return this.bookService.addBookService(body);
  }

  @Get()
  getAllBook(): Book[] {
    return this.bookService.getBooksService();
  }

  @Patch('/update/:id')
  updateBook(@Param('id') id: string, @Body() newbook: Book) {
    return this.bookService.updateBookService(id, newbook);
  }

  @Delete('/delete/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBookService(id);
  }
}

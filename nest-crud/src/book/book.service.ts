import { Injectable } from '@nestjs/common';
import { Book } from './data/book.dto';

@Injectable()
export class BookService {
  public book: Book[] = [];

  addBookService(book: Book): string {
    this.book.push(book);
    return 'book added';
  }

  getBooksService(): Book[] {
    return this.book;
  }

  updateBookService(id: string, newbook: Book): string {
    const bookId = this.book.findIndex((book) => book.id === id);
    this.book[bookId].title = newbook.title;
    this.book[bookId].author = newbook.author;
    this.book[bookId].published = newbook.published;
    return 'updated book';
  }

  deleteBookService(id: string): string {
    this.book = this.book.filter((book) => book.id !== id);
    return 'Book deleted';
  }
}

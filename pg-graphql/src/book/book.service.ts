import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updatebook.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    public readonly bookRepo: Repository<BookEntity>,
  ) {}

  async findAllBooks(): Promise<BookEntity[]> {
    const books = await this.bookRepo.find();
    return books;
  }

  async findBookById(id: number): Promise<BookEntity> {
    const book = await this.bookRepo.findOne({ where: { id: id } });
    return book;
  }

  async deleteBookById(id: number): Promise<string> {
    await this.bookRepo.delete(id);
    return 'Book has been deleted!';
  }

  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    // const book: BookEntity = new BookEntity();
    // book.title = addBookArgs.title;
    // book.price = addBookArgs.price;
    const book: BookEntity = this.bookRepo.create({
      title: addBookArgs.title,
      price: addBookArgs.price,
    });
    await this.bookRepo.save(book);
    return 'Book added successfully';
  }

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    const book = await this.bookRepo.findOne({
      where: { id: updateBookArgs.id },
    });
    // book.title = updateBookArgs.title;
    // book.price = updateBookArgs.price;
    Object.assign(book, updateBookArgs);
    await this.bookRepo.save(book);
    return 'Book updated successfully';
  }
}

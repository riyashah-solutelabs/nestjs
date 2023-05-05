import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { Book as BookModel } from '../graphql';
import { AddBookArgs } from './args/add.book.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  //Queries and mutations
  @Query((returns) => [Book], { name: 'books' })
  getAllBooks(): BookModel[] {
    return this.bookService.findAllBook();
  }

  //nullable: true bcz evi pan id nakhi ske jema book na mle
  @Query((returns) => Book, { name: 'findBookById', nullable: true })
  getBookById(
    @Args({ name: 'bookId', type: () => Int }) id: number,
  ): BookModel {
    return this.bookService.findBookById(id);
  }

  //for add , update and delete we need to define mutations
  @Mutation((returns) => String, { name: 'deleteBook', nullable: true })
  deleteBookById(
    @Args({ name: 'bookId', type: () => Int }) id: number,
  ): string {
    return this.bookService.deleteBook(id);
  }

  @Mutation((returns) => String, { name: 'addBook', nullable: true })
  AddBook(@Args('addBookArgs') addBookArgs: AddBookArgs): string {
    return this.bookService.addBook(addBookArgs);
  }

  @Mutation((returns) => String, { name: 'updateBook', nullable: true })
  UpdateBook(
    @Args({ name: 'bookId', type: () => Int }) id: number,
    @Args('updateBookArgs') updateBookArgs: AddBookArgs,
  ): string {
    return this.bookService.updateBook(id, updateBookArgs);
  }
}

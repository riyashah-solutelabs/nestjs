
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    price?: Nullable<number>;
}

export interface IQuery {
    index(): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    findBookById(bookId: number): Nullable<Book> | Promise<Nullable<Book>>;
}

export interface IMutation {
    deleteBook(bookId: number): Nullable<string> | Promise<Nullable<string>>;
    addBook(addBookArgs: AddBookArgs): Nullable<string> | Promise<Nullable<string>>;
    updateBook(bookId: number, updateBookArgs: AddBookArgs): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;

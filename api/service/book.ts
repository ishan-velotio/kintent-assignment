import * as logger from 'winston';

import BookRepository from '../dataAccess/book';
import AuthorRepository from '../dataAccess/author';

export default class BookService {
  private bookRepo: BookRepository;
  private authorRepo: AuthorRepository;
  constructor() {
    this.bookRepo = new BookRepository();
    this.authorRepo = new AuthorRepository();
  }

  public async create( bookReq: IBookRequest ) {
    logger.info('Service called to create the book');

    const bookAttrs = this.toAttributeObj(bookReq);
    const book = await this.bookRepo.create(bookAttrs);

    logger.info('Book Created');
    if (bookReq.authorIds.length) {
      const authors = await this.authorRepo.getByIds(bookReq.authorIds);
      await this.bookRepo.updateBookAuthor(book, authors);
      logger.info('Book Authors Updated');
    }

    const bookAuthors = await book.getAuthors();

    return this.toResponseObj(book, bookAuthors);
  }


  private toAttributeObj(book: IBookRequest): IBookAttributes {
    return {
      name: book.name,
      version: book.version,
      publishYear: book.publishYear,
      publisher: book.publisher,
      description: book.description,
    }
  }

  private toResponseObj(book: IBookInstance, authors: IAuthorInstance[] = []): IBook {
    return {
      id: book.id,
      name: book.name,
      description: book.description,
      version: book.version,
      publishYear: book.publishYear,
      publisher: book.publisher,
      authors: authors.map(author => `${author.firstName} ${author.lastName}`),
    }
  }
}

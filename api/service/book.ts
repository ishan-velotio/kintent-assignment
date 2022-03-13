import * as logger from 'winston';

import BookRepository from '../dataAccess/book';
import AuthorRepository from '../dataAccess/author';
import db from '../models';

export default class BookService {
  private bookRepo: BookRepository;
  private authorRepo: AuthorRepository;
  constructor() {
    this.bookRepo = new BookRepository();
    this.authorRepo = new AuthorRepository();
  }

  public async create( bookReq: IBookRequest ): Promise<IBook> {
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

  public async get( bookId: number ): Promise<IBook> {
    logger.info('Service called to get a book');

    const book = await this.bookRepo.getById(bookId);
    const bookAuthors = await book.getAuthors();

    return this.toResponseObj(book, bookAuthors);
  }

  public async getAll(searchParams: IBookSearchParam): Promise<IBook[]> {
    logger.info('Service called to get all books');

    const {whereClause, limit, offset} = this.getSearchOptions(searchParams);

    const books = await this.bookRepo.getAll(whereClause, limit, offset);
    const response: IBook[] = [];
    for (const book of books) {
      const bookAuthors = await book.getAuthors();
      response.push(this.toResponseObj(book, bookAuthors));
    }

    return response;
  }

  public async update( bookId: number, bookReq: IBookRequest ): Promise<IBook> {
    logger.info('Service called to update a book');

    const bookAttrs = this.toAttributeObj(bookReq);
    const bookUpdateObj = await this.bookRepo.update(bookId, bookAttrs);
    const book = bookUpdateObj[1][0];
    if (bookReq.authorIds.length) {
      const authors = await this.authorRepo.getByIds(bookReq.authorIds);
      await this.bookRepo.updateBookAuthor(book, authors);
      logger.info('Book Authors Updated');
    } else {
      await this.bookRepo.updateBookAuthor(book, []);
    }

    const bookAuthors = await book.getAuthors();

    return this.toResponseObj(book, bookAuthors);
  }

  public async delete( bookId: number ) {
    logger.info('Service called to delete a book');

    await this.bookRepo.delete(bookId);
    logger.info('Book deleted');
  }

  private getSearchOptions(searchParams: IBookSearchParam) {
    let whereClause = {};

    console.log(searchParams);

    if (searchParams.searchString && searchParams.searchString.trim().length) {
      whereClause = { ...whereClause, name: {[db.Sequelize.Op.iLike]: `%${searchParams.searchString}%`} };
      console.log('Here')
    }

    console.log(whereClause);

    const limit: number = searchParams.limit || null;
    const offset: number = searchParams.offset || null;

    return { whereClause, limit, offset };
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

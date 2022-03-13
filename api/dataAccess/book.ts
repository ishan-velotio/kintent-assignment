import { WhereOptions } from 'sequelize';
import * as logger from 'winston';

import { InternalServerError } from '../errors';
import db from '../models';

export default class BookRepository {
  constructor() {}

  public async create( bookAttrs: IBookAttributes ): Promise<IBookInstance> {
    logger.info('Creating Book...');

    let book: IBookInstance = null;
    try {
      book = await db.Book.create(bookAttrs);
    } catch (error) {
      const errMsg = 'Error while creating the book';
      logger.error(errMsg);
      logger.error(error);

      throw new InternalServerError(errMsg);
    }

    return this.getById(book.id);
  }

  public async getById( bookId: number ): Promise<IBookInstance> {
    logger.info('Getting Book...');

    let book: IBookInstance = null;
    try {
      book = await db.Book.findOne({
        where: {
          id: bookId,
        }
      });
    } catch (error) {
      const errMsg = 'Error while getting the book';
      logger.error(errMsg);
      logger.error(error);

      throw new InternalServerError(errMsg);
    }

    return book;
  }

  public async getAll(whereClause: WhereOptions<IBookAttributes> = null, limit = null, offset = null): Promise<IBookInstance[]> {
    logger.info('Getting all Books...');

    let books: IBookInstance[] = [];
    try {
      books = await db.Book.findAll({ where: whereClause, limit, offset });
    } catch (error) {
      const errMsg = 'Error while getting all books';
      logger.error(errMsg);
      logger.error(error);

      throw new InternalServerError(errMsg);
    }

    return books;
  }

  public async update(bookId: number, bookAttrs: IBookAttributes): Promise<[number, IBookInstance[]]> {
    logger.info('Updating book...');
    let book: [number, IBookInstance[]];
    try {
      book = await db.Book.update(bookAttrs, {
        where: {
          id: bookId,
        },
        returning: true,
      });
    } catch (error) {
      const errMsg = 'Error while updating the book';
      logger.error(errMsg);
      logger.error(error);
  
      throw new InternalServerError(errMsg);
    }

    return book;
  }

  public async delete(bookId: number) {
    logger.info('deleting a book...');

    try {
      await db.Book.destroy({
        where: {
          id: bookId,
        },
      });
    } catch (error) {
      const errMsg = 'Error while deleting a book';
      logger.error(errMsg);
      logger.error(error);
  
      throw new InternalServerError(errMsg);
    }
  }

  public async updateBookAuthor(book: IBookInstance, authors: IAuthorInstance[]) {
    logger.info('Setting Authors...');

    try {
      await book.setAuthors(authors);
    } catch (error) {

    }
  }
}

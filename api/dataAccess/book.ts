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

  public async updateBookAuthor(book: IBookInstance, authors: IAuthorInstance[]) {
    logger.info('Setting Authors...');

    try {
      await book.setAuthors(authors);
    } catch (error) {

    }
  }
}

import * as logger from 'winston';

import { InternalServerError } from '../errors';
import db from '../models';

export default class AuthorRepository {
  constructor() {}

  public async create( authorAttrs: IAuthorAttributes ): Promise<IAuthorInstance> {
    logger.info('Creating Author...');

    let author: IAuthorInstance = null;
    try {
      author = await db.Author.create(authorAttrs);
    } catch (error) {
      const errMsg = 'Error while creating the author';
      logger.error(errMsg);
      logger.error(error);

      throw new InternalServerError(errMsg);
    }

    return this.getById(author.id);
  }

  public async getById( authorId: number ): Promise<IAuthorInstance> {
    logger.info('Getting Author...');

    let author: IAuthorInstance = null;
    try {
      author = await db.Author.findOne({
        where: {
          id: authorId,
        }
      });
    } catch (error) {
      const errMsg = 'Error while getting the author';
      logger.error(errMsg);
      logger.error(error);

      throw new InternalServerError(errMsg);
    }

    return author;
  }

  public async getByIds( authorIds: number[] ): Promise<IAuthorInstance[]> {
    logger.info('Getting Authors...');

    let authors: IAuthorInstance[] = [];
    try {
      authors = await db.Author.findAll({
        where: {
          id: authorIds,
        }
      });
    } catch (error) {
      const errMsg = 'Error while getting the authors';
      logger.error(errMsg);
      logger.error(error);

      throw new InternalServerError(errMsg);
    }

    return authors;
  }
}

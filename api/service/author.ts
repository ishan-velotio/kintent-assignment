import * as logger from 'winston';

import AuthorRepository from '../dataAccess/author';

export default class AuthorService {
  private authorRepo: AuthorRepository;
  constructor() {
    this.authorRepo = new AuthorRepository();
  }

  public async create( authorReq: IAuthorRequest ) {
    logger.info('Service called to create an author');

    const authorAttrs = this.toAttributeObj(authorReq);
    const author = await this.authorRepo.create(authorAttrs);

    logger.info('Author Created');

    return this.toResponseObj(author);
  }


  private toAttributeObj(author: IAuthorRequest): IAuthorAttributes {
    return {
      firstName: author.firstName,
      lastName: author.lastName,
      dob: author.dob,
      phone: author.phone,
      email: author.email,
    }
  }

  private toResponseObj(author: IAuthorInstance): IAuthor {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      dob: author.dob,
      phone: author.phone,
      email: author.email,
    }
  }
}

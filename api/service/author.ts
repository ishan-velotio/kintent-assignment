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

  public async getAll() {
    logger.info('Service called to get all authors');

    const authors = await this.authorRepo.getAll();
    logger.info('Authors Fetched');

    return authors.map( author => this.toResponseObj(author));
  }

  public async get( authorId: number ) {
    logger.info('Service called to get an author');

    const author = await this.authorRepo.getById(authorId);
    const authorBooks = await author.getBooks();

    logger.info('Author Fetched');

    return this.toResponseObj(author, authorBooks);
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

  private toResponseObj(author: IAuthorInstance, books: IBookInstance[] = []): IAuthor {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      dob: author.dob,
      phone: author.phone,
      email: author.email,
      books: books.map(book => book.name),
    }
  }
}

import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import AuthorService from '../../../api/service/author';
import AuthorRepository from '../../../api/dataAccess/author';

const authorService = new AuthorService();

describe('Author Service: create method', () => {
  let sandbox;
  let requestBody: IAuthorRequest = null;

  let responseBody;
  let author: Partial<IAuthorInstance> = null;
  let result;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    requestBody = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '9889988998',
        email: 'john.doe@test.com',
        dob: new Date('2020-08-17T09:04:53.308Z'),
      }

    author = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '9889988998',
      email: 'john.doe@test.com',
      dob: new Date('2020-08-17T09:04:53.308Z'),
    };

    responseBody = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '9889988998',
      email: 'john.doe@test.com',
      dob: new Date('2020-08-17T09:04:53.308Z'),
      books: [],
    };
  });

  afterEach(() => {
    sandbox = sandbox.restore();
  });

  it('Should create an author with status code 201', async () => {
    sandbox
      .stub(AuthorRepository.prototype, 'create')
      .resolves(author);

    result = await authorService.create(requestBody);

    expect(result).to.deep.equal(responseBody, 'response did not match');
  });

  it('Should throw internal server error while creating author', async () => {
    sandbox
      .stub(AuthorRepository.prototype, 'create')
      .throws({ name: 'InternalServerError' });

    await authorService.create(requestBody).catch(err => {
      expect(err.name).to.deep.equal('InternalServerError');
    });
  });
});

describe('Author Service: getAll method', () => {
    let sandbox;
  
    let responseBody;
    let authors: Partial<IAuthorInstance>[] = [];
    let result;
  
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      authors = [{
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '9889988998',
        email: 'john.doe@test.com',
        dob: new Date('2020-08-17T09:04:53.308Z'),
      }];
  
      responseBody = [{
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '9889988998',
        email: 'john.doe@test.com',
        dob: new Date('2020-08-17T09:04:53.308Z'),
        books: [],
      }];
    });
  
    afterEach(() => {
      sandbox = sandbox.restore();
    });
  
    it('Should return all authors with status code 200', async () => {
      sandbox
        .stub(AuthorRepository.prototype, 'getAll')
        .resolves(authors);
  
      result = await authorService.getAll();
  
      expect(result).to.deep.equal(responseBody, 'response did not match');
    });
  
    it('Should throw internal server error while creating author', async () => {
      sandbox
        .stub(AuthorRepository.prototype, 'getAll')
        .throws({ name: 'InternalServerError' });
  
      await authorService.getAll().catch(err => {
        expect(err.name).to.deep.equal('InternalServerError');
      });
    });
  });

  // Similarly can be written for all service methods
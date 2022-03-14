import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import AuthorRepository from '../../../api/dataAccess/author';
import db from '../../../api/models'


const authorRepo = new AuthorRepository();

describe('Author DataAccess Layer: create method', () => {
  let sandbox;
  let requestAttrs: IAuthorAttributes = null;

  let responseBody;
  let author: Partial<IAuthorInstance> = null;
  let result;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    requestAttrs = {
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
    sandbox.stub(db.Author, 'create').resolves(author);
    sandbox.stub(AuthorRepository.prototype, 'getById').withArgs(author.id).resolves(responseBody);
    result = await authorRepo.create(requestAttrs);

    expect(result).to.deep.equal(responseBody, 'response did not match');
  });
});

describe('Author DataAccess Layer: getById method', () => {
    let sandbox;
    const authorId = 1;
  
    let responseBody;
    let author = null;
    let result;
  
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      author = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '9889988998',
        email: 'john.doe@test.com',
        dob: new Date('2020-08-17T09:04:53.308Z'),
        books: [],
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
      sandbox.stub(db.Author, 'findOne').resolves(author);
      result = await authorRepo.getById(authorId);
  
      expect(result).to.deep.equal(responseBody, 'response did not match');
    });
  });

  // Similarly can be written for other data access layers
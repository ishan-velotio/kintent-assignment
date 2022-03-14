import 'mocha';
import { expect } from 'chai';
import * as httpMocks from 'node-mocks-http';
import * as sinon from 'sinon';

import {
  create,
  getAll,
} from '../../../api/controllers/author';
import { AppError } from '../../../api/errors';
import AuthorService from '../../../api/service/author';

describe('Author Controller: create method', () => {
  let responseBody;
  let requestBody: IAuthorRequest;
  let request;
  let response;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    requestBody = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '9889988998',
      email: 'john.doe@test.com',
      dob: new Date('2020-08-17T09:04:53.308Z'),
    }

    responseBody = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '9889988998',
      email: 'john.doe@test.com',
      dob: '2020-08-17T09:04:53.308Z',
    };

    request = httpMocks.createRequest({
      method: 'POST',
      url: '/authors',
      swagger: {
        params: {
          body: {
            value: requestBody,
          },
        },
      },
    });

    response = httpMocks.createResponse();
  });

  afterEach(() => {
    sandbox = sandbox.restore();
  });

  it('Should create an author with status code 201', async () => {
    sandbox
      .stub(AuthorService.prototype, 'create')
      .withArgs(requestBody)
      .resolves(responseBody);

    await create(request, response);

    expect(response.statusCode).to.equal(201);
    expect(JSON.parse(response._getData())).to.deep.equal(
      responseBody,
      'response body did not match'
    );
  });

  it('Should throw error while creating author', async () => {
    const errorMsg = 'Something went wrong. Please try again later.';
    sandbox
      .stub(AuthorService.prototype, 'create')
      .withArgs(requestBody)
      .throws(
        new AppError('Something went wrong. Please try again later.', 400)
      );

    await create(request, response);

    expect(response.statusCode).to.equal(400);
    expect(JSON.parse(response._getData())).to.deep.equal(
      { message: errorMsg },
      'response body did not match'
    );
  });
});

describe('Author Controller: getAll method', () => {
  let responseBody;
  let request;
  let response;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    responseBody = [{
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '9889988998',
      email: 'john.doe@test.com',
      dob: '2020-08-17T09:04:53.308Z',
    }];

    request = httpMocks.createRequest({
      method: 'GET',
      url: '/authors',
      swagger: {
        params: {
        },
      },
    });

    response = httpMocks.createResponse();
  });

  afterEach(() => {
    sandbox = sandbox.restore();
  });

  it('Should return all authors with status code 200', async () => {
    sandbox
      .stub(AuthorService.prototype, 'getAll')
      .withArgs()
      .resolves(responseBody);

    await getAll(request, response);

    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response._getData())).to.deep.equal(
      responseBody,
      'response body did not match'
    );
  });

  it('Should throw error while returning authors', async () => {
    const errorMsg = 'Something went wrong. Please try again later.';
    sandbox
      .stub(AuthorService.prototype, 'getAll')
      .withArgs()
      .throws(
        new AppError('Something went wrong. Please try again later.', 400)
      );

    await getAll(request, response);

    expect(response.statusCode).to.equal(400);
    expect(JSON.parse(response._getData())).to.deep.equal(
      { message: errorMsg },
      'response body did not match'
    );
  });
});

// Similarly can be written for other Author Controllers
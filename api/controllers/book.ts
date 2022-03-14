import * as logger from 'winston';

import BookService from '../service/book';

const bookService: BookService = new BookService();

export const create = async (request, response) => {
  logger.info('Received request to create a book.');

  const requestBody: IBookRequest =
    request.swagger.params.body.value;

  logger.debug(`Request body - ${JSON.stringify(requestBody)}`);

  try {
    const author = await bookService.create(requestBody);
    logger.info('Sending response to the client.');

    return response.status(201).json(author);
  } catch (error) {
    logger.info('Something went wrong.');

    return response.status(error.statusCode).json(error.statusMessage);
  }
};
import * as logger from 'winston';

import BookService from '../service/book';

const bookService: BookService = new BookService();

export const create = async (request, response) => {
  logger.info('Received request to create a book.');

  const requestBody: IBookRequest =
    request.swagger.params.body.value;
  const isbn: string = request.swagger.params.isbn.value || null;

  logger.debug(`Request body - ${JSON.stringify(requestBody)}`);

  try {
    const book = await bookService.create(requestBody, isbn);
    logger.info('Sending response to the client.');

    return response.status(201).json(book);
  } catch (error) {
    logger.info('Something went wrong.');

    return response.status(error.statusCode).json(error.statusMessage);
  }
};

export const edit = async (request, response) => {
  logger.info('Received request to update a book.');
  
  const bookId: number = request.swagger.params.id.value;
  const requestBody: IBookRequest =
    request.swagger.params.body.value;
  
  logger.debug(`Request body - ${JSON.stringify(requestBody)}`);
  
  try {
    const book = await bookService.update(bookId, requestBody);
    logger.info('Sending response to the client.');
  
    return response.status(201).json(book);
  } catch (error) {
    logger.info('Something went wrong.');
  
    return response.status(error.statusCode).json(error.statusMessage);
  }
};

export const get = async (request, response) => {
  logger.info('Received request to get a book.');
  
  const bookId: number = request.swagger.params.id.value;
  
  try {
    const book = await bookService.get(bookId);
    logger.info('Sending response to the client.');
  
    return response.status(200).json(book);
  } catch (error) {
    logger.info('Something went wrong.');
  
    return response.status(error.statusCode).json(error.statusMessage);
  }
};

export const getAll = async (request, response) => {
  logger.info('Received request to get all books.');

  const searchString: string = request.swagger.params.q.value;
  const limit: number = request.swagger.params.limit.value;
  const offset: number = request.swagger.params.offset.value;

  const searchParams: IBookSearchParam = {
    searchString,
    limit,
    offset,
  }

  try {
    const books = await bookService.getAll(searchParams);
    logger.info('Sending response to the client.');

    return response.status(200).json(books);
  } catch (error) {
    logger.info('Something went wrong.');

    return response.status(error.statusCode).json(error.statusMessage);
  }
};

export const deleteBook = async (request, response) => {
  logger.info('Received request to delete a book.');
    
  const bookId: number = request.swagger.params.id.value;
    
  try {
    const res = await bookService.delete(bookId);
    logger.info('Sending response to the client.');
    
    return response.status(200).json(res);
  } catch (error) {
    logger.info('Something went wrong.');
    
    return response.status(error.statusCode).json(error.statusMessage);
  }
};
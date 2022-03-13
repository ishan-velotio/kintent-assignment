import * as logger from 'winston';

import AuthorService from '../service/author';

const authorService: AuthorService = new AuthorService();

export const create = async (request, response) => {
  logger.info('Received request to create an author.');

  const requestBody: IAuthorRequest =
    request.swagger.params.body.value;

  logger.debug(`Request body - ${JSON.stringify(requestBody)}`);

  try {
    const author = await authorService.create(requestBody);
    logger.info('Sending response to the client.');

    return response.status(201).json(author);
  } catch (error) {
    logger.info('Something went wrong.');

    return response.status(error.statusCode).json(error.statusMessage);
  }
};

export const getAll = async (request, response) => {
  logger.info('Received request to get all authors.');
  
  try {
    const authors = await authorService.getAll();
    logger.info('Sending response to the client.');
  
    return response.status(200).json(authors);
  } catch (error) {
    logger.info('Something went wrong.');
  
    return response.status(error.statusCode).json(error.statusMessage);
  }
};

export const get = async (request, response) => {
    logger.info('Received request to get all authors.');

    const authorId: number = request.swagger.params.id.value;
    
    try {
      const author = await authorService.get(authorId);
      logger.info('Sending response to the client.');
    
      return response.status(200).json(author);
    } catch (error) {
      logger.info('Something went wrong.');
    
      return response.status(error.statusCode).json(error.statusMessage);
    }
  };
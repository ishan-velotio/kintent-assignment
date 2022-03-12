import * as logger from 'winston';

export const JWT = async (request, response, next) => {
  logger.info(`Request: ${request.method}, ${request.path}`);

  next();
};

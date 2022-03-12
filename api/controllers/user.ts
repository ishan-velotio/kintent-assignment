import * as logger from 'winston';

import UserService from '../service/user';

const userService: UserService = new UserService();

export const create = async (request, response) => {
  logger.info('Received request to create user.');

  const requestBody: IUserRequest =
    request.swagger.params.body.value;

  logger.debug(`Request body - ${JSON.stringify(requestBody)}`);

  try {
    const user = await userService.create(requestBody);
    logger.info('Sending response to the client.');

    return response.status(201).json(user);
  } catch (error) {
    logger.info('Something went wrong.');

    return response.status(error.statusCode).json(error.statusMessage);
  }
};
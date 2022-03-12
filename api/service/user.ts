import * as logger from 'winston';

export default class UserService {
  constructor() {}

  public async create( user: IUserRequest ) {
    logger.info('Service called to create an agency');
  }
}

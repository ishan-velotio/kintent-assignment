import * as logger from 'winston';
import axios from 'axios';

import { InternalServerError } from '../errors';

export const getBookByISBN = async (isbn: string) => {
  logger.info('Service called to get book by ISBN');

  const isbnURL = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`

  try {
    const response = await axios({
      method: 'GET',
      url: isbnURL,
    });
    logger.info(`Book Details fetched`);

    return response && response.data;
  } catch (err) {
    const errMsg = `Error occured while getting book by isdn`;
    logger.error(errMsg);
    logger.error(err.message);

    throw new InternalServerError(errMsg);
  }
}
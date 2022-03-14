// tslint:disable-next-line:no-reference
/// <reference path="../../api/types/models.d.ts" />
// tslint:disable-next-line:no-reference
/// <reference path="../../api/types/types.d.ts" />

import * as winston from 'winston';
import { dbTestInit } from '../../api/models';
import { initLogger } from '../../api/core/logger';

const logger = initLogger();
logger.info('Initialized logger');

const dbModels = [
  'Author',
  'Book',
  'BookAuthor',
];

const modelStubs = {};
const sequelizeMethods = {
  // tslint:disable-next-line:no-empty
  create() {},
  // tslint:disable-next-line:no-empty
  bulkCreate() {},
  // tslint:disable-next-line:no-empty
  findOne() {},
  // tslint:disable-next-line:no-empty
  findAll() {},
  // tslint:disable-next-line:no-empty
  findbulkCreateOne() {},
  // tslint:disable-next-line:no-empty
  update() {},
  // tslint:disable-next-line:no-empty
  max() {},
  // tslint:disable-next-line:no-empty
  destroy() {},
  // tslint:disable-next-line:no-empty
  findAndCountAll() {},
  // tslint:disable-next-line:no-empty
  count() {},
  // tslint:disable-next-line:no-empty
  findById() {},
  // tslint:disable-next-line:no-empty
  save() {},
};

for (const dbModel of dbModels) {
  modelStubs[dbModel] = Object.assign({}, sequelizeMethods);
}

// tslint:disable-next-line:no-string-literal
modelStubs['Sequelize'] = {
  Op: ['notILike', 'iLike', 'notIn', 'not', 'lte'],
  // tslint:disable-next-line:no-empty
  col: () => {},
  // tslint:disable-next-line:no-empty
  fn: () => {},
  // tslint:disable-next-line:no-empty
  where: () => {},
  // tslint:disable-next-line:no-empty
  literal: () => {},
};

// tslint:disable-next-line:no-string-literal
modelStubs['sequelize'] = {
  QueryTypes: ['SELECT'],
  // tslint:disable-next-line:no-empty
  query: () => {},
  // tslint:disable-next-line:no-empty
  literal: () => {},
  // tslint:disable-next-line:no-empty
  col: () => {},
  // tslint:disable-next-line:no-empty
  fn: () => {},
  // tslint:disable-next-line:no-empty
  where: () => {},
  // tslint:disable-next-line:no-empty
  cast: () => {},
};

dbTestInit(modelStubs);

winston.remove(winston.transports.Console);

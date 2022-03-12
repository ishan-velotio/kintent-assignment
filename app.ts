import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as httpContext from 'express-http-context';
// import * as expressJWT from 'express-jwt';
import * as helmet from 'helmet';
import * as SwaggerExpress from 'swagger-express-mw';
import * as uuid from 'uuid/v1';

import { dbInit } from './api/models';
import { initConfig } from './config';
import { initLogger } from './api/core/logger';

const logger = initLogger();
logger.info('Initialized logger');

const config = initConfig();
logger.info('Initialized app config.');

const db = dbInit(config);
logger.info('Initialized database.');

const app = express();

app.use(express.static('static/assets'));
app.use(express.static('uploads'));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json({ limit: '15mb' }));

// app.use(
//   expressJWT({ secret: config.jwt.jwtSecret }).unless({
//     path: [],
//   })
// );

app.use(helmet());

app.use(httpContext.middleware);

app.use((req, res, next) => {
  httpContext.set('reqId', uuid());
  next();
});

const swaggerConfig = {
  appRoot: __dirname,
};

SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) {
    logger.error('Error occurred while intializing swagger.');
    logger.error(err);
  }
  swaggerExpress.register(app);
});

let server;
db.sequelize.sync().then(() => {
  server = app.listen(3000, '0.0.0.0', () => {
    logger.info('server started on port 3000');
  });
});

// TODO
// Use async await instead of callbacks.
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  logger.info('Received kill signal, shutting down gracefully');
  server.close(() => {
    db.sequelize.close().then(() => {
      logger.info('Closed all the DB connections');
      process.exit(0);
    });
  });
}

export default app;

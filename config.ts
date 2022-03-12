import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import * as path from 'path';

interface IAppConfig {
  db: {
    username: string,
    password: string,
    database: string,
    dialect: string,
    protocol: string,
    port: number,
    host: string,
    logging: boolean,
    force: boolean,
    dialectOptions: {
      supportBigNumbers: boolean,
      bigNumberStrings: boolean,
      multipleStatements: boolean,
    },
    pool: {
      max: number,
      min: number,
      idle: number,
      acquire: number,
    },
  },
  jwt: {
    jwtSecret: string,
    jwtSessionTimeOut: string,
    saltRounds: number,
  },
}

const config: IAppConfig = {
  db: {
    username: '',
    password: '',
    database: '',
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    host: '127.0.0.1',
    logging: false,
    force: false,
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: false,
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 10000,
    },
  },
  jwt: {
    jwtSecret: '',
    jwtSessionTimeOut: '',
    saltRounds: 10,
  },
};

const initConfig = (): IAppConfig => {
  /*
   * TODO
   * Merge default.yaml and the env.yaml
   */
  const env = process.env.NODE_ENV || 'development';
  const configFile = path.join(__dirname, 'config', 'env', `${env}.yaml`);

  const envConfig = yaml.safeLoad(fs.readFileSync(configFile, 'UTF-8'));
  _.merge(config, envConfig);

  return config;
};

const enviroment = process.env.NODE_ENV || 'development';

export default config;
export { initConfig, enviroment };

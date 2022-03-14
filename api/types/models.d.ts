import { RuleProperties } from 'json-rules-engine';
import { Options as RRuleOptions } from 'rrule';
import * as sequelize from 'sequelize';

declare global {
  interface IDbConnection {
    User: sequelize.Model<IUserInstance, IUserAttributes>;

    sequelize: any;
    Sequelize: any;
  }


  interface IUserAttributes {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    title?: string;
    department?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }

  interface IUserInstance
    extends sequelize.Instance<IUserAttributes>,
      IUserAttributes {}
}

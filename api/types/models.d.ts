import { RuleProperties } from 'json-rules-engine';
import { Options as RRuleOptions } from 'rrule';
import * as sequelize from 'sequelize';

declare global {
  interface IDbConnection {
    User: sequelize.Model<IUserInstance, IUserAttributes>;
    Book: sequelize.Model<IBookInstance, IBookAttributes>;
    Author: sequelize.Model<IAuthorInstance, IAuthorAttributes>;
    BookAuthor: sequelize.Model<IBookAuthorInstance, IBookAuthorAttributes>;

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

  interface IBookAttributes {
    id?: number;
    name?: string;
    description?: string;
    publishYear?: number;
    publisher?: string;
    version?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }

  interface IBookInstance
    extends sequelize.Instance<IBookAttributes>,
      IBookAttributes {}

  interface IAuthorAttributes {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dob?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }

  interface IAuthorInstance
    extends sequelize.Instance<IAuthorAttributes>,
      IAuthorAttributes {}

  interface IBookAuthorAttributes {
    id?: number;
    bookId?: number;
    authorId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }

  interface IBookAuthorInstance
    extends sequelize.Instance<IBookAuthorAttributes>,
      IBookAuthorAttributes {}
}

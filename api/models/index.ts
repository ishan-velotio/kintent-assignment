import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

/*
 * IDbConnection is an interface consisting of a large number of properties.
 * We are initializing this object by reading the models at run time.
 * To minimize empty initialisations, the TSlint rule
 * no-object-literal-type-assertion has been disabled.
 */

// tslint:disable-next-line: no-object-literal-type-assertion
const db = {} as IDbConnection;

const dbInit = appConfig => {
  const sequelize = new Sequelize(
    appConfig.db.database,
    appConfig.db.username,
    appConfig.db.password,
    appConfig.db
  );

  if (sequelize) {
    const basename = path.basename(module.filename);

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js'
        );
      })
      .forEach(file => {
        const model: any = sequelize.import(
          path.join(__dirname, file.split('.')[0])
        );
        db[model.name] = model;
      });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    createManyToManyRelations(db);

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
  } else {
    console.error(
      'Error, Not connecteed to database. Please check the connection!'
    );
  }
};

// Importing the dependent models for a many to many relatinoship casuses
// cyclic dependency issues. Hence create many to many relationships after
// the models have been added to the db object.
const createManyToManyRelations = (_db: IDbConnection) => {
  db.Author.belongsToMany(db.Book, {
    as: 'books',
    through: 'BookAuthor',
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
  });

  db.Book.belongsToMany(db.Author, {
    as: 'authors',
    through: 'BookAuthor',
    foreignKey: 'bookId',
    onDelete: 'CASCADE',
  });
};

const dbTestInit = modelStubs => {
  for (const key of Object.keys(modelStubs)) {
    db[key] = modelStubs[key];
  }
};

export default db as IDbConnection;
export { dbInit, dbTestInit };

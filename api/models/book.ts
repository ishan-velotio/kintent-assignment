import * as Sequelize from 'sequelize';

export default function defineBook(
  sequelize: Sequelize.Sequelize,
  DataTypes: any
) {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isNumeric: true,
        },
      },
      name: {
        type: DataTypes.STRING(512),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 512],
        },
      },
      description: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 2048],
        },
      },
      publishYear: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 8],
        }, 
      },
      publisher: {
        type: DataTypes.STRING(512),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 512],
        },
      },
      version: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 16],
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      timestamps: true,
      tableName: 'books',
    }
  );

  return Book;
}

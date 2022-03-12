import * as Sequelize from 'sequelize';

export default function defineBookAuthor(
  sequelize: Sequelize.Sequelize,
  DataTypes: any
) {
  const BookAuthor = sequelize.define(
    'BookAuthor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isNumeric: true,
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'book_id',
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'author_id',
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
      tableName: 'book_author',
      indexes: [{
        unique: true,
        name: 'book_author_composite_key',
        fields: ['book_id', 'author_id'],
      }]
    }
  );

  return BookAuthor;
}

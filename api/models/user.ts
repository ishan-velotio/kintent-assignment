import * as Sequelize from 'sequelize';

export default function defineUser(
  sequelize: Sequelize.Sequelize,
  DataTypes: any
) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isNumeric: true,
        },
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
        field: 'last_name',
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: { msg: 'Invalid email' },
          len: [1, 100],
        },
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [1, 50],
        },
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [1, 50],
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
      tableName: 'users',
    }
  );

  return User;
}

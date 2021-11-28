import { Model, DataTypes } from "sequelize";

import { sequelize } from "./index";
/**
 * User Class Model
 */
class User extends Model {
  id!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  picture!: string;

  password!: string;

  country!: string;

  dateOfBirth!: Date;

  loginDate!: Date;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    loginDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: `${process.env.DB_TABLE_PREFIX}Users`,
    timestamps: true,
  }
);

export default User;
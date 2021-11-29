import { Model, DataTypes, UUID, UUIDV4 } from "sequelize";

import { sequelize } from "./index";
/**
 * Region Class Model
 */
class Region extends Model {
  id!: string;

  name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Region.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: `${process.env.DB_TABLE_PREFIX}Region`,
    timestamps: true,
  }
);

export default Region;
import { Model, DataTypes} from "sequelize";

import { sequelize } from "./index";
/**
 * User Class Model
 */
interface country {
    region: string,
    subRegion: string,
    currencies: string,
    languages: string,

}
class SavedList extends Model {
  userId!: string;

  country!: country;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

SavedList.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: `${process.env.DB_TABLE_PREFIX}SavedList`,
    timestamps: true,
  }
);

export default SavedList;
import { any } from "joi";
import { Model, DataTypes, } from "sequelize";

import { sequelize } from "./index";
/**
 * Country Class Model
 */
class Country extends Model {

  nativeName!: string;

  region!: string;

  subRegion!: string;

  population!: string;

  capital!: string;

  topLevelDomain!: string;

  currencies!: string;

  languages!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
  
  static associate(models: any) {
  Country.belongsToMany(models.subRegion, {
    through: 'CountryAssignments'
   })
}
}

Country.init(
  {
  
    nativeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subRegion: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    population: {
      type: DataTypes.STRING,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topLevelDomain: {
      type: DataTypes.STRING,
    },
    currencies: {
      type: DataTypes.STRING,
    },
    languages: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: `${process.env.DB_TABLE_PREFIX}Countries`,
    timestamps: true,
  }
);

export default Country;
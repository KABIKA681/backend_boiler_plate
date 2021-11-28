import "dotenv/config";
import { Sequelize } from "sequelize";

/* @ts-ignore*/
import dbConfig from "src/database/config";

const env = process.env.NODE_ENV || "development";

const db = {} as Record<string, unknown>;

const config = dbConfig[env];

const { database, username, password, ...options } = config;

export const sequelize = new Sequelize(database, username, password, options);

db.sequelize = sequelize;

export default db;

import { Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  dialectModule: pg, 
});

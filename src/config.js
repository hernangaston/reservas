import { config } from "dotenv";
config();

export const PORT = process.env.NODE_DOCKER_PORT || 3000;
export const DB_HOST = process.env.MYSQLDB_HOST || "localhost";
export const DB_USER = process.env.MYSQLDB_USER || "root";
export const DB_PASSWORD = process.env.MYSQLDB_ROOT_PASSWORD || "hernan";
export const DB_DATABASE = process.env.MYSQLDB_DATABASE || "tpvuelos";
export const DB_PORT = process.env.MYSQLDB_DOCKER_PORT || 3306;


import { createPool } from "mysql2/promise";
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from "./config.js";

export const db = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
});
//test db connection
try {
    const connection = await db.getConnection();
    console.log('Data base connection ok');
    connection.release();
} catch (error) {
    console.error('Database connection failed:', error.message);
}
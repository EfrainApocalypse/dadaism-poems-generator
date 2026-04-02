import "server-only";
import mysql, { type Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

let connectionPromise: Promise<Connection> | null = null;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_NAME = process.env.DB_NAME || "test";
const DB_PASS = process.env.DB_PASS || "";

export async function getConnection() {
  if (!connectionPromise) {
    connectionPromise = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASS,
    });
  }

  try {
    return await connectionPromise;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
}

import mongoose from "mongoose";
import { createConnection } from "mysql2/promise";

export async function connectDb(uri: string) {
    await mongoose.connect(uri);
    console.log("Database Connected :)");
}

export async function disconnectDb() {
    await mongoose.disconnect();
    console.log("Database Disconnected :(");
}

export async function connectMySQLDb(config: { host: string; user: string; password: string; database: string; }) {
    const connection = await createConnection(config);
    console.log("MySQL Database Connected :)");
    return connection;
}

export async function disconnectMySQLDb(connection: any) {
    await connection.end();
    console.log("MySQL Database Disconnected :(");
}


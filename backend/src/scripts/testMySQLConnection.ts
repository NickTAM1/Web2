import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

async function testMySQLConnection() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.MySqlPORT || '3306', 10),
    };

    try {
        const connection = await createConnection(config);
        console.log('Connected to MySQL database successfully!');

        const [rows] = await connection.execute('SHOW TABLES');
        console.log('Tables in the database:', rows);

        await connection.end();
    } catch (error) {
        console.error('Error connecting to MySQL database:', error.message);
    }
}

testMySQLConnection();
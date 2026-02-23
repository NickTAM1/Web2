import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

async function seedMySQLStudents() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.MySqlPORT || '3306', 10),
    };

    const sampleStudents = [
        { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
        { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' },
        { first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com' },
        { first_name: 'Bob', last_name: 'Brown', email: 'bob.brown@example.com' }
    ];

    try {
        const connection = await createConnection(config);
        console.log('Connected to MySQL database successfully!');

        await connection.execute('DELETE FROM students');
        console.log('Cleared existing students table.');

        for (const student of sampleStudents) {
            await connection.execute(
                'INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)',
                [student.first_name, student.last_name, student.email]
            );
        }

        console.log('Sample students inserted successfully!');
        await connection.end();
    } catch (error) {
        console.error('Error seeding MySQL students:', error.message);
    }
}

seedMySQLStudents();
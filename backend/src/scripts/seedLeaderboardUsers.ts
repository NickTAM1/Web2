import mongoose from 'mongoose';
import { Student } from '../models/Student';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

async function seedLeaderboardUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to MongoDB successfully!');

        const dbName = mongoose.connection.name;
        console.log(`Connected to database: ${dbName}`);

        await Student.deleteMany({});
        console.log('Cleared existing students collection.');

        const sampleUsers = [
            {
                studentId: 'STU001',
                name: { first: 'John', last: 'Doe' },
                grade: 10,
                email: 'john.doe@example.com',
                absences: 0,
            },
            {
                studentId: 'STU002',
                name: { first: 'Jane', last: 'Smith' },
                grade: 9,
                email: 'jane.smith@example.com',
                absences: 1,
            },
        ];

        const result = await Student.insertMany(sampleUsers);
        console.log('Insert result:', result);

        console.log('Sample leaderboard users seeded successfully!');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding leaderboard users:', error);
        mongoose.connection.close();
    }
}

seedLeaderboardUsers();
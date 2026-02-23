import mongoose from 'mongoose';
import { Student } from '../models/Student';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

async function seedMongoDBUser() {
    try {
        const uri = process.env.MONGODB_URI?.replace(/\/\?appName=.*/, '/leaderboardUsers?appName=Spencer');
        await mongoose.connect(uri!);
        console.log('Connected to MongoDB successfully!');

        const user = {
            studentId: 'STU001',
            name: { first: 'Nick', last: 'Tam' },
            email: 'nick@gmail.com',
            grade: 10,
            absences: 0,
        };

        // Remove existing user with the same studentId
        await Student.deleteOne({ studentId: user.studentId });
        console.log('Removed existing user with the same studentId.');

        await Student.create(user);
        console.log('Sample MongoDB user created successfully!');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding MongoDB user:', error.message);
        mongoose.connection.close();
    }
}

seedMongoDBUser();
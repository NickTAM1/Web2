import mongoose from 'mongoose';
import { User } from '../models/Contact';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seedTestUser() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI not set');

        await mongoose.connect(uri);
        console.log('Connected to MongoDB:', mongoose.connection.name);

        // Remove any existing test user so we can re-run safely
        await User.deleteOne({ email: 'nick@gmail.com' });

        const user = await User.create({
            name: { first: 'Nick', last: 'Tam' },
            email: 'nick@gmail.com',
            grade: 10,
            absences: 0,
        });

        console.log('Test user created:', JSON.stringify(user.toObject(), null, 2));
        console.log('\n--- Login credentials ---');
        console.log('  Email    : nick@gmail.com');
        console.log('  Last Name: Tam');
        console.log('-------------------------\n');
    } catch (err: any) {
        console.error('Error seeding user:', err.message);
    } finally {
        await mongoose.connection.close();
    }
}

seedTestUser();

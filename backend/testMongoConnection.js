const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

console.log('MONGODB_URI:', process.env.MONGODB_URI);

async function testMongoConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

testMongoConnection();
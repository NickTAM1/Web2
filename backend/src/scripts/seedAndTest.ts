import dotenv from "dotenv";
dotenv.config();

import { connectDb, connectMySQLDb } from "../db";
import { Student } from "../models/Student";

async function main() {
    // Connect directly to MongoDB (no server needed)
    await connectDb(process.env.MONGODB_URI);
    console.log("Connected to MongoDB\n");

    // Clear existing students
    const deleted = await Student.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} existing student(s)`);

    // Seed students directly into MongoDB
    const studentsToAdd = [
        { studentId: "VINI3", name: { first: "Vini",  last: "Cius"  }, grade: 10, email: "vini@cius.br"          },
        { studentId: "JOHN1", name: { first: "John",  last: "Doe"   }, grade: 9,  email: "john.doe@example.com"  },
        { studentId: "JANE2", name: { first: "Jane",  last: "Smith" }, grade: 8,  email: "jane.smith@example.com"},
        { studentId: "STU001", name: { first: "Nick",  last: "Test"  }, grade: 10, email: "nick@gmail.com"        }
    ];

    for (const data of studentsToAdd) {
        const student = await Student.create(data);
        console.log(`Added: ${student.studentId} — ${student.name.first} ${student.name.last} (${student.email})`);
    }

    // Verify all students in MongoDB
    console.log("\nAll students in MongoDB:");
    const all = await Student.find().sort({ "name.last": 1 });
    for (const s of all) {
        console.log(` - [${s.studentId}] ${s.name.first} ${s.name.last} | ${s.email} | grade: ${s.grade}`);
    }

    // Check leaderboard from MySQL
    console.log("\nLeaderboard from MySQL:");
    const connection = await connectMySQLDb({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "leaderboard_db"
    });
    const [rows]: any = await connection.execute("SELECT name, score FROM leaderboard ORDER BY score DESC");
    await connection.end();
    for (const row of rows) {
        console.log(` - ${row.name}: ${row.score}`);
    }

    process.exit(0);
}

main().catch((e) => {
    console.error(e.message);
    process.exit(1);
});

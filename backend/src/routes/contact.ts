import { Router } from "express";
import { connectMySQLDb } from "../db";

const router = Router();

const dbConfig = () => ({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "leaderboard_db"
});

// POST /api/contact: Save contact form to MySQL
router.post("/", async (req, res) => {
    const { first_name, last_name, email, message } = req.body;

    if (!first_name || !last_name || !email || !message) {
        return res.status(400).json({ error: "First name, last name, email, and message are required." });
    }

    try {
        const connection = await connectMySQLDb(dbConfig());
        await connection.execute(
            "INSERT INTO contacts (first_name, last_name, email, message) VALUES (?, ?, ?, ?)",
            [first_name, last_name, email, message]
        );
        await connection.end();
        res.status(201).json({ message: "Contact inquiry saved successfully." });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

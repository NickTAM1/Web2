import { Router } from "express";
import { connectMySQLDb } from "../db";

const router = Router();

// GET /api/leaderboard: Retrieve leaderboard entries
router.get("/", async (req, res) => {
    try {
        const connection = await connectMySQLDb({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "",
            database: process.env.MYSQL_DATABASE || "leaderboard_db"
        });

        const [rows] = await connection.execute("SELECT * FROM leaderboard ORDER BY score DESC");
        await connection.end();

        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/leaderboard: Add a new leaderboard entry
router.post("/", async (req, res) => {
    const { name, score } = req.body;
    if (!name || !score) {
        return res.status(400).json({ error: "Name and score are required." });
    }

    try {
        const connection = await connectMySQLDb({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "",
            database: process.env.MYSQL_DATABASE || "leaderboard_db"
        });
        const [result]: any = await connection.execute(
            "INSERT INTO leaderboard (name, score) VALUES (?, ?)",
            [name, score]
        );
        await connection.end();
        res.status(201).json({ id: result.insertId, name, score });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
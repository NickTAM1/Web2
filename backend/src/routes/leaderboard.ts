import { Router } from "express";
import { connectMySQLDb } from "../db";
import type { ILeaderboard } from "../models/Leaderboard";

const router = Router();

const dbConfig = () => ({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "leaderboard_db"
});

// GET /api/leaderboard: Retrieve all leaderboard entries
router.get("/", async (_req, res) => {
    try {
        const connection = await connectMySQLDb(dbConfig());
        const [rows] = await connection.execute("SELECT * FROM leaderboard ORDER BY score DESC");
        await connection.end();
        res.json(rows as ILeaderboard[]);
    } catch (e: any) {
        console.error("Error fetching leaderboard:", e);
        res.status(500).json({ error: e.message });
    }
});

// POST /api/leaderboard: Add a new leaderboard entry
router.post("/", async (req, res) => {
    try {
        const { name, score } = req.body;
        const connection = await connectMySQLDb(dbConfig());
        const [result]: any = await connection.execute(
            "INSERT INTO leaderboard (name, score) VALUES (?, ?)",
            [name, score]
        );
        await connection.end();
        res.status(201).json({ id: result.insertId, name, score });
    } catch (e: any) {
        console.error("Error adding leaderboard entry:", e);
        res.status(400).json({ error: e.message });
    }
});

export default router;

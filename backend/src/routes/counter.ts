import { Router } from "express";
import { connectMySQLDb } from "../db";

const router = Router();

const dbConfig = () => ({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "leaderboard_db"
});

// GET /api/counter: Get current count
router.get("/", async (_req, res) => {
    try {
        const connection = await connectMySQLDb(dbConfig());
        const [rows]: any = await connection.execute(
            "SELECT count FROM counter WHERE id = 1"
        );
        await connection.end();
        res.json({ count: rows[0]?.count ?? 0 });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/counter/increment: Increment count by 1
router.post("/increment", async (_req, res) => {
    try {
        const connection = await connectMySQLDb(dbConfig());
        await connection.execute(
            "UPDATE counter SET count = count + 1 WHERE id = 1"
        );
        const [rows]: any = await connection.execute(
            "SELECT count FROM counter WHERE id = 1"
        );
        await connection.end();
        res.json({ count: rows[0].count });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

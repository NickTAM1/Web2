import express from "express";
import dotenv from "dotenv";
import { connectDb, connectMySQLDb } from "./db";

import leaderboardRoutes from "./routes/leaderboard";
import contactRoutes from "./routes/contact";
import counterRoutes from "./routes/counter";
import loginRoutes from "./routes/login";
import studentsRoutes from "./routes/students";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true, service: "leaderboard-api" }));

app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/counter", counterRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/students", studentsRoutes);

// GET /api/leaderboard-summary: top 3 players for landing page widget
app.get("/api/leaderboard-summary", async (_req, res) => {
    try {
        const connection = await connectMySQLDb({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_DATABASE || "leaderboard_db"
        });
        const [rows] = await connection.execute(
            "SELECT name AS player, score FROM leaderboard ORDER BY score DESC LIMIT 3"
        );
        await connection.end();
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

async function start() {
    try {
        await connectDb(process.env.MONGODB_URI);
        const port = Number(process.env.PORT) || 3000;
        app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
    } catch (err: any) {
        console.error("Startup error", err?.message);
        process.exit(1);
    }
}

start();

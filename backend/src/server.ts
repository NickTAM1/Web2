import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db";

import studentRoutes from "./routes/students";
import courseRoutes from "./routes/courses";
import enrollmentRoutes from "./routes/enrollments";
import leaderboardRoutes from "./routes/leaderboard";
import contactRoutes from "./routes/contact";
import loginRoutes from "./routes/login";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, service: "school-and-leaderboard-api" }));

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/login", loginRoutes);

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
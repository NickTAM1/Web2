import { Router } from "express";
import { pool } from "../db";

const router = Router();

// GET all courses
router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM courses ORDER BY unique_code"
        );
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// GET course by course_id
router.get("/:id", async (req, res) => {
    try {
        const [rows]: any = await pool.execute(
            "SELECT * FROM courses WHERE course_id = ?",
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: "Course not found" });
        res.json(rows[0]);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// POST create course
router.post("/", async (req, res) => {
    try {
        const { unique_code, title, credits } = req.body;
        const [result]: any = await pool.execute(
            "INSERT INTO courses (unique_code, title, credits) VALUES (?, ?, ?)",
            [unique_code, title, credits]
        );
        const [rows]: any = await pool.execute(
            "SELECT * FROM courses WHERE course_id = ?",
            [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update course
router.put("/:id", async (req, res) => {
    try {
        const { unique_code, title, credits } = req.body;
        const [result]: any = await pool.execute(
            "UPDATE courses SET unique_code = ?, title = ?, credits = ? WHERE course_id = ?",
            [unique_code, title, credits, req.params.id]
        );
        if (!result.affectedRows) return res.status(404).json({ error: "Course not found" });
        const [rows]: any = await pool.execute(
            "SELECT * FROM courses WHERE course_id = ?",
            [req.params.id]
        );
        res.json(rows[0]);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE course
router.delete("/:id", async (req, res) => {
    try {
        const [rows]: any = await pool.execute(
            "SELECT * FROM courses WHERE course_id = ?",
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: "Course not found" });
        await pool.execute("DELETE FROM courses WHERE course_id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;

import { Router } from "express";
import { pool } from "../db";

const router = Router();

// GET all students
router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM students ORDER BY last_name, first_name"
        );
        res.json(rows);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// GET student by student_id
router.get("/:id", async (req, res) => {
    try {
        const [rows]: any = await pool.execute(
            "SELECT * FROM students WHERE student_id = ?",
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: "Student not found" });
        res.json(rows[0]);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

// POST create student
router.post("/", async (req, res) => {
    try {
        const { student_id, first_name, last_name, email } = req.body;
        await pool.execute(
            "INSERT INTO students (student_id, first_name, last_name, email) VALUES (?, ?, ?, ?)",
            [student_id, first_name, last_name, email]
        );
        const [rows]: any = await pool.execute(
            "SELECT * FROM students WHERE student_id = ?",
            [student_id]
        );
        res.status(201).json(rows[0]);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

// PUT update student
router.put("/:id", async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const [result]: any = await pool.execute(
            "UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE student_id = ?",
            [first_name, last_name, email, req.params.id]
        );
        if (!result.affectedRows) return res.status(404).json({ error: "Student not found" });
        const [rows]: any = await pool.execute(
            "SELECT * FROM students WHERE student_id = ?",
            [req.params.id]
        );
        res.json(rows[0]);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE student
router.delete("/:id", async (req, res) => {
    try {
        const [rows]: any = await pool.execute(
            "SELECT * FROM students WHERE student_id = ?",
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: "Student not found" });
        await pool.execute("DELETE FROM students WHERE student_id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

export default router;

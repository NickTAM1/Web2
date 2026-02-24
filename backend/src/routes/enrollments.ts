import { Router } from "express";
import { pool } from "../db";

const router = Router();

// GET all enrollments (with student and course details)
router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT e.student_id, e.course_id, e.enrolled_on,
                   s.first_name, s.last_name,
                   c.unique_code, c.title, c.credits
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            JOIN courses  c ON e.course_id  = c.course_id
            ORDER BY e.enrolled_on DESC
        `);
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// GET all enrollments for a specific student
router.get("/student/:student_id", async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT e.student_id, e.course_id, e.enrolled_on,
                   c.unique_code, c.title, c.credits
            FROM enrollments e
            JOIN courses c ON e.course_id = c.course_id
            WHERE e.student_id = ?
            ORDER BY e.enrolled_on DESC
        `, [req.params.student_id]);
        res.json(rows);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// GET all enrollments for a specific course
router.get("/course/:course_id", async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT e.student_id, e.course_id, e.enrolled_on,
                   s.first_name, s.last_name, s.email
            FROM enrollments e
            JOIN students s ON e.student_id = s.student_id
            WHERE e.course_id = ?
            ORDER BY s.last_name, s.first_name
        `, [req.params.course_id]);
        res.json(rows);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// POST enroll a student in a course
router.post("/", async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        await pool.execute(
            "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)",
            [student_id, course_id]
        );
        const [rows]: any = await pool.execute(
            "SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?",
            [student_id, course_id]
        );
        res.status(201).json(rows[0]);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE an enrollment
router.delete("/", async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        const [result]: any = await pool.execute(
            "DELETE FROM enrollments WHERE student_id = ? AND course_id = ?",
            [student_id, course_id]
        );
        if (!result.affectedRows) return res.status(404).json({ error: "Enrollment not found" });
        res.json({ message: "Enrollment removed" });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;

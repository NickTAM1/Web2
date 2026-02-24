import { Router } from "express";
import { Student } from "../models/Student";

const router = Router();

// POST /api/students: Create a new student in MongoDB
router.post("/", async (req, res) => {
    try {
        const created = await Student.create(req.body);
        res.status(201).json(created);
    } catch (e: any) {
        console.error("Error creating student:", e);
        res.status(400).json({ error: e.message });
    }
});

// GET /api/students?grade=N: Retrieve all students (optionally filtered by grade)
router.get("/", async (req, res) => {
    const filter: any = {};
    if (req.query.grade) filter.grade = Number(req.query.grade);
    const students = await Student.find(filter).sort({ "name.last": 1, "name.first": 1 });
    res.json(students);
});

// GET /api/students/:id: Retrieve a single student by MongoDB _id
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

// PATCH /api/students/:id/absence: Increment absences by 1
router.patch("/:id/absence", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(
        req.params.id,
        { $inc: { absences: 1 } },
        { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
});

// PUT /api/students/:id: Update a student by MongoDB _id
router.put("/:id", async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ error: "Student not found" });
        res.json(updated);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE /api/students/:id: Delete a student by MongoDB _id
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Student not found" });
        res.json(deleted);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

export default router;

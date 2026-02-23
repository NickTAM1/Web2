import { Router } from "express";
import { Student } from "../models/Student";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const created = await Student.create(req.body);
        res.status(201).json(created);
    } catch (e: any) {
        console.error("Error creating student:", e); // Log the error
        res.status(400).json({ error: e.message });
    }
});

router.get("/", async (req, res) => { 
    const filter: any = {};
    if (req.query.grade) filter.grade = Number(req.query.grade);
    const students = await Student.find(filter).sort({ "name.last": 1, "name.first": 1 });
    res.json(students);
});

router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

router.patch("/:id/absence", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(
        req.params.id,
        { $inc: { absences: 1 } },
        { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
});

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

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Student not found" });
        res.json(deleted);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

router.post("/login", async (req, res) => {
    const { name, email } = req.body;

    try {
        // Find user by name and email
        const user = await Student.findOne({ "name.first": name.first, "name.last": name.last, email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return user data
        res.json(user);
    } catch (e: any) {
        console.error("Error during login:", e);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
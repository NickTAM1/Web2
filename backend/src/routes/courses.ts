import { Router } from "express";
import { Course } from "../models/Course";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const created = await Course.create(req.body);
        res.status(201).json(created);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const courses = await Course.find({}).sort({ courseCode: 1 });
    res.json(courses);
});

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.json(course);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        });
        if (!updated) return res.status(404).json({ error: "Course not found or not updated" });
        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Course not found or not deleted" });
        res.json(deleted);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
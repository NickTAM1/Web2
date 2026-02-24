import { Router } from "express";
import { Student } from "../models/Student";

const router = Router();

// GET /api/login?email=...&lastName=...
// Retrieve student information by email and/or last name passed as query params
router.get("/", async (req, res) => {
    try {
        const { email, lastName } = req.query as { email?: string; lastName?: string };

        const filter: any = {};
        if (email) filter.email = email;
        if (lastName) filter["name.last"] = lastName;

        if (Object.keys(filter).length === 0) {
            return res.status(400).json({ error: "Email or last name is required." });
        }

        const student = await Student.findOne(filter);
        if (!student) return res.status(404).json({ error: "Student not found." });

        res.json(student);
    } catch (e: any) {
        console.error("Error during login:", e);
        res.status(400).json({ error: e.message });
    }
});

export default router;

import { Router } from "express";
import { Student } from "../models/Contact";

const router = Router();

// GET /api/login?email=...&lastName=...
// Retrieve student information by email and/or last name passed as query params
router.get("/", async (req, res) => {
    const { email, lastName } = req.query as { email?: string; lastName?: string };

    if (!email && !lastName) {
        return res.status(400).json({ error: "Email or last name is required." });
    }

    try {
        const query: any = {};
        if (email) query.email = email;
        if (lastName) query["name.last"] = lastName;

        const student = await Student.findOne(query);
        if (!student) {
            return res.status(404).json({ error: "Student not found." });
        }

        res.json(student);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

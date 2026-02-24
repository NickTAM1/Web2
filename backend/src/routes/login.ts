import { Router } from "express";
import { Student } from "../models/Contact";

const router = Router();

// POST /api/login: Retrieve student information by email and/or name
router.post("/", async (req, res) => {
    const { email, firstName, lastName, name } = req.body;
    // support both { email, firstName, lastName } and { name: { last }, email }
    const resolvedLastName = lastName || name?.last;
    const resolvedFirstName = firstName || name?.first;

    if (!email && !resolvedFirstName && !resolvedLastName) {
        return res.status(400).json({ error: "Email, first name, or last name is required." });
    }

    try {
        const query: any = {};
        if (email) query.email = email;
        if (resolvedFirstName) query["name.first"] = resolvedFirstName;
        if (resolvedLastName) query["name.last"] = resolvedLastName;

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

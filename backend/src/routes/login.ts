import { Router } from "express";
import { Student } from "../models/Student";

const router = Router();

// GET /api/login: Retrieve user information by email or name
router.get("/", async (req, res) => {
    const { email, name } = req.query;

    if (!email && !name) {
        return res.status(400).json({ error: "Email or name is required." });
    }

    try {
        const query: any = {};
        if (email) query.email = email;
        if (name) query["name.first"] = name;

        const user = await Student.findOne(query);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
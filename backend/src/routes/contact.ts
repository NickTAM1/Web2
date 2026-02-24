import { Router } from "express";
import { Contact } from "../models/Contact";

const router = Router();

// POST /api/contact: Save contact form to MongoDB
router.post("/", async (req, res) => {
    const { student_id, first_name, last_name, email, message } = req.body;

    if (!first_name || !last_name || !email || !message) {
        return res.status(400).json({ error: "First name, last name, email, and message are required." });
    }

    try {
        await Contact.create({ student_id: student_id || undefined, first_name, last_name, email, message });
        res.status(201).json({ message: "Contact inquiry saved successfully." });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

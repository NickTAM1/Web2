import { Router } from "express";
import { Contact } from "../models/Contact";

const router = Router();

// POST /api/contact: Store contact inquiries in MongoDB
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
    }

    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(201).json({ message: "Contact inquiry saved successfully." });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
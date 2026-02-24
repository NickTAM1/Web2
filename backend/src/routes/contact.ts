import { Router } from "express";
import { Contact } from "../models/Contact";

const router = Router();

// POST /api/contact: Save contact form to MongoDB
router.post("/", async (req, res) => {
    try {
        const created = await Contact.create(req.body);
        res.status(201).json(created);
    } catch (e: any) {
        console.error("Error creating contact:", e);
        res.status(400).json({ error: e.message });
    }
});

export default router;

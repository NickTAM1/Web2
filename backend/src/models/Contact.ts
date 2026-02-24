import mongoose from "mongoose";

// Mongoose schema and model for the `contacts` collection in MongoDB
const contactSchema = new mongoose.Schema(
    {
        student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true }
    },
    { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);

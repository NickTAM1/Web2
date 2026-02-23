import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        courseCode: { type: String, required: true, unique: true, trim: true },
        title: { type: String, required: true, trim: true },
        room: { type: String, trim: true },
        teacher: { type: String, trim: true }
    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
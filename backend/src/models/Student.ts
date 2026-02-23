import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentId: { type: String, required: true, unique: true, trim: true },
        name: {
            first: { type: String, required: true, trim: true },
            last: { type: String, required: true, trim: true }
        },
        grade: { type: Number, required: true, min: 1, max: 10},
        email: { type: String, required: true, trim: true, unique: true },
        absences: {type: Number, default: 0}
    },
    { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
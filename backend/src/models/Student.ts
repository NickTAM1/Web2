import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
    studentId: string;
    name: {
        first: string;
        last: string;
    };
    email: string;
    grade: number;
    absences: number;
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
    studentId: { type: String, required: true, unique: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true },
    grade: { type: Number, required: true },
    absences: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Student = mongoose.model<IStudent>("Student", StudentSchema);

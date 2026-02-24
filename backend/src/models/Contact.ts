import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
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

export interface IContact extends Document {
    student_id: mongoose.Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    createdAt: Date;
}

const ContactSchema: Schema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);

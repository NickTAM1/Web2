import mongoose, { Schema, Document } from "mongoose";

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

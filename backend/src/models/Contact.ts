import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export interface IUser extends Document {
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

const UserSchema: Schema = new Schema({
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

export const User = mongoose.model<IUser>("User", UserSchema);
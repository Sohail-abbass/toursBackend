import mongoose, { Document, Schema } from "mongoose";

/**
 * Contact Interface
 */
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Contact Schema
 */
 export const ContactSchema: Schema<IContact> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
export default Contact;  ✅ THIS is the key
 */
export const Contact=  mongoose.model<IContact>("Contact", ContactSchema);

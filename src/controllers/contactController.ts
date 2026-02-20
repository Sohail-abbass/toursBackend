import { Request, Response } from "express";
import {Contact} from '../models/Contact';

import { sendContactEmail } from "../utils/sendMail";


export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("📥 Contact request received");

    const { name, email, phone, subject, message } = req.body;

    await Contact.create({ name, email, phone, subject, message });
    console.log("✅ Saved to DB");

    await sendContactEmail({ name, email, phone, subject, message });
    console.log("📧 Email sent successfully");

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("❌ ERROR occurred:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit contact",
      error: (error as Error).message,
    });
  }
};

// src/config/env.ts

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

if (!process.env.GMAIL_REFRESH_TOKEN) {
  console.warn("⚠️ GMAIL_REFRESH_TOKEN not loaded");
}
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "30d";
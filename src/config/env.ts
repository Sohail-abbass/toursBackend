// src/config/env.ts
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "30d";

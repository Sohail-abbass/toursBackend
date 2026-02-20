import { Router } from "express";
import { submitContact } from "../controllers/contactController";

const router = Router();

/**
 * POST /api/contact
 * Public route – Contact Form
 */
router.post("/contact", submitContact);

export default router;

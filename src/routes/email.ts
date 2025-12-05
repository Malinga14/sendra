import { Router, Request, Response } from "express";
import { sendContactEmail } from "../services/resendService";
import { verifyApiKey } from "../middleware/apiAuth";

const router = Router();

router.post("/", verifyApiKey, async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Normalize header and mask for logging so the full API key isn't printed.
  const headerValue = req.headers["x-api-key"];
  const rawKey = typeof headerValue === "string" ? headerValue : Array.isArray(headerValue) ? headerValue[0] : undefined;
  const maskedKey = rawKey ? (rawKey.length > 6 ? `${rawKey.slice(0, 4)}...${rawKey.slice(-2)}` : rawKey) : 'none';
 
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await sendContactEmail({ name, email, message });
    res.json({ success: true, result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
});

export default router;

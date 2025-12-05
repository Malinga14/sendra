import { Request, Response, NextFunction } from "express";

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  // `req.headers['x-api-key']` can be string | string[] | undefined.
  // Normalize to a single string so comparisons work reliably.
  const headerValue = req.headers["x-api-key"];
  const apiKey = typeof headerValue === "string"
    ? headerValue
    : Array.isArray(headerValue)
      ? headerValue[0]
      : undefined;

  if (!process.env.API_KEY) {
    console.warn("Environment variable API_KEY is not set");
  }

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }

  // API key matched — continue to next middleware/route handler.
  return next();
};

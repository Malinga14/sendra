import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import emailRouter from "./routes/email";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/email", emailRouter);

const PORT = process.env.PORT || 5000;
// Only start the server when not running tests so test runner can import `app`
if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

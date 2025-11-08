import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import envConfig from "./config/envConfig.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { connectDB } from "./lib/connectDB.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "../backend/routes/chatRoutes.js";
import sessionRoutes from "../backend/routes/sessionRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: envConfig.general.CLIENT_BASE_URL, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());

connectDB();

const PORT = envConfig.general.PORT || 8080;

app.get("/health", (req, res) => {
  res.status(200).json({ mes: "api is up and running" });
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

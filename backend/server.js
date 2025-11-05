import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import envConfig from "./config/envConfig.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { connectDB } from "./lib/connectDb.js";

dotenv.config();

const app = express();
app.use(cors({ origin: envConfig.db.CLIENT_BASE_URL, credentials: true }));
app.use(express.json());

connectDB();

const PORT = envConfig.general.PORT || 8080;

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

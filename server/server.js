import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import enquiryRoute from "./routes/enquiry.js";
import adminRoute from "./routes/admin.js";
import contentRoute from "./routes/content.js";
import { seedContent } from "./seedContent.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

const clientOrigins = [
  "http://localhost:5173",
  "https://interior-studio-liart.vercel.app",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((value) => value.trim().replace(/\/+$/, "")),
].filter(Boolean);

app.disable("x-powered-by");

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin?.replace(/\/+$/, "");

      if (!origin || clientOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error("Origin not allowed by CORS:", origin);
      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Ivy Interio API",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/enquiry", enquiryRoute);
app.use("/api/admin", adminRoute);
app.use("/api/content", contentRoute);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error." });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error(
      "MONGO_URI is missing. Create server/.env before starting the API.",
    );
    process.exit(1);
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error("JWT_SECRET must be at least 32 characters long.");
    process.exit(1);
  }

  if (
    !process.env.ADMIN_EMAIL ||
    (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH)
  ) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await seedContent();
    app.listen(port, () =>
      console.log(`Ivy Interio API running on http://localhost:${port}`),
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();

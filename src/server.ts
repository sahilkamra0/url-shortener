
import express from "express";
import "dotenv/config";
import { prisma } from "./prisma";
import urlRoutes from "./routes/url.routes";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("URL Shortener API is running!");
});

// Register all URL Shortener routes
app.use(urlRoutes);

// Start server after connecting to Neon
async function startServer() {
  try {
    await prisma.$connect();
    console.log("Neon database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

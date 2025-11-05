// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Key to access the secret from .env file
import cors from "cors"; // Acts as a security guard that allows frontend to talk to backend
import path from "path"; // Acts as a GPS for files and folders
import { fileURLToPath } from "url"; // Helper tool for path folder

// Load environment variables
dotenv.config(); // Finds all secrets from the .env file and loads then into your application 

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// This block figures out the exact, absolute path to your project folder on your computer. __dirname becomes a variable that holds this path (e.g., C:\Users\YourName\Desktop\SyncSpace).

// Import routes
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- SERVE STATIC FILES (FRONTEND) ---
app.use(express.static(path.join(__dirname, "public"))); // Allows every file in the public folder to get accessed into the browser so that anyone and see it 

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "RoomBookingDB" })
  .then(() => console.log("MongoDB Connected Successfully..!"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// --- CATCH-ALL ROUTE FOR FRONTEND ---
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // If a request comes that doesn't match any of the routes than don't throw an error instead redirect user to the main page index.html
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

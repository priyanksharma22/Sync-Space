// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Key to access the secret from .env file
import cors from "cors"; // Acts as a security guard that allows frontend to talk to backend

// Load environment variables
dotenv.config(); // Finds all secrets from the .env file and loads then into your application 

// Import routes
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON bodyparser middleware

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "RoomBookingDB" })
  .then(() => console.log("MongoDB Connected Successfully..!"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the SyncSpace API. The server is running!" });
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

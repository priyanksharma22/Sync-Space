import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import cors from "cors"; 

dotenv.config(); 

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json()); // JSON bodyparser middleware

mongoose
  .connect(process.env.MONGO_URI, { dbName: "RoomBookingDB" })
  .then(() => console.log("MongoDB Connected Successfully..!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the SyncSpace API. The server is running!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

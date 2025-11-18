import express from "express";
import {
  createBooking,
  getUserBookings,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST api/bookings
router.post("/", authMiddleware, createBooking);

// @route   GET api/bookings/my-bookings
router.get("/my-bookings", authMiddleware, getUserBookings);

export default router;

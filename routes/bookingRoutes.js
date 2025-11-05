import express from "express";
import { 
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getUserBookings);
router.get("/", authMiddleware, adminMiddleware, getAllBookings);
router.put("/:bookingId/status", authMiddleware, adminMiddleware, updateBookingStatus);

export default router;

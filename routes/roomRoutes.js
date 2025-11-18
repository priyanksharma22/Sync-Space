import express from "express";
import { getAllRooms } from "../controllers/roomController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET api/rooms
router.get("/", authMiddleware, getAllRooms);

export default router;

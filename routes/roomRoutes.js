import express from "express";
import { getAllRooms, createRoom } from "../controllers/roomController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllRooms);
router.post("/", authMiddleware, adminMiddleware, createRoom);

export default router;

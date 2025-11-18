import Room from "../models/Room.js";

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error("Error in getAllRooms:", err);
    res.status(500).json({ message: "Server error." });
  }
};

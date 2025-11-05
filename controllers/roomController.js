import Room from "../models/Room.js";

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Create a new room
export const createRoom = async (req, res) => {
  const { name, capacity, description } = req.body;
  try {
    const newRoom = new Room({ name, capacity, description });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

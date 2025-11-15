import Booking from "../models/Booking.js";

// Create a booking
export const createBooking = async (req, res) => {
  const { roomId, date, startTime, endTime } = req.body;
  const userId = req.user.id;
  const bookingDate = new Date(date);
  try {
    const overlappingBooking = await Booking.findOne({
      roomId,
      date: bookingDate,
      status: "approved",
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .json({ message: "Room is already booked for this time slot." });
    }

    const newBooking = new Booking({ userId, roomId, date: bookingDate, startTime, endTime }); // No status set as the schema has default pending
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Get bookings of logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("roomId", "name"); // Give not only the roomId but also the name of the rooms
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name")
      .populate("roomId", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Update booking status (admin)
export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    // 1. Find the booking by its ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // 2. We removed the complex overlap check.
    // We trust the admin and just update the status.
    booking.status = status;
    await booking.save();

    // 3. Send the updated booking back.
    res.json(booking);
    
  } catch (err) {
    console.error("Error in updateBookingStatus:", err);
    res.status(500).json({ message: "Server error." });
  }
};

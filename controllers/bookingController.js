import Booking from "../models/Booking.js";

// Create a booking
export const createBooking = async (req, res) => {
  const { roomId, date, startTime, endTime } = req.body;
  const userId = req.user.id;

  try {
    const overlappingBooking = await Booking.findOne({
      roomId,
      date,
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

    const newBooking = new Booking({ userId, roomId, date, startTime, endTime });
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
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (status === "approved") {
      const overlappingBooking = await Booking.findOne({
        roomId: booking.roomId,
        date: booking.date,
        status: "approved",
        _id: { $ne: bookingId },
        $or: [
          { startTime: { $lt: booking.endTime }, endTime: { $gt: booking.startTime } }
        ]
      });

      if (overlappingBooking) {
        return res.status(400).json({
          message:
            "Cannot approve, this booking overlaps with another approved booking.",
        });
      }
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

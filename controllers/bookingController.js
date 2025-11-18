import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const { roomId, date, startTime, endTime } = req.body;
  const userId = req.user.id; 

  // Convert date string → Date object (This is correct)
  const bookingDate = new Date(date);

  try {
    const overlappingBooking = await Booking.findOne({
      roomId,
      date: bookingDate,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .json({ message: "Room is already booked for this time slot." });
    }

    const newBooking = new Booking({
      userId,
      roomId,
      date: bookingDate,
      startTime,
      endTime,
    });

    await newBooking.save();
    res.status(201).json(newBooking);

  } catch (err) {
    console.error("Error in createBooking:", err);
    res.status(500).json({ message: "Server error." });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookings = await Booking.find({ 
      userId: req.user.id, 
      date: { $gte: today } 
    })
      .populate("roomId") 
      .sort({ date: 1, startTime: 1 });

    res.json(bookings);

  } catch (err) {
    console.error("Error in getUserBookings:", err);
    res.status(500).json({ message: "Server error." });
  }
};

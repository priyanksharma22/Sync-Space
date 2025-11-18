import Booking from "../models/Booking.js";

function normalizeTime(timeStr) {
  if (!timeStr) return "00:00"; 
  const parts = timeStr.split(":");
  if (parts.length !== 2) return "00:00";

  let [hours, minutes] = parts;
  if (hours.length === 1) hours = "0" + hours;
  if (minutes.length === 1) minutes = "0" + minutes;

  return `${hours}:${minutes}`;
}

function normalizeDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;

  let [year, month, day] = parts;
  if (month.length === 1) month = "0" + month;
  if (day.length === 1) day = "0" + day;

  return `${year}-${month}-${day}`;
}

export const createBooking = async (req, res) => {
  const { roomId, date, startTime, endTime } = req.body;
  const userId = req.user.id;

  // Normalize time and date
  const normalizedDate = normalizeDate(date);
  const normalizedStartTime = normalizeTime(startTime);
  const normalizedEndTime = normalizeTime(endTime);

  if (!normalizedDate || !normalizedStartTime || !normalizedEndTime) {
    return res.status(400).json({ message: "Invalid date or time format." });
  }

  const startDateTime = new Date(`${normalizedDate}T${normalizedStartTime}`);
  const endDateTime = new Date(`${normalizedDate}T${normalizedEndTime}`);
  const now = new Date();

  // Logical checks
  if (startDateTime >= endDateTime) {
    return res.status(400).json({ message: "End time must be after start time." });
  }
  if (startDateTime < now) {
    return res.status(400).json({ message: "Cannot book a time in the past." });
  }

  const bookingDate = new Date(normalizedDate);

  try {
    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      roomId,
      date: bookingDate,
      $or: [
        { startTime: { $lt: normalizedEndTime }, endTime: { $gt: normalizedStartTime } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: "Room is already booked for this time slot." });
    }

    // Save the booking
    const newBooking = new Booking({
      userId,
      roomId,
      date: bookingDate,
      startTime: normalizedStartTime,
      endTime: normalizedEndTime
    });

    await newBooking.save();
    res.status(201).json(newBooking);

  } catch (err) {
    console.error("Error creating booking:", err);
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
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error." });
  }
};

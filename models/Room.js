import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    description: { type: String, default: "" },
  },
);

export default mongoose.model("Room", roomSchema);

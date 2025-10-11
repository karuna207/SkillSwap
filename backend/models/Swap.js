import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User A
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User B
  requestedCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // B's course (A wants)
  offeredCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // optional, set later by B if interested
  status: {
    type: String,
    enum: ["Pending", "Countered", "Accepted", "Rejected"],
    default: "Pending"
  },
  message: String // optional message for negotiation
}, { timestamps: true });

export default mongoose.model("Swap", swapSchema);

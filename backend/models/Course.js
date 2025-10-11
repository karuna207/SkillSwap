import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },
  duration: Number // optional, if you plan to store video length
}); 



const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  videos: [videoSchema], // <-- array of embedded video documents
  imageUrl: String,
  skillLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);

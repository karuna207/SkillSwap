import Review from "../models/Review.js";
import Course from "../models/Course.js";

// Add review
export const addReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const review = await Review.create({
      reviewer: req.user._id,
      course: courseId,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a course
export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId }).populate("reviewer", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

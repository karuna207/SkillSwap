import axios from "axios";

export const fetchCourses = async () => {
  const res = await axios.get("/api/courses");
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await axios.get(`/api/courses/${id}`);
  return res.data;
};

// createCourse, updateCourse, deleteCourse left for later (requires auth + form)

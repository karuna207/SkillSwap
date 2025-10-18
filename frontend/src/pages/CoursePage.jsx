import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading courses...</div>;
  if (!courses.length) return <div className="text-center mt-20">No courses yet.</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => <CourseCard course={c} key={c._id} />)}
      </div>
    </div>
  );
};

export default CoursesPage;

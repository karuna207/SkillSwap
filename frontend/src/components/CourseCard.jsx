import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const videoCount = Array.isArray(course.videos) ? course.videos.length : 0;
  return (
    <div className="border rounded shadow-sm overflow-hidden hover:shadow-lg transition">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} className="object-cover h-full w-full" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{course.title}</h3>
        <p className="text-sm text-gray-600">{course.category || "Uncategorized"}</p>
        <p className="mt-2 text-sm text-gray-700">Instructor: {course.instructor?.name || "Unknown"}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">{videoCount} videos</span>
          <Link to={`/courses/${course._id}`} className="text-blue-600 text-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

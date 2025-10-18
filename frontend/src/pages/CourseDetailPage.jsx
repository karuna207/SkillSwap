import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseById } from "../services/courseService";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!course) return <div className="text-center mt-20">Course not found</div>;

  const videoCount = Array.isArray(course.videos) ? course.videos.length : 0;

  const handleRequestAccess = async () => {
    if (!user) return navigate("/login");
    setRequesting(true);
    try {
      // create swap request: requester = current user, receiver = course.instructor._id
      await axios.post("/api/swaps", { requestedCourseId: course._id, receiverId: course.instructor._id });
      alert("Access request sent");
      // you may want to redirect to swap requests page
      navigate("/swap-requests");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send request");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>
      <p className="text-sm text-gray-600 mb-4">By {course.instructor?.name || "Unknown"}</p>
      <p className="text-gray-700 mb-4">{course.description}</p>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Videos</p>
            <p className="font-medium">{videoCount}</p>
          </div>
          <div>
            {/* videos are hidden until access is granted */}
            <span className="inline-block px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">Content locked</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleRequestAccess}
          disabled={requesting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {requesting ? "Sending..." : "Request Access"}
        </button>

        <button
          onClick={() => alert("Counter/Swap UI to be implemented on Swap Requests page")}
          className="px-4 py-2 border rounded"
        >
          Propose Swap Instead
        </button>
      </div>
    </div>
  );
};

export default CourseDetailPage;

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CreateCoursePage = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([{ title: "", url: "" }]);

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const handleVideoChange = (index, field, value) => {
    const updated = [...videos];
    updated[index][field] = value;
    setVideos(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = { title, description, videos, user: user._id };
    console.log("Creating course:", newCourse);
    // TODO: send to backend API
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Course title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Course description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div>
          <h3 className="font-semibold mb-2">Videos</h3>
          {videos.map((video, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Video title"
                className="flex-1 border p-2 rounded"
                value={video.title}
                onChange={(e) => handleVideoChange(index, "title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Video URL"
                className="flex-1 border p-2 rounded"
                value={video.url}
                onChange={(e) => handleVideoChange(index, "url", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVideo}
            className="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200"
          >
            + Add Video
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;

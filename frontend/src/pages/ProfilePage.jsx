import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>

      <h3 className="text-lg font-semibold mt-4 mb-2">My Courses</h3>
      <ul className="list-disc pl-5">
        {/* TODO: Fetch real data */}
        <li>React Basics</li>
        <li>Python for Beginners</li>
      </ul>
    </div>
  );
};

export default ProfilePage;

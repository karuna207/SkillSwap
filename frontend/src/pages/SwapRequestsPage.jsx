import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SwapRequestsPage = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // TODO: Fetch swap requests
    setRequests([
      {
        _id: 1,
        fromUser: { name: "Alice" },
        requestedCourse: "React Basics",
        offeredCourse: "Python 101",
        status: "pending",
      },
    ]);
  }, []);

  const handleAction = (id, action) => {
    console.log(`Request ${id} ${action}`);
    // TODO: Call backend API
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Swap Requests</h2>
      {requests.length === 0 ? (
        <p>No swap requests available.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="border p-4 rounded mb-3 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>{req.fromUser.name}</strong> wants your{" "}
                <strong>{req.requestedCourse}</strong> course in exchange for{" "}
                <strong>{req.offeredCourse}</strong>.
              </p>
              <p className="text-sm text-gray-500">Status: {req.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(req._id, "accept")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(req._id, "reject")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SwapRequestsPage;

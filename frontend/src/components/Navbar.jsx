import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">SkillSwap</Link>
      <div className="space-x-4">
        <Link to="/">Courses</Link>
        {user ? (
          <>
            <Link to="/create-course">Create</Link>
            <Link to="/swap-requests">Swaps</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="ml-2 bg-white text-blue-600 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursesPage from "./pages/CoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
// import CreateCoursePage from "./pages/CreateCoursePage";
// import SwapRequestsPage from "./pages/SwapRequestsPage";
// import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import './index.css'; // or the CSS file where Tailwind is included


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            {/* <Route path="/create-course" element={<ProtectedRoute><CreateCoursePage/></ProtectedRoute>} />
            <Route path="/swap-requests" element={<ProtectedRoute><SwapRequestsPage/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

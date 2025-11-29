import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Note: To make the login/signup buttons work, ensure you import { Link } 
// from 'react-router-dom' in LandingPage.jsx and wrap the buttons like this:
// <Link to="/login"><button>LOGIN</button></Link>

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CourseCatalog from "./pages/CourseCatalog.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import LessonPlayer from "./pages/LessonPlayer.jsx";
import CommunityForum from "./pages/CommunityForum.jsx";
import MediaLibrary from "./pages/MediaLibrary.jsx";
import ResourcesDirectory from "./pages/ResourcesDirectory.jsx";
import Statistics from "./pages/Statistics.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Correctly routes to Signup */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseCatalog />} />

        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/course/:courseId/details" element={<CourseDetails />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPlayer />} />

        <Route path="/forum" element={<CommunityForum />} />
        <Route path="/media" element={<MediaLibrary />} />
        <Route path="/resources" element={<ResourcesDirectory />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}
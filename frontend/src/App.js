import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopNavbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Dashboard/sidebar";

import AuthForm from "./Components/accountBox/Authform";
import ForgotPassword from "./Components/accountBox/Forgotpass";
import ResetPassword from "./Components/accountBox/Resetpass";

import UserForm from "./Components/Profile/profileform";
import ProfilePage from "./Components/Profile/profile";
import UpdateUser from "./Components/Profile/updateUser";
import SuccessPage from "./Components/Profile/successp";

import FirstLayout from "./Components/FirstSlide/First";
import DashboardMain from "./Components/Dashboard/dashboard-main";

import GradioButton from "./Components/chat_bot/GradioButton";
import "./Components/chat_bot/GradioButton.css";

import Anagram from "./Components/Game/Anagram";
import PuzzleApp from "./Components/PuzzleGame/components/PuzzleApp";
import Gamepage from "./Components/GamePages/Gamepage";
import EmotionGame from "./Components/emotions/Game";
import Wackapp from "./Components/wack/App";
import ColourGame from "./Components/Colorgame/Colourgame";

import Autisam from "./Components/ML_MODEL/Autisam/auti";
import DQuiz from "./Components/ML_MODEL/Dyslexia/templates/quiz";
import DSurvey from "./Components/ML_MODEL/Dyslexia/templates/survey";
import DResult from "./Components/ML_MODEL/Dyslexia/templates/result";

import Page from "./Components/diseases/page";

import "./Components/Css/loginform.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <TopNavbar />
        <GradioButton />
        <Routes>
          {/* Main Landing */}
          <Route path="/" element={<FirstLayout />} />

          {/* Dashboard */}
          <Route
            path="/Dashboard"
            element={
              <div className="m-3">
                <DashboardMain />
              </div>
            }
          />

          {/* Profile */}
          <Route
            path="/updateUser"
            element={
              <div className="d-flex flex-row m-3">
                <Sidebar />
                <UpdateUser />
              </div>
            }
          />
          <Route
            path="/ProfileForm"
            element={
              <div className="d-flex flex-row m-3">
                <UserForm />
              </div>
            }
          />
          <Route
            path="/Profile"
            element={
              <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-6 overflow-auto">
                <ProfilePage />
              </div>
            </div>

            }
          />
          <Route
            path="/Successpage"
            element={
              <div className="d-flex flex-row m-3">
                <Sidebar />
                <SuccessPage />
              </div>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<AuthForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset_password/:id/:token" element={<ResetPassword />} />

          {/* ML Models */}
          <Route path="/autism" element={<Autisam />} />
          <Route path="/DQuiz" element={<DQuiz />} />
          <Route path="/DSurvey" element={<DSurvey />} />
          <Route path="/DResult" element={<DResult />} />

          {/* Game Section */}
          <Route path="/selectionpage" element={<Page />} />
          <Route path="/AnagramGame" element={<Anagram />} />
          <Route path="/PuzzleGame" element={<PuzzleApp />} />
          <Route path="/gamepage" element={<Gamepage />} />
          <Route path="/EmotionGame" element={<EmotionGame />} />
          <Route path="/WackGame" element={<Wackapp />} />
          <Route path="/ColourGame" element={<ColourGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

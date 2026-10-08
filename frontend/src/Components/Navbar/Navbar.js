import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";
import logo2 from "../Navbar/logo.svg";
import user_icon from "../Navbar/user-circle.png";

function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  // const { isDark, setIsDark } = useTheme();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isHidden = location.pathname.toLowerCase() === "/login";

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-md ">
      <Link to="/" className="flex items-center text-xl font-bold text-gray-800 dark:text-white tracking-wide">
        <img src={logo2} className="h-12 mr-3 rounded-lg" alt="logo" />
        BRAINWAVE
      </Link>

      {!isHidden && (
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
            Home
          </Link>

          {currentUser ? (
            <>
              <Link to="/Dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Dashboard
              </Link>
              <Link to="/gamepage" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Activities
              </Link>

              <div className="relative">
                <img
                  src={user_icon}
                  alt="User"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                />

                {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-50">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Welcome back,</p>
                  <p className="text-md font-semibold text-gray-800 dark:text-white truncate">{currentUser.name}</p>
                  
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm transition"
                  >
                    Logout
                  </button>

              
                </div>
              )}  

              </div>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default TopNavbar;

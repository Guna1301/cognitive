import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo2 from "../Navbar/logo.svg";
import user_icon from "../Navbar/user-circle.png";

function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, setIsDark } = useTheme();

  const [propt, setpropert] = useState(localStorage.getItem("name"));
  const [signup, isSignup] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setpropert(name);
    isSignup(name !== null && name !== "");
    setIsHidden(location.pathname === "/Login");
  }, [location]);

  function handleLogout() {
    localStorage.clear();
    isSignup(false);
    navigate("/");
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-md ">
      <a href="/" className="flex items-center text-xl font-bold text-gray-800 dark:text-white tracking-wide">
        <img src={logo2} className="h-12 mr-3 rounded-lg" alt="logo" />
        BRAINWAVE
      </a>

      {!isHidden && (
        <div className="flex items-center gap-6">
          <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
            Home
          </a>

          {signup ? (
            <>
              <a href="/Dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Dashboard
              </a>
              <a href="/gamepage" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                Activities
              </a>

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
                  <p className="text-md font-semibold text-gray-800 dark:text-white truncate">{propt}</p>
                  
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
            <a href="/Login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

export default TopNavbar;

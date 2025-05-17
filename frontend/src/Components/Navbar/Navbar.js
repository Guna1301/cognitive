import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo2 from "../Navbar/bw2.jpg";
import user_icon from "../Navbar/user-circle.png";

function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [propt, setpropert] = useState(localStorage.getItem("name"));
  const [signup, isSignup] = useState(false);

  useEffect(() => {
    setpropert(localStorage.getItem("name"));
    isSignup(localStorage.getItem("name") !== null && localStorage.getItem("name") !== "");
  }, [setpropert, location]);

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(location.pathname === "/Login");
  }, [location]);

  function handleclick() {
    localStorage.clear();
    isSignup(false);
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-md">
      <a href="/" className="flex items-center text-lg font-semibold text-gray-800">
        <img src={logo2} className="h-12 mr-2" alt="logo" />
        BRAINWAVE
      </a>
      {!isHidden && (
        <div className="flex items-center gap-4">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </a>
          {signup ? (
            <>
              <a href="/Dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </a>
              <a href="/gamepage" className="text-gray-700 hover:text-blue-600 font-medium">
                Activities
              </a>
              <div className="relative group">
                <img
                  src={user_icon}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4 hidden group-hover:block">
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="text-md font-semibold text-gray-800">{propt}</p>
                  <button
                    onClick={handleclick}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <a href="/Login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

export default TopNavbar;
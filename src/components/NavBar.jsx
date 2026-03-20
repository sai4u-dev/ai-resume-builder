import React from "react";
import { IoHome, IoMoon, IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const darkMode = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-0 h-14 border-b transition-all duration-300
        ${darkMode
          ? "bg-gray-900 border-orange-900/30 shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
          : "bg-white border-sky-100 shadow-[0_2px_16px_rgba(56,189,248,0.08)]"
        }`}
    >
      {/* Left — logo + accent bar */}
      <div className="flex items-center gap-0 h-full">
        {/* orange left accent stripe */}
        <div className="w-1 h-8 rounded-r-full bg-orange-400 mr-4" />
        <img
          src="https://acciojob.com/src/Navbar/logo.svg"
          alt="AccioResume Logo"
          className="h-8 w-auto cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
          onError={(e) => (e.target.style.display = "none")}
          onClick={() => navigate("/")}
        />
      </div>

      {/* Right — home + theme toggle */}
      <div className="flex items-center gap-3">
        {/* Home button */}
        <button
          onClick={() => navigate("/")}
          title="Go Home"
          className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200
            ${darkMode
              ? "border-sky-700/40 text-sky-400 hover:bg-sky-900/40 hover:border-sky-500"
              : "border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-400"
            }`}
        >
          <IoHome size={18} />
        </button>

        {/* Divider pip */}
        <div className={`w-px h-5 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />

        {/* Dark mode toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          title="Toggle theme"
          className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200
            ${darkMode
              ? "border-orange-700/40 text-orange-400 hover:bg-orange-900/30 hover:border-orange-500"
              : "border-orange-200 text-orange-500 hover:bg-orange-50 hover:border-orange-400"
            }`}
        >
          {darkMode ? <IoSunnyOutline size={18} /> : <IoMoon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
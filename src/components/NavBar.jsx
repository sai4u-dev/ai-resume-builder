import React from "react";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";

function NavBar() {
    const darkMode = useSelector((state)=>state.theme)

    const dispatch = useDispatch()

    function setDarkMode(){
        dispatch(toggleTheme())
    }
    
  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-3 border-b border-white/20 shadow-lg transition-all duration-500
      ${darkMode ? "bg-gray-400 text-white" : "bg-white text-blue-900"}`}
    >
      <div className="flex items-center gap-3">
        <img
          src="https://acciojob.com/src/Navbar/logo.svg"
          alt="AccioResume Logo"
          className="w-28 h-10 rounded-full"
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2.5 rounded-full cursor-pointer hover:scale-110 transition shadow-lg
          ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-blue-900"}`}
      >
        {darkMode ? <IoSunnyOutline size={25} /> : <IoMoon size={25} />}
      </button>
    </nav>
  );
}

export default NavBar;

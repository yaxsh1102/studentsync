import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { LogOut, LogOutIcon } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {user,setIsLoggedIn} = useContext(AppContext)


  const Menus = [
    { title: "Events", src: "calendar1", path: "/events" },
    { title: "Communities", src: "icons8-chat-50", path: "/communities" },
    { title: "Dormitory", src: "icons8-home-50", path: "/dormitory" },
    { title: "Flatmate", src: "icons8-search-50", path: "/rooms" },
    { title: "Profile", src: "icons8-user-30", path: `/profile/${user.id}` },
    { title: "Logout", src: "icons8-logout-50", path: `/` },
  ];

  const handleNavigation = (path) => {
    if (path==='/'){
      localStorage.removeItem('jwt')
      setIsLoggedIn(false)
    }
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 p-5 pt-8 transition-all duration-300 border-r border-gray-700 ${
          open ? "w-60" : "w-20"
        } z-30`}
      >
        <img
          src="control.png"
          alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-700 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="logo.png"
            alt="logo"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            StudentSync
          </h1>
        </div>
        <ul className="mt-20">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className="flex rounded-md p-2 cursor-pointer hover:bg-gray-800 hover:text-yellow-400 text-white text-sm items-center gap-x-4"
              onClick={() => handleNavigation(Menu.path)}
            >
              {Menu.src==='logout' ? <LogOut className="text-black"/> : <img src={`${Menu.src}.png`} alt={Menu.title} className="w-5 my-2" /> }
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-20"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
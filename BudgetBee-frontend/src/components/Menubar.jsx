import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import logo from "../assets/logo.png";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu, showSidebar = true }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("🚀 Logout initiated");

    // Clear all storage
    localStorage.clear();

    // Clear user context
    clearUser();

    // Close dropdown
    setShowDropdown(false);

    console.log("✅ Storage and context cleared");

    // Force redirect to landing page
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className="menubar flex items-center justify-between gap-5 py-4 px-4 sm:px-7 sticky top-0 z-40">
        {/* Left side - Menu button and title */}
        <div className="flex items-center gap-5">
          {/* Mobile menu button - only show if sidebar is enabled */}
          {showSidebar && user && (
            <button
              onClick={() => setOpenSideMenu(!openSideMenu)}
              className="block lg:hidden text-purple-400 hover:bg-purple-500/10 p-2 rounded-lg transition-all duration-300"
            >
              {openSideMenu ? (
                <X className="text-2xl" />
              ) : (
                <Menu className="text-2xl" />
              )}
            </button>
          )}

          {/* Logo - Always redirects to Landing Page */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="BudgetBee Logo"
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              BudgetBee
            </span>
          </div>
        </div>

        {/* Right side - Navigation & User Avatar */}
        <div className="flex items-center gap-4">
          {/* Dashboard Button - Show only when logged in */}
          {user && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium hidden sm:block"
            >
              Dashboard
            </button>
          )}

          {/* About Us Button - Always visible */}
          <button
            onClick={() => navigate("/about")}
            className="text-slate-300 hover:text-white transition-colors text-sm font-medium hidden sm:block"
          >
            About Us
          </button>

          {/* Show Login & Register if NOT logged in */}
          {!user && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium hidden sm:block"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="add-btn add-btn-fill px-4 py-2 text-sm"
              >
                Register
              </button>
            </>
          )}

          {/* Show User Avatar if logged in */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60"
              >
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <User className="text-purple-400" size={20} />
                  </div>
                )}
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="dropdown-menu absolute right-0 mt-3 w-56 rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                        {user?.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl}
                            alt={user.fullName}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Options */}
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="dropdown-item flex items-center gap-3 w-full px-4 py-2.5 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile side menu - only show if sidebar is enabled */}
      {showSidebar && openSideMenu && user && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30 animate-in fade-in duration-200"
          onClick={() => setOpenSideMenu(false)}
        >
          <div
            className="fixed left-0 top-[73px] bottom-0 w-64 sidebar animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeMenu={activeMenu}
              onNavigate={() => setOpenSideMenu(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Menubar;

import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu, onNavigate }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center gap-4 mb-8 pb-6 border-b border-slate-700/50">
        <div className="relative group">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 flex items-center justify-center group-hover:border-purple-500/60 transition-all duration-300">
              <User className="text-purple-400" size={32} />
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
        </div>

        <div className="text-center">
          <h5 className="text-white font-semibold text-base mb-1">
            {user?.fullName || "Guest"}
          </h5>
          <p className="text-slate-400 text-xs">
            {user?.email || "guest@budgetbee.com"}
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {SIDE_BAR_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              onClick={() => handleNavigate(item.path)}
              key={`menu_${index}`}
              className={`sidebar-item w-full flex items-center gap-4 text-sm py-3 px-4 rounded-lg transition-all duration-300 ${
                isActive ? "active" : ""
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section - Optional Stats or Info */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
          <p className="text-xs text-slate-400 mb-2">💡 Pro Tip</p>
          <p className="text-xs text-slate-300">
            Categorize your expenses to get better insights into your spending
            patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

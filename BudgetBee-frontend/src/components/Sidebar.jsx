import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="w-50 h-[calc(100vh-51px)] bg-white border-gray-200/50 p-4 sticky top-[51px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-2 mb-4">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="profile image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <User className="w-20 h-20 text-xl" />
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user.fullName || "Guest"}
        </h5>
        {SIDE_BAR_DATA.map((item, index) => (
          <button
            onClick={() => navigate(item.path)}
            key={`menu_${index}`}
            className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
              ["Dashboard", "Filter", "Expense", "Income", "Category"].includes(
                activeMenu
              ) && activeMenu === item.label
                ? "text-white bg-purple-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;

import { useContext } from "react";
import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <Menubar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Sidebar - Hidden on mobile, visible on lg screens and up */}
          <div className="hidden lg:block w-64 p-4 bg-gray-50 min-h-screen border-r border-gray-200">
            {/** Side bar content */}
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* Main content - Takes remaining space */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { useContext } from "react";
import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  return (
    <div className="dashboard-wrapper min-h-screen flex flex-col">
      <Menubar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1">
          {/* Sidebar - Hidden on mobile, visible on lg screens and up */}
          <div className="hidden lg:block w-64 sidebar min-h-screen sticky top-0">
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* Main content - Takes remaining space */}
          <div className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;

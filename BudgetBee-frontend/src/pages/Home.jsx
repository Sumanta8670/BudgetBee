import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard.jsx";
import InfoCard from "../components/InfoCard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { addThousandsSeparator } from "../util/util.js";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);
  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/**Display the  cards */}
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0.00)}
              color="bg-purple-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0.00)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0.00)}
              color="bg-red-800"
            />
          </div>
          <div className="grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/** Recent transactions */}
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onMore={() => navigate("/expense")}
            />
            {/** fiannce overview charts */}
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0.00}
              totalIncome={dashboardData?.totalIncome || 0.00}
              totalExpense={dashboardData?.totalExpense || 0.00}
            />
            {/** Expense transactions */}
            <Transactions
            title="Recent Expenses"
            transactions={dashboardData?.recent10Expenses || []}
            onMore={() => navigate("/expense")}
            type="expense"
          />
            {/** Income transactions */}
            <Transactions
            title="Recent Incomes"
              transactions={dashboardData?.recent10Incomes || []}
              onMore={() => navigate("/income")}
              type="income"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;

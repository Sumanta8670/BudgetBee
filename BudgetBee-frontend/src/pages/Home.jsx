import { Coins, Wallet, WalletCards, TrendingUp } from "lucide-react";
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
  }, []);

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-8 mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white page-heading mb-2">
            Financial Dashboard
          </h2>
          <p className="text-slate-400">
            Get a comprehensive overview of your financial health with real-time
            insights and analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0.0)}
            color="purple"
          />
          <InfoCard
            icon={<Wallet />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0.0)}
            color="green"
          />
          <InfoCard
            icon={<Coins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0.0)}
            color="red"
          />
        </div>

        {/* Quick Stats Insight */}
        {dashboardData && (
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Financial Insight
                </h3>
                <p className="text-slate-400 text-sm">
                  {dashboardData.totalBalance >= 0
                    ? `You're doing great! Your current balance is ₹${addThousandsSeparator(
                        dashboardData.totalBalance.toFixed(0)
                      )}. Keep tracking your expenses to maintain healthy finances.`
                    : `Your expenses exceed income by ₹${addThousandsSeparator(
                        Math.abs(dashboardData.totalBalance).toFixed(0)
                      )}. Consider reviewing your spending habits to improve your financial health.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/filter")}
          />

          {/* Finance Overview Chart */}
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0.0}
            totalIncome={dashboardData?.totalIncome || 0.0}
            totalExpense={dashboardData?.totalExpense || 0.0}
          />

          {/* Recent Expenses */}
          <Transactions
            title="Recent Expenses"
            transactions={dashboardData?.recent10Expenses || []}
            onMore={() => navigate("/expense")}
            type="expense"
          />

          {/* Recent Incomes */}
          <Transactions
            title="Recent Incomes"
            transactions={dashboardData?.recent10Incomes || []}
            onMore={() => navigate("/income")}
            type="income"
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;

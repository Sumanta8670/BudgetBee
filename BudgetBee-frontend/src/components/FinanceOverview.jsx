import CustomPieChart from "./CustomPieChart.jsx";
import { PieChart } from "lucide-react";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const chartData = {
    income: totalIncome || 0,
    expense: totalExpense || 0,
    balance: totalBalance || 0,
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
          <PieChart className="text-purple-400" size={20} />
        </div>
        <div>
          <h5 className="text-xl font-bold text-white">Financial Breakdown</h5>
          <p className="text-xs text-slate-400">
            Visual distribution of income vs expenses
          </p>
        </div>
      </div>

      <CustomPieChart data={chartData} />
    </div>
  );
};

export default FinanceOverview;

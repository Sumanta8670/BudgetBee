import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareExpenseLineChartData } from "../util/util.js";
import { Plus, TrendingDown } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/30">
            <TrendingDown className="text-red-400" size={24} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white mb-1">
              Expense Trends
            </h5>
            <p className="text-sm text-slate-400">
              Monitor your spending patterns over time and discover
              opportunities to optimize your budget
            </p>
          </div>
        </div>
        <button onClick={onAddExpense} className="add-btn whitespace-nowrap">
          <Plus size={18} /> Add Expense
        </button>
      </div>

      {chartData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <TrendingDown className="text-purple-400" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Expense Data Yet
          </h3>
          <p className="text-slate-400 mb-4 max-w-md mx-auto">
            Start recording your expenses to visualize spending trends and make
            informed financial decisions
          </p>
          <button onClick={onAddExpense} className="add-btn-fill add-btn">
            <Plus size={18} /> Add Your First Expense
          </button>
        </div>
      ) : (
        <div className="mt-6 chart-container">
          <CustomLineChart data={chartData} />
        </div>
      )}
    </div>
  );
};

export default ExpenseOverview;

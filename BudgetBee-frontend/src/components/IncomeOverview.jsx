import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/util.js";
import { Plus, TrendingUp } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white mb-1">Income Trends</h5>
            <p className="text-sm text-slate-400">
              Visualize your earnings over time and identify patterns to
              maximize your income potential
            </p>
          </div>
        </div>
        <button onClick={onAddIncome} className="add-btn whitespace-nowrap">
          <Plus size={18} /> Add Income
        </button>
      </div>

      {chartData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <TrendingUp className="text-purple-400" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Income Data Yet
          </h3>
          <p className="text-slate-400 mb-4 max-w-md mx-auto">
            Start tracking your income to see beautiful visualizations and gain
            insights into your earning patterns
          </p>
          <button onClick={onAddIncome} className="add-btn-fill add-btn">
            <Plus size={18} /> Add Your First Income
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

export default IncomeOverview;

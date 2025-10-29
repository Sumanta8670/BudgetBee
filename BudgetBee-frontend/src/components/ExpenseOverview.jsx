import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareExpenseLineChartData } from "../util/util.js";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0 5">
            Track your spending over time and analyze your Expense trends.
          </p>
        </div>
        <button onClick={onAddExpense} className="add-btn">
          <Plus size={15} className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;

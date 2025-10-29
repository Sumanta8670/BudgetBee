// import { addThousandsSeparator } from "../util/util.js";
// import CustomPieChart from "./CustomPieChart.jsx";

// const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
//   const COLORS = ["#591688", "#a0090e", "#016630"];

//   const chartData = [
//     { name: "Total Balance", amount: totalBalance },
//     { name: "Total Income", amount: totalIncome },
//     { name: "Total Expense", amount: totalExpense },
//   ];
//   return (
//     <div className="card">
//       <div className="flex items-center justify-between">
//         <h5 className="text-lg">Financial Overview</h5>
//       </div>
//       <CustomPieChart
//         data={chartData}
//         label="Total Balance"
//         totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
//         colors={COLORS}
//         showTextAnchor
//       />
//     </div>
//   );
// };

// export default FinanceOverview;

import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  // Prepare data in the correct format for CustomPieChart
  const chartData = {
    income: totalIncome || 0,
    expense: totalExpense || 0,
    balance: totalBalance || 0,
  };

  return (
    <div className="card col-span-1 md:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-semibold">Financial Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Visual breakdown of your income and expenses
          </p>
        </div>
      </div>

      <CustomPieChart data={chartData} />
    </div>
  );
};

export default FinanceOverview;

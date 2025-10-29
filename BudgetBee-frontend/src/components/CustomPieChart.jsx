import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { addThousandsSeparator } from "../util/util.js";

const CustomPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Colors for the pie chart
  const COLORS = {
    income: "#10b981", // Green
    expense: "#ef4444", // Red
    balance: "#8b5cf6", // Purple
  };

  // Format data for the pie chart
  const chartData = data
    ? [
        { name: "Income", value: data.income, color: COLORS.income },
        { name: "Expense", value: data.expense, color: COLORS.expense },
      ]
    : [];

  // Custom label for the pie slices
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            {payload[0].name}
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: payload[0].payload.color }}
          >
            ₹{addThousandsSeparator(payload[0].value)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {((payload[0].value / (data.income + data.expense)) * 100).toFixed(
              1
            )}
            % of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-col gap-3 mt-4">
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {entry.value}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-800">
              ₹{addThousandsSeparator(entry.payload.value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Handle empty or invalid data
  if (!data || (data.income === 0 && data.expense === 0)) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No financial data available</p>
          <p className="text-gray-400 text-xs mt-1">
            Add income or expenses to see the breakdown
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            {/* Gradient for Income */}
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#059669" stopOpacity={1} />
            </linearGradient>
            {/* Gradient for Expense */}
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={90}
            innerRadius={55}
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{
                  filter:
                    activeIndex === index ? "brightness(1.1)" : "brightness(1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  opacity:
                    activeIndex !== null && activeIndex !== index ? 0.6 : 1,
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>

      {/* Balance indicator */}
      {data.balance !== undefined && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                Net Balance
              </span>
            </div>
            <span
              className={`text-lg font-bold ${
                data.balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.balance >= 0 ? "+" : ""}₹
              {addThousandsSeparator(Math.abs(data.balance))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;

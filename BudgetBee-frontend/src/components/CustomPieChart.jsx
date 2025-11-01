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
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const CustomPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = {
    income: "#10b981",
    expense: "#ef4444",
  };

  const chartData = data
    ? [
        { name: "Income", value: data.income, color: COLORS.income },
        { name: "Expense", value: data.expense, color: COLORS.expense },
      ]
    : [];

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="modal-content rounded-xl px-4 py-3 shadow-2xl border border-purple-500/30">
          <p className="text-sm font-semibold text-white mb-1">
            {payload[0].name}
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: payload[0].payload.color }}
          >
            ₹{addThousandsSeparator(payload[0].value)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
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

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-col gap-3 mt-4">
        {payload.map((entry, index) => {
          const Icon = entry.value === "Income" ? TrendingUp : TrendingDown;
          return (
            <div
              key={`legend-${index}`}
              className="flex items-center justify-between p-3 rounded-lg transaction-card"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <Icon size={16} style={{ color: entry.color }} />
                <span className="text-sm font-medium text-slate-300">
                  {entry.value}
                </span>
              </div>
              <span className="text-sm font-bold text-white">
                ₹{addThousandsSeparator(entry.payload.value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  if (!data || (data.income === 0 && data.expense === 0)) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="empty-state">
          <div className="empty-state-icon">
            <Wallet className="text-purple-400" size={40} />
          </div>
          <p className="text-slate-400 text-sm">No financial data available</p>
          <p className="text-slate-500 text-xs mt-1">
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

      {data.balance !== undefined && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm font-medium text-slate-300">
                Net Balance
              </span>
            </div>
            <span
              className={`text-lg font-bold ${
                data.balance >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.balance >= 0 ? "+" : ""}₹
              {addThousandsSeparator(Math.abs(data.balance).toFixed(0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;

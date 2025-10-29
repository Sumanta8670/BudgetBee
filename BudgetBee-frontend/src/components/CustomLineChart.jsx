import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { addThousandsSeparator } from "../util/util.js";

const CustomLineChart = ({ data }) => {
  const [activePoint, setActivePoint] = useState(null);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            {data.month}
          </p>
          <p className="text-lg font-bold text-purple-600 mb-2">
            Total: ₹{addThousandsSeparator(data.totalAmount)}
          </p>
          {data.items && data.items.length > 0 && (
            <div className="mt-2 border-t pt-2">
              <p className="text-xs text-gray-600 mb-1">Details:</p>
              {data.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-gray-700"
                >
                  {item.icon && (
                    <img src={item.icon} alt={item.name} className="w-4 h-4" />
                  )}
                  <span>{item.name}:</span>
                  <span className="font-semibold">
                    ₹{addThousandsSeparator(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom dot component for hover effect
  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    const isActive = activePoint === index;

    return (
      <g>
        {/* Outer circle */}
        <circle
          cx={cx}
          cy={cy}
          r={isActive ? 8 : 5}
          fill="#8b5cf6"
          stroke="#fff"
          strokeWidth={2}
          style={{
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        />
        {/* Inner dot */}
        {isActive && <circle cx={cx} cy={cy} r={3} fill="#fff" />}
      </g>
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>No income data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setActivePoint(state.activeTooltipIndex);
            } else {
              setActivePoint(null);
            }
          }}
          onMouseLeave={() => setActivePoint(null)}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
            dx={-10}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#8b5cf6",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />

          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="url(#colorIncome)"
            fillOpacity={1}
          />

          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;

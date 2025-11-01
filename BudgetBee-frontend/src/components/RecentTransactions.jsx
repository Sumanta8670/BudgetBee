import { ArrowRight, Activity } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
              <Activity className="text-purple-400" size={20} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Recent Activity</h4>
              <p className="text-xs text-slate-400">
                Latest financial movements
              </p>
            </div>
          </div>
          <button className="card-btn" onClick={onMore}>
            <span className="hidden sm:inline">View All</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="empty-state py-8">
          <div className="empty-state-icon">
            <Activity className="text-purple-400" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Recent Activity
          </h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Your recent transactions will appear here once you start adding
            income or expenses
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
            <Activity className="text-purple-400" size={20} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Recent Activity</h4>
            <p className="text-xs text-slate-400">
              Last {transactions.length} transactions
            </p>
          </div>
        </div>
        <button className="card-btn" onClick={onMore}>
          <span className="hidden sm:inline">View All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {transactions.slice(0, 5).map((item, index) => (
          <TransactionInfoCard
            key={`${item.type}-${item.id}-${index}`}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;

import { ArrowRight, Wallet, CreditCard } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const Transactions = ({
  transactions = [],
  onMore = () => {},
  type = "expense",
  title,
}) => {
  const Icon = type === "income" ? Wallet : CreditCard;
  const colorClass =
    type === "income"
      ? "from-green-500/20 to-emerald-500/20 border-green-500/30"
      : "from-red-500/20 to-pink-500/20 border-red-500/30";
  const iconColor = type === "income" ? "text-green-400" : "text-red-400";

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center border`}
          >
            <Icon className={iconColor} size={20} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white">{title}</h5>
            <p className="text-xs text-slate-400">
              {transactions.length}{" "}
              {transactions.length === 1 ? "transaction" : "transactions"}
            </p>
          </div>
        </div>
        <button className="card-btn" onClick={onMore}>
          <span className="hidden sm:inline">View All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <div className="empty-state py-8">
            <div className="empty-state-icon">
              <Icon className="text-purple-400" size={40} />
            </div>
            <p className="text-slate-400 text-center">
              No recent {type}s available
            </p>
          </div>
        ) : (
          transactions
            .slice(0, 10)
            .map((item) => (
              <TransactionInfoCard
                key={item.id}
                title={item.name}
                icon={item.icon}
                date={moment(item.date).format("DD MMM YYYY")}
                amount={item.amount}
                type={type}
                hideDeleteBtn
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Transactions;

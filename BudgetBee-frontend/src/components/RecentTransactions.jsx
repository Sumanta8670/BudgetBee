import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  // Add null check
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <h4 className="text-lg">Recent Transactions</h4>
          <button className="card-btn" onClick={onMore}>
            More <ArrowRight className="text-base" size={15} />
          </button>
        </div>
        <div className="mt-6 text-center py-8">
          <p className="text-gray-500 text-sm">No transactions yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Your recent transactions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>
        <button className="card-btn" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>
      <div className="mt-6">
        {transactions.slice(0, 5).map((item, index) => (
          <TransactionInfoCard
            key={`${item.type}-${item.id}-${index}`} // Fixed: unique key
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

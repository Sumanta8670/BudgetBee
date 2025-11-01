import { Download, LoaderCircle, Mail, CreditCard } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/30">
            <CreditCard className="text-red-400" size={20} />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white">Expense Sources</h5>
            <p className="text-sm text-slate-400">
              {transactions.length}{" "}
              {transactions.length === 1 ? "transaction" : "transactions"}{" "}
              recorded
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={loading || transactions.length === 0}
            className="card-btn"
            onClick={handleEmail}
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Sending...</span>
              </>
            ) : (
              <>
                <Mail size={16} />
                <span className="hidden sm:inline">Email</span>
              </>
            )}
          </button>
          <button
            disabled={loading || transactions.length === 0}
            className="card-btn"
            onClick={handleDownload}
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Downloading...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state py-12">
          <div className="empty-state-icon">
            <CreditCard className="text-purple-400" size={40} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Expense Records
          </h3>
          <p className="text-slate-400 max-w-md mx-auto">
            You haven't recorded any expenses yet. Start tracking your spending
            to gain better control over your finances.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM, YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

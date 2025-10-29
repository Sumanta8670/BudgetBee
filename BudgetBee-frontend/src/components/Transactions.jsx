import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const Transactions = ({
  transactions = [],
  onMore = () => {},
  type = "expense",
  title,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button className="card-btn" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No recent {type}s available.
          </p>
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

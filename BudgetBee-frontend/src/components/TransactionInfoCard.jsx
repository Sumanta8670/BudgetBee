import { Trash2, TrendingDown, TrendingUp, Layers2 } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  return (
    <div className="transaction-card group mb-3">
      <div className="flex items-center gap-4">
        <div className="icon-badge w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">
          {icon ? (
            <img src={icon} alt={title} className="w-7 h-7" />
          ) : (
            <Layers2 className="text-purple-400" size={24} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h6 className="text-white font-semibold text-sm truncate mb-1">
            {title}
          </h6>
          <p className="text-xs text-slate-400">{date}</p>
        </div>

        <div className="flex items-center gap-3">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="delete-btn opacity-0 group-hover:opacity-100 transition-all duration-300 p-2"
              aria-label="Delete transaction"
            >
              <Trash2 size={16} />
            </button>
          )}

          <div className={`amount-badge ${type} flex items-center gap-2`}>
            {type === "income" ? (
              <>
                <TrendingUp size={14} />
                <span className="font-semibold">
                  +₹{addThousandsSeparator(Number(amount).toFixed(0))}
                </span>
              </>
            ) : (
              <>
                <TrendingDown size={14} />
                <span className="font-semibold">
                  -₹{addThousandsSeparator(Number(amount).toFixed(0))}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

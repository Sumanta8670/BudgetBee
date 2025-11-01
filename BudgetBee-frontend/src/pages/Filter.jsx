import { Search, Filter as FilterIcon, Loader2 } from "lucide-react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { useState } from "react";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import toast from "react-hot-toast";
import moment from "moment";

const Filter = () => {
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      if (response.status === 200) {
        setTransactions(response.data);
        toast.success(`Found ${response.data.length} transactions`);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch transactions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-8 mx-auto space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white page-heading mb-2">
            Advanced Filters
          </h2>
          <p className="text-slate-400">
            Search and filter your transactions with powerful criteria to find
            exactly what you're looking for
          </p>
        </div>

        {/* Filter Form */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
              <FilterIcon className="text-purple-400" size={20} />
            </div>
            <div>
              <h5 className="text-xl font-bold text-white">Filter Criteria</h5>
              <p className="text-xs text-slate-400">
                Customize your search with multiple parameters
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div>
              <label className="label-animated">Transaction Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-dark w-full rounded-lg py-3 px-4 text-base"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="label-animated">Start Date</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="input-dark w-full rounded-lg py-3 px-4 text-base"
              />
            </div>

            <div>
              <label className="label-animated">End Date</label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="input-dark w-full rounded-lg py-3 px-4 text-base"
              />
            </div>

            <div>
              <label className="label-animated">Sort By</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="input-dark w-full rounded-lg py-3 px-4 text-base"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>

            <div>
              <label className="label-animated">Sort Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="input-dark w-full rounded-lg py-3 px-4 text-base"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div>
              <label className="label-animated">Search Keyword</label>
              <div className="flex gap-2">
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="Search transactions..."
                  className="input-dark flex-1 rounded-lg py-3 px-4 text-base"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="add-btn add-btn-fill px-4"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h5 className="text-xl font-bold text-white">Search Results</h5>
              <p className="text-xs text-slate-400">
                {transactions.length > 0
                  ? `Found ${transactions.length} ${
                      transactions.length === 1 ? "transaction" : "transactions"
                    }`
                  : "No transactions found"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="empty-state py-12">
              <Loader2 className="animate-spin text-purple-400 w-12 h-12 mb-4" />
              <p className="text-slate-400">Searching transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="empty-state py-12">
              <div className="empty-state-icon">
                <Search className="text-purple-400" size={40} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No Results Found
              </h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Try adjusting your filter criteria or search terms to find
                matching transactions
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <TransactionInfoCard
                  key={transaction.id}
                  title={transaction.name}
                  icon={transaction.icon}
                  date={moment(transaction.date).format("DD MMM, YYYY")}
                  amount={transaction.amount}
                  type={type}
                  hideDeleteBtn
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;

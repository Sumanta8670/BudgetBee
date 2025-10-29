import { Search } from "lucide-react";
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
  const [type, setType] = useState("income"); // Set default
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date"); // Set default
  const [sortOrder, setSortOrder] = useState("desc"); // Set default
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //api call to fetch transactions
      const response = await AxiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      if (response.status === 200) {
        console.log("transactions", response.data);
        setTransactions(response.data);
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
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transaction</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the Filter</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="type"
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Type</option> {/* Add default option */}
                <option value="income">Income</option> {/* Fixed */}
                <option value="expense">Expense</option> {/* Fixed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="StartDate"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                id="StartDate"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="EndDate"
                className="block text-sm font-medium mb-1"
              >
                End Date
              </label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                id="EndDate"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="sortfield"
                className="block text-sm font-medium mb-1"
              >
                Sort By
              </label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                id="sortfield"
                className="w-full border rounded px-3 py-2"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortorder"
                className="block text-sm font-medium mb-1"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                id="sortorder"
                className="w-full border rounded px-3 py-2"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1"
                >
                  Search
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  id="keyword"
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer"
              >
                <Search size={25} />
              </button>
            </div>
          </form>
        </div>
        <div className="card p-4">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-lg font-semibold">Transaction</h5>
          </div>
          {transactions.length === 0 && !loading ? (
            <p className="text-gray-600">
              Select the filter and click apply to filter the transactions.
            </p>
          ) : (
            ""
          )}
          {transactions.map((transaction) => (
            <TransactionInfoCard
              key={transaction.id}
              title={transaction.name}
              icon={transaction.icon}
              date={moment(transaction.date).format("YYYY-MM-DD")} // Format the date to "YYYY-MM-DD" format before passing it to the TransactionInfoCard component.transaction.date}
              amount={transaction.amount}
              type={type}
              hideDeleteBtn
            />
          ))}
        </div>
      </div>
    </Dashboard>
  );
};
export default Filter;

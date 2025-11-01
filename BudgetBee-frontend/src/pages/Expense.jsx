import { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { AppContext } from "../context/AppContext.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import {
  TrendingDown,
  CreditCard,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";

const Expense = () => {
  const { user } = useContext(AppContext);
  const [ExpenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("🔍 Fetching expense details...");
      const response = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      console.log("✅ Expense Response:", response);
      console.log("📊 Expense Data:", response.data);
      if (response.status === 200) {
        setExpenseData(response.data);
        console.log("💾 Expense data set:", response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching Expense details:", error);
      console.error("Error response:", error.response);
      toast.error(
        error.response?.data?.message || "Failed to fetch Expense details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await AxiosConfig.get(
        API_ENDPOINTS.GET_ALL_CATEGORIES_BY_TYPE("expense")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching Expense categories:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch Expense categories."
      );
    }
  };

  const handleAddExpense = async (Expense) => {
    const { name, amount, date, icon, categoryId } = Expense;

    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.log("Error adding Expense:", error);
      toast.error(error.response?.data?.message || "Failed to add Expense.");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await AxiosConfig.delete(
        API_ENDPOINTS.DELETE_EXPENSE(id)
      );
      if (response.status === 200 || response.status === 204) {
        toast.success("Expense deleted successfully");
        await fetchExpenseDetails();
        setOpenDeleteAlert({ show: false, data: null });
      }
    } catch (error) {
      console.log("Error deleting Expense:", error);
      toast.error(error.response?.data?.message || "Failed to delete Expense.");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await AxiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );
      let filename = "Expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
    } catch (error) {
      console.error("Error downloading Expense details:", error);
      toast.error(
        error.response?.data?.message || "Failed to download Expense details."
      );
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Email sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(error.response?.data?.message || "Failed to send email.");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("👤 User loaded:", user);
      console.log("🔑 Token:", localStorage.getItem("token"));
      fetchExpenseDetails();
      fetchExpenseCategories();
    }
  }, [user]);

  // Show loading state while user is being fetched
  if (!user) {
    return (
      <Dashboard activeMenu="Expense">
        <div className="flex justify-center items-center min-h-screen">
          <LoaderCircle className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </Dashboard>
    );
  }

  // Calculate statistics
  const totalExpense = ExpenseData.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  const avgExpense =
    ExpenseData.length > 0 ? totalExpense / ExpenseData.length : 0;
  const highestExpense =
    ExpenseData.length > 0
      ? Math.max(...ExpenseData.map((e) => Number(e.amount)))
      : 0;

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-8 mx-auto space-y-6">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white page-heading mb-2">
            Expense Management
          </h2>
          <p className="text-slate-400">
            Monitor your spending habits, identify cost-saving opportunities,
            and maintain better control over your expenses with detailed
            tracking and analytics.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/30">
                <CreditCard className="text-red-400" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{addThousandsSeparator(totalExpense.toFixed(0))}
            </p>
            <p className="text-sm text-slate-400">Total Expenses</p>
            <p className="text-xs text-red-400 mt-2">All-time spending</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-500/30">
                <TrendingDown className="text-orange-400" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{addThousandsSeparator(avgExpense.toFixed(0))}
            </p>
            <p className="text-sm text-slate-400">Average Expense</p>
            <p className="text-xs text-orange-400 mt-2">Per transaction</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <AlertCircle className="text-purple-400" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{addThousandsSeparator(highestExpense.toFixed(0))}
            </p>
            <p className="text-sm text-slate-400">Highest Expense</p>
            <p className="text-xs text-purple-400 mt-2">Single transaction</p>
          </div>
        </div>

        {/* Expense Overview Chart */}
        <ExpenseOverview
          transactions={ExpenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
        />

        {/* Expense List */}
        <ExpenseList
          transactions={ExpenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpenseDetails}
          onEmail={handleEmailExpenseDetails}
        />

        {/* Add Expense modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add New Expense"
        >
          <AddExpenseForm
            onAddExpense={(Expense) => handleAddExpense(Expense)}
            categories={categories}
          />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense? This action cannot be undone and will permanently remove this record from your financial history."
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Expense;

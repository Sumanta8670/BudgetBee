import { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { AppContext } from "../context/AppContext.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";
import { TrendingUp, Wallet, BarChart3, LoaderCircle } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";

const Income = () => {
  const { user } = useContext(AppContext);
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("🔍 Fetching income details...");
      const response = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      console.log("✅ Income Response:", response);
      console.log("📊 Income Data:", response.data);
      if (response.status === 200) {
        setIncomeData(response.data);
        console.log("💾 Income data set:", response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching income details:", error);
      console.error("Error response:", error.response);
      toast.error(
        error.response?.data?.message || "Failed to fetch income details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await AxiosConfig.get(
        API_ENDPOINTS.GET_ALL_CATEGORIES_BY_TYPE("income")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching income categories:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income categories."
      );
    }
  };

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

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
      const response = await AxiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("Error adding income:", error);
      toast.error(error.response?.data?.message || "Failed to add income.");
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      const response = await AxiosConfig.delete(
        API_ENDPOINTS.DELETE_INCOME(id)
      );
      if (response.status === 200 || response.status === 204) {
        toast.success("Income deleted successfully");
        await fetchIncomeDetails();
        setOpenDeleteAlert({ show: false, data: null });
      }
    } catch (error) {
      console.log("Error deleting income:", error);
      toast.error(error.response?.data?.message || "Failed to delete income.");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await AxiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" }
      );
      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error(
        error.response?.data?.message || "Failed to download income details."
      );
    }
  };

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
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
      fetchIncomeDetails();
      fetchIncomeCategories();
    }
  }, [user]);

  // Show loading state while user is being fetched
  if (!user) {
    return (
      <Dashboard activeMenu="Income">
        <div className="flex justify-center items-center min-h-screen">
          <LoaderCircle className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </Dashboard>
    );
  }

  // Calculate statistics
  const totalIncome = incomeData.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );
  const avgIncome = incomeData.length > 0 ? totalIncome / incomeData.length : 0;
  const highestIncome =
    incomeData.length > 0
      ? Math.max(...incomeData.map((i) => Number(i.amount)))
      : 0;

  return (
    <Dashboard activeMenu="Income">
      <div className="my-8 mx-auto space-y-6">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white page-heading mb-2">
            Income Management
          </h2>
          <p className="text-slate-400">
            Track your earnings, analyze income patterns, and stay on top of
            your financial growth with powerful insights and analytics.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                <Wallet className="text-green-400" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{addThousandsSeparator(totalIncome.toFixed(0))}
            </p>
            <p className="text-sm text-slate-400">Total Income</p>
            <p className="text-xs text-green-400 mt-2">All-time earnings</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{addThousandsSeparator(avgIncome.toFixed(0))}
            </p>
            <p className="text-sm text-slate-400">Average Income</p>
            <p className="text-xs text-blue-400 mt-2">Per transaction</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <BarChart3 className="text-purple-400" size={24} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ₹{addThousandsSeparator(highestIncome.toFixed(0))}
            </p>
            <p className="text-sm text-slate-400">Highest Income</p>
            <p className="text-xs text-purple-400 mt-2">Single transaction</p>
          </div>
        </div>

        {/* Income Overview Chart */}
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        {/* Income List */}
        <IncomeList
          transactions={incomeData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadIncomeDetails}
          onEmail={handleEmailIncomeDetails}
        />

        {/* Add income modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <AddIncomeForm
            onAddIncome={(income) => handleAddIncome(income)}
            categories={categories}
          />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income? This action cannot be undone and will permanently remove this record from your financial history."
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Income;

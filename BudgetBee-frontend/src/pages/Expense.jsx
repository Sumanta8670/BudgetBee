import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";

const Expense = () => {
  useUser();
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
      //api call to fetch Expense details
      const response = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Expense details:", error);
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
        API_ENDPOINTS.GET_ALL_CATEGORIES_BY_TYPE("Expense")
      );
      if (response.status === 200) {
        console.log("Expense categories", response.data);
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
        await fetchExpenseDetails(); // ensure data reloads before close
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
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols gap-6">
          <div>
            {/* Overview of Expense with line chart */}
            <ExpenseOverview
              transactions={ExpenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
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
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(Expense) => handleAddExpense(Expense)}
              categories={categories}
            />
          </Modal>
          {/* Add Expense Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this Expense?"
              onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};
export default Expense;

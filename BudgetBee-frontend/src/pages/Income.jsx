import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
  useUser();
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
      //api call to fetch income details
      const response = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
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
        console.log("income categories", response.data);
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
        await fetchIncomeDetails(); // ensure data reloads before close
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

  const handleEmailIncomeDetails = () => {
    console.log("Email income details");
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols gap-6">
          <div>
            {/* Overview of income with line chart */}
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
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
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Modal>
          {/* Add Income Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income?"
              onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};
export default Income;

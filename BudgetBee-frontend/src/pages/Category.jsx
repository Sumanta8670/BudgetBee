import { Plus, Sparkles } from "lucide-react";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import CategoryList from "../components/CategoryList.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await AxiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }
    const isDuplicate = categoryData.some((category) => {
      return (
        category.name.toLowerCase() === name.trim().toLowerCase() &&
        category.type === type
      );
    });
    if (isDuplicate) {
      toast.error(`Category with name "${name}" already exists for ${type}.`);
      return;
    }

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("Category added successfully.");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Failed to add category.");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenUpdateCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;

    if (!name.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    if (!id) {
      toast.error("Invalid category ID to update.");
      return;
    }

    const isDuplicate = categoryData.some((category) => {
      return (
        category.id !== id &&
        category.name.toLowerCase() === name.trim().toLowerCase() &&
        category.type === type
      );
    });

    if (isDuplicate) {
      toast.error(`Category with name "${name}" already exists for ${type}.`);
      return;
    }

    try {
      await AxiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      });
      setOpenUpdateCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully.");
      fetchCategoryDetails();
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to update category."
      );
    }
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-8 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white page-heading mb-2">
              Category Management
            </h2>
            <p className="text-slate-400 text-sm">
              Organize your transactions with custom categories for better
              financial insights
            </p>
          </div>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <Sparkles className="text-purple-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {categoryData.length}
                </p>
                <p className="text-sm text-slate-400">Total Categories</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Plus className="text-green-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {categoryData.filter((c) => c.type === "income").length}
                </p>
                <p className="text-sm text-slate-400">Income Categories</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                <Plus className="text-red-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {categoryData.filter((c) => c.type === "expense").length}
                </p>
                <p className="text-sm text-slate-400">Expense Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category List */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
          loading={loading}
        />

        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add New Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* Updating category modal */}
        <Modal
          onClose={() => {
            setOpenUpdateCategoryModal(false);
            setSelectedCategory(null);
          }}
          isOpen={openUpdateCategoryModal}
          title="Update Category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;

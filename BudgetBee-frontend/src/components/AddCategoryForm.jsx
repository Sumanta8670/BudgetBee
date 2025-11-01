import { useEffect, useState } from "react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="mb-6">
        <p className="text-sm text-slate-400 mb-4">
          {isEditing
            ? "Update your category details below"
            : "Create a new category to organize your transactions"}
        </p>
      </div>

      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g., Freelance, Salary, Groceries"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-8 pt-4 border-t border-slate-700/50">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="add-btn add-btn-fill px-6 py-3"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <span>{isEditing ? "Updating..." : "Adding..."}</span>
            </div>
          ) : (
            <span>{isEditing ? "Update Category" : "Add Category"}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;

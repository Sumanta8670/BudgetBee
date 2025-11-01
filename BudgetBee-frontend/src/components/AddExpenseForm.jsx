import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
      // Reset form after successful submission
      setExpense({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  return (
    <div className="p-2">
      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Track your expenses to maintain better control over your spending and
          identify areas for savings
        </p>
      </div>

      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Source"
        placeholder="e.g., Groceries, Rent, Transportation"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        options={categoryOptions}
        isSelect={true}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (₹)"
        placeholder="e.g., 5000"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-8 pt-4 border-t border-slate-700/50">
        <button
          onClick={handleAddExpense}
          disabled={loading}
          className="add-btn add-btn-fill px-6 py-3"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </div>
          ) : (
            <span>Add Expense</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;

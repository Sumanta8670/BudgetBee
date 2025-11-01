import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
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
    setIncome({ ...income, [key]: value });
  };

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
      // Reset form after successful submission
      setIncome({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: categories.length > 0 ? categories[0].id : "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  return (
    <div className="p-2">
      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Record your income to track your earnings and analyze your financial
          growth over time
        </p>
      </div>

      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeholder="e.g., Salary, Freelance, Bonus"
        type="text"
      />

      <Input
        label="Category"
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        options={categoryOptions}
        isSelect={true}
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount (₹)"
        placeholder="e.g., 50000"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-8 pt-4 border-t border-slate-700/50">
        <button
          onClick={handleAddIncome}
          disabled={loading}
          className="add-btn add-btn-fill px-6 py-3"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </div>
          ) : (
            <span>Add Income</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

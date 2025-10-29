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
    // Removed parameter, use state variable
    setLoading(true);
    try {
      await onAddIncome(income); // Fixed: actually calling the function with income
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

  // Fixed: Set default category only once when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]); // Removed income.categoryId from dependencies

  return (
    <div>
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
        label="Amount"
        placeholder="e.g., 500"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAddIncome} // Fixed: not calling immediately
          disabled={loading}
          className="add-btn add-btn-fill"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>Add Income</>
          )}
        </button>
      </div>
    </div>
  );
};
export default AddIncomeForm;

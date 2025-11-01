import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  isSelect,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="label-animated">{label}</label>
      <div className="relative">
        {isSelect ? (
          <select
            className="input-dark w-full rounded-lg py-3 px-4 text-base transition-all duration-300"
            value={value}
            onChange={(e) => onChange(e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="input-dark w-full rounded-lg py-3 px-4 pr-12 text-base transition-all duration-300"
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors duration-200 focus:outline-none"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

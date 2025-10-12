import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Clear previous error

    // Basic validation
    if (!fullName || !email || !password) {
      setError("All fields are required.");
      setIsLoading(false);

      return;
    }

    if (!fullName.trim()) {
      setError("Full name cannot be empty.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Password cannot be empty.");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email address.");
      setIsLoading(false);
      return;
    }
    setError("");

    // Register api call
    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
      });
      if (response.status === 201) {
        toast.success("Profile created successfully.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/*Background*/}
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings by joining BudgetBee today!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-flex justify-center mb-6">
              {/** Profile Picture */}
            </div>

            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Jhon Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="********"
              type="password"
            />

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <button
              disabled={isLoading}
              className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-sm text-slate-700 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;

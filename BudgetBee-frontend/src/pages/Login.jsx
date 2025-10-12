import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { validateEmail } from "../util/validation.js";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation - Check email FIRST
    if (!email || !email.trim()) {
      setError("Email cannot be empty.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!password || !password.trim()) {
      setError("Password cannot be empty.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    // Login api call
    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      // Check if response is successful (200 or 201)
      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;

        if (token && user) {
          // Save token and user to local storage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // Update context
          setUser(user);

          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          setError("Login response is incomplete. Please try again.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // Server responded with error
        if (error.response.status === 400 || error.response.status === 401) {
          setError(
            error.response.data?.message || "Invalid email or password."
          );
        } else if (error.response.status === 403) {
          setError("Account not activated. Please check your email.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (error.request) {
        // Request made but no response
        setError("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError("An unexpected error occurred.");
      }
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
            Welcome Back to BudgetBee!
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please login to your account to start managing your finances.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Password"
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-sm text-slate-700 text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { validateEmail } from "../util/validation.js";
import { toast } from "react-hot-toast";
import { LoaderCircle, TrendingUp, Shield } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import logo from "../assets/logo.png";
import Menubar from "../components/Menubar.jsx";

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

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;

        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 100);
        } else {
          setError("Login response is incomplete. Please try again.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
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
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
      {/* Menubar at top */}
      <Menubar showSidebar={false} />

      {/* Login Content */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logo}
                  alt="BudgetBee Logo"
                  className="w-14 h-14 logo-glow"
                />
                <h1 className="brand-logo text-4xl">BudgetBee</h1>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Welcome Back to Your
                <span className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Financial Command Center
                </span>
              </h2>

              <p className="text-lg text-slate-400 max-w-md">
                Take control of your finances with intelligent tracking,
                insightful analytics, and seamless expense management.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Smart Analytics
                  </h3>
                  <p className="text-sm text-slate-400">
                    Track spending patterns and get personalized insights
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Secure & Private
                  </h3>
                  <p className="text-sm text-slate-400">
                    Bank-level encryption keeps your data safe
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-slate-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">₹50M+</div>
                <div className="text-sm text-slate-400">Tracked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="glass-card rounded-2xl p-8 lg:p-10">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                <img
                  src={logo}
                  alt="BudgetBee Logo"
                  className="w-12 h-12 logo-glow"
                />
                <h1 className="brand-logo text-2xl">BudgetBee</h1>
              </div>

              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-3">Sign In</h3>
                <p className="text-slate-400">
                  Enter your credentials to access your account and continue
                  managing your finances.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  type="password"
                />

                {error && <div className="error-message">{error}</div>}

                <button
                  disabled={isLoading}
                  className={`btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="animate-spin w-5 h-5" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="flex items-center justify-center gap-1 text-sm pt-4">
                  <span className="text-slate-400">New to BudgetBee?</span>
                  <Link to="/register" className="link-primary font-semibold">
                    Create an account
                  </Link>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    By signing in, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

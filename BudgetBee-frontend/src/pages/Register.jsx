import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import AxiosConfig from "../util/AxiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { toast } from "react-hot-toast";
import { LoaderCircle, CheckCircle2, ArrowRight } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";
import logo from "../assets/logo.png";
import Menubar from "../components/Menubar.jsx";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);

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

    try {
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }
      const response = await AxiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
      <Menubar showSidebar={false} />
      {/* Main Content */}
      {/* <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"> */}
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
                Start Your Journey to
                <span className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Financial Freedom
                </span>
              </h2>

              <p className="text-lg text-slate-400 max-w-md">
                Join thousands of users who have transformed their financial
                lives with BudgetBee's powerful tracking and analytics tools.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-white" size={14} />
                </div>
                <p className="text-slate-300">
                  Real-time expense tracking and categorization
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-white" size={14} />
                </div>
                <p className="text-slate-300">
                  Detailed financial reports and visualizations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-white" size={14} />
                </div>
                <p className="text-slate-300">
                  Secure cloud sync across all your devices
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-white" size={14} />
                </div>
                <p className="text-slate-300">
                  Smart budget recommendations based on spending
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-slate-400">
                  100% Free to start
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-sm text-slate-400">
                  No credit card required
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full">
            <div className="glass-card rounded-2xl p-8 lg:p-10 max-h-[90vh] overflow-y-auto">
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
                <h3 className="text-3xl font-bold text-white mb-3">
                  Create Account
                </h3>
                <p className="text-slate-400">
                  Set up your account in seconds and start taking control of
                  your financial future today.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <ProfilePhotoSelector
                    image={profilePhoto}
                    setImage={setProfilePhoto}
                  />
                </div>

                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder="John Doe"
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
                  placeholder="Create a strong password"
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
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1 text-sm pt-4">
                  <span className="text-slate-400">
                    Already have an account?
                  </span>
                  <Link to="/login" className="link-primary font-semibold">
                    Sign in
                  </Link>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    By creating an account, you agree to our{" "}
                    <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
                      Privacy Policy
                    </span>
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

export default Register;

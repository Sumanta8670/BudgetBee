import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Users,
  CheckCircle2,
  Sparkles,
  Wallet,
  PieChart,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import Menubar from "../components/Menubar.jsx";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23]">
      {/* Navigation - Using Menubar component */}
      <Menubar showSidebar={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="text-purple-400" size={16} />
              <span className="text-sm text-slate-300">
                Your Personal Finance Assistant
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Take Control of Your
              <span className="block mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              BudgetBee helps you track expenses, manage income, and achieve
              your financial goals with intelligent insights and beautiful
              visualizations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="btn-primary px-8 py-4 text-lg font-semibold flex items-center gap-2 group"
              >
                Start Free Today
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="add-btn px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-400" size={16} />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-400" size={16} />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-400" size={16} />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f23]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Manage Money
            </h2>
            <p className="text-xl text-slate-400">
              Powerful features designed to simplify your financial life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 mb-6">
                <TrendingUp className="text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Smart Analytics
              </h3>
              <p className="text-slate-400">
                Visualize your spending patterns with interactive charts and get
                personalized insights to optimize your budget.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30 mb-6">
                <Wallet className="text-green-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Income Tracking
              </h3>
              <p className="text-slate-400">
                Monitor all your income sources in one place with detailed
                categorization and historical tracking.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/30 mb-6">
                <BarChart3 className="text-red-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Expense Management
              </h3>
              <p className="text-slate-400">
                Track every rupee spent with smart categorization and identify
                areas where you can save more.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 mb-6">
                <PieChart className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Visual Reports
              </h3>
              <p className="text-slate-400">
                Beautiful pie charts, line graphs, and dashboards that make
                understanding your finances effortless.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30 mb-6">
                <Shield className="text-yellow-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Bank-Level Security
              </h3>
              <p className="text-slate-400">
                Your financial data is encrypted and secure. We never sell or
                share your information with third parties.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30 mb-6">
                <Zap className="text-pink-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-400">
                Add transactions in seconds with our intuitive interface. No
                complicated forms or endless clicking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="card p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Users className="text-purple-400" size={40} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">10,000+</h3>
                <p className="text-slate-400">Active Users</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="text-green-400" size={40} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">₹50M+</h3>
                <p className="text-slate-400">Money Tracked</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-blue-400" size={40} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">99.9%</h3>
                <p className="text-slate-400">Uptime Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f23]/50">
        <div className="max-w-4xl mx-auto">
          <div className="card p-12 text-center bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of users who have taken control of their financial
              future with BudgetBee
            </p>
            <button
              onClick={() => navigate("/register")}
              className="btn-primary px-10 py-4 text-lg font-semibold inline-flex items-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

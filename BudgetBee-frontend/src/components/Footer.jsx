import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/50 bg-[#0f0f23]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="BudgetBee" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                BudgetBee
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Your trusted companion for smart financial management. Track,
              analyze, and optimize your finances with ease.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50"
              >
                <Facebook
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50"
              >
                <Twitter
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50"
              >
                <Instagram
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50"
              >
                <Linkedin
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50"
              >
                <Github
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                  size={18}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/register")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Features</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate("/income")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Income Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/expense")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Expense Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/category")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/filter")}
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Advanced Filters
                </button>
              </li>
              <li>
                <span className="text-slate-400 text-sm">
                  Analytics & Reports
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  className="text-purple-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a
                    href="mailto:support@budgetbee.com"
                    className="text-sm text-white hover:text-purple-400 transition-colors"
                  >
                    support@budgetbee.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="text-purple-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <a
                    href="tel:+911234567890"
                    className="text-sm text-white hover:text-purple-400 transition-colors"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="text-purple-400 flex-shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <p className="text-sm text-slate-400">Address</p>
                  <p className="text-sm text-white">
                    Sambalpur, Odisha
                    <br />
                    India - 768001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} BudgetBee. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <button className="text-slate-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </button>
              <button className="text-slate-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </button>
              <button className="text-slate-400 hover:text-purple-400 transition-colors">
                Cookie Policy
              </button>
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              Made with{" "}
              <Heart className="text-red-400" size={14} fill="currentColor" />{" "}
              in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

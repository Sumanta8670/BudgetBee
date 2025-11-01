import { useNavigate } from "react-router-dom";
import {
  Target,
  Heart,
  Shield,
  Users,
  Zap,
  Award,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import Menubar from "../components/Menubar.jsx";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23]">
      {/* Navigation - Using Menubar component */}
      <Menubar showSidebar={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              BudgetBee
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Empowering individuals and families to achieve financial freedom
            through intelligent money management and insightful analytics.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f23]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="card p-10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 mb-6">
                <Target className="text-purple-400" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                At BudgetBee, we believe financial wellness should be accessible
                to everyone. Our mission is to democratize personal finance
                management by providing powerful, intuitive tools that help
                people make informed financial decisions and build a secure
                future.
              </p>
            </div>

            <div className="card p-10">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 mb-6">
                <Heart className="text-blue-400" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We envision a world where every individual has the knowledge and
                tools to achieve financial independence. Through technology and
                education, we're building a community of financially empowered
                users who can confidently navigate their economic journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 mx-auto mb-6">
                <Shield className="text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Security First
              </h3>
              <p className="text-slate-400">
                Your financial data is protected with bank-level encryption and
                we never compromise on security.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30 mx-auto mb-6">
                <Users className="text-green-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                User-Centric
              </h3>
              <p className="text-slate-400">
                Every feature is designed with you in mind. We listen to
                feedback and continuously improve.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 mx-auto mb-6">
                <Zap className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-slate-400">
                We leverage cutting-edge technology to provide smart insights
                and seamless experiences.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30 mx-auto mb-6">
                <Award className="text-pink-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-slate-400">
                We strive for excellence in everything we do, from code quality
                to customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f23]/50">
        <div className="max-w-4xl mx-auto">
          <div className="card p-12">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                BudgetBee was born from a simple observation: managing personal
                finances shouldn't be complicated. Our founders, frustrated with
                cluttered spreadsheets and confusing financial apps, set out to
                create something better.
              </p>
              <p>
                What started as a side project in 2023 quickly evolved into a
                comprehensive financial management platform. We combined
                beautiful design with powerful analytics to create an app that
                people actually enjoy using.
              </p>
              <p>
                Today, BudgetBee serves over 10,000 users across India, helping
                them track millions of rupees in transactions and make smarter
                financial decisions every day. But we're just getting started.
              </p>
              <p>
                Our roadmap includes AI-powered insights, budget
                recommendations, bill reminders, and much more. We're committed
                to building the most comprehensive yet simple personal finance
                platform available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose BudgetBee?
            </h2>
            <p className="text-xl text-slate-400">
              Features that make us stand out from the crowd
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "100% free to use with no hidden charges",
              "Bank-level security with encrypted data storage",
              "Beautiful, intuitive interface that's easy to navigate",
              "Real-time insights and analytics on your spending",
              "Multi-category support for better organization",
              "Export and email your financial reports",
              "Advanced filtering and search capabilities",
              "Responsive design works on all devices",
              "Regular updates with new features",
              "Dedicated customer support team",
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 card p-6">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="text-green-400" size={24} />
                </div>
                <p className="text-slate-300 text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f23]/50">
        <div className="max-w-4xl mx-auto">
          <div className="card p-12 text-center bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 mx-auto mb-6">
              <TrendingUp className="text-purple-400" size={40} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Start your journey to financial freedom today. No credit card
              required.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="btn-primary px-10 py-4 text-lg font-semibold"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

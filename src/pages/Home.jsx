import { 
  ArrowRight, 
  TrendingUp, 
  CreditCard, 
  PiggyBank, 
  ChartBar, 
  Shield, 
  UserPlus, 
  Bell,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-white">
      {/* Hero Section */}
      <div className="w-full relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full opacity-10"></div>
        <div className="absolute top-40 -left-32 w-64 h-64 bg-indigo-500 rounded-full opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-28 sm:pt-32 sm:pb-40 relative z-10">
          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-5">
              #1 Personal Finance Solution
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Take Control of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Financial Life</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Manage your income, expenses, and savings with our intuitive 
              financial tracker. Achieve your goals faster with smart insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1 transition-all duration-300">
                Get Started Free <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${
                    ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500'][i]
                  } text-white`}>
                    {['JD', 'MK', 'AS', 'RB'][i]}
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">5,000+</span> happy users
              </p>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              POWERFUL FEATURES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              Everything you need to manage your finances
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive toolkit makes financial management simple and effective
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Income Card */}
            <div className="group rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="bg-blue-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                  <TrendingUp size={30} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Income Tracking</h3>
                <p className="text-gray-600 mb-6">
                  Monitor all your income streams and keep track of your monthly inflows with ease.
                </p>
              </div>
            </div>
            
            {/* Expense Card */}
            <div className="group rounded-2xl overflow-hidden bg-gradient-to-br from-red-50 to-red-100 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="bg-red-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                  <CreditCard size={30} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Expense Tracking</h3>
                <p className="text-gray-600 mb-6">
                  Easily record and categorize your expenses to understand where your money is going.
                </p>
              </div>
            </div>
            
            {/* Savings Card */}
            <div className="group rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="p-8">
                <div className="bg-green-600 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-green-700 transition-colors">
                  <PiggyBank size={30} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Saving Goals</h3>
                <p className="text-gray-600 mb-6">
                  Set savings goals, track your progress, and stay motivated to secure your financial future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="w-full py-20 bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">Why choose our platform?</h2>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">
              Join thousands of users who have transformed their financial lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={24} />, title: "Bank-level Security", desc: "Your financial data is encrypted and secure" },
              { icon: <ChartBar size={24} />, title: "Smart Analytics", desc: "Gain insights with powerful reporting tools" },
              { icon: <Bell size={24} />, title: "Timely Reminders", desc: "Never miss bill payments or budget limits" },
              { icon: <UserPlus size={24} />, title: "Easy to Get Started", desc: "Set up your account in minutes, not hours" }
            ].map((item, index) => (
              <div key={index} className="flex items-start p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                <div className="bg-blue-500 p-3 rounded-lg mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="w-full py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              What our users say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Small Business Owner", quote: "This app completely changed how I manage both my personal and business finances. The insights are invaluable." },
              { name: "Michael Chen", role: "Software Engineer", quote: "I've tried many finance apps, but this one stands out with its intuitive interface and powerful analytics." },
              { name: "Jessica Williams", role: "Graduate Student", quote: "As a student on a tight budget, this tool helps me stay on track and actually save money every month." }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white font-bold ${
                    ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500'][index]
                  }`}>
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-16 md:px-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to take control of your finances?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of users who have improved their financial well-being with our tracker.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300">
                Create Free Account <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-blue-100">
              <div className="flex items-center">
                <CheckCircle size={20} className="mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={20} className="mr-2" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={20} className="mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { TrendingUp, CreditCard, PiggyBank, BarChart, PieChart, Calculator, Calendar, Clock } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <TrendingUp size={48} className="text-blue-500 group-hover:text-white transition-colors duration-300" />,
      title: "Income Tracking",
      description: "Monitor all your income streams and track monthly inflows with ease.",
      color: "from-blue-500 to-blue-600",
      hoverColor: "group-hover:from-blue-600 group-hover:to-blue-700"
    },
    {
      icon: <CreditCard size={48} className="text-red-500 group-hover:text-white transition-colors duration-300" />,
      title: "Expense Tracking",
      description: "Categorize and monitor your spending to understand and control expenses.",
      color: "from-red-500 to-red-600",
      hoverColor: "group-hover:from-red-600 group-hover:to-red-700"
    },
    {
      icon: <PiggyBank size={48} className="text-green-500 group-hover:text-white transition-colors duration-300" />,
      title: "Savings Goals",
      description: "Set savings targets, track progress, and build financial security.",
      color: "from-green-500 to-green-600",
      hoverColor: "group-hover:from-green-600 group-hover:to-green-700"
    },
    {
      icon: <BarChart size={48} className="text-purple-500 group-hover:text-white transition-colors duration-300" />,
      title: "Financial Reports",
      description: "Generate insights and reports to analyze and optimize your finances.",
      color: "from-purple-500 to-purple-600",
      hoverColor: "group-hover:from-purple-600 group-hover:to-purple-700"
    },
    {
      icon: <PieChart size={48} className="text-indigo-500 group-hover:text-white transition-colors duration-300" />,
      title: "Budget Allocation",
      description: "Distribute your income across categories to maintain financial discipline.",
      color: "from-indigo-500 to-indigo-600",
      hoverColor: "group-hover:from-indigo-600 group-hover:to-indigo-700"
    },
    {
      icon: <Calculator size={48} className="text-amber-500 group-hover:text-white transition-colors duration-300" />,
      title: "Financial Planning",
      description: "Plan for future expenses and investments with our powerful calculators.",
      color: "from-amber-500 to-amber-600",
      hoverColor: "group-hover:from-amber-600 group-hover:to-amber-700"
    },
    {
      icon: <Calendar size={48} className="text-teal-500 group-hover:text-white transition-colors duration-300" />,
      title: "Bill Reminders",
      description: "Never miss a payment with automated reminders for upcoming bills.",
      color: "from-teal-500 to-teal-600",
      hoverColor: "group-hover:from-teal-600 group-hover:to-teal-700"
    },
    {
      icon: <Clock size={48} className="text-rose-500 group-hover:text-white transition-colors duration-300" />,
      title: "Historical Trends",
      description: "Analyze your spending and saving patterns over time for better decisions.",
      color: "from-rose-500 to-rose-600",
      hoverColor: "group-hover:from-rose-600 group-hover:to-rose-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            OUR OFFERINGS
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Comprehensive Financial Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the powerful features that help you manage your personal finances 
            effortlessly and achieve your financial goals.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative rounded-2xl overflow-hidden bg-white hover:bg-gradient-to-br hover:from-indigo-500 hover:to-blue-600 transition-all duration-500 shadow-md hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-bl-full"></div>
              
              <div className="p-8">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-4 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-blue-50 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
              
              <div className={`h-1 w-full bg-gradient-to-r ${service.color} transition-all duration-300 ${service.hoverColor}`}></div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
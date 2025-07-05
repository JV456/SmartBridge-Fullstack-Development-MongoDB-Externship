import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import {
  FiBarChart2,
  FiDollarSign,
  FiFilter,
  FiPieChart,
  FiPlusCircle,
  FiTrendingUp,
  FiUserPlus
} from "react-icons/fi";
import { Link } from "react-router-dom";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="font-sans antialiased text-gray-900 overflow-hidden">
      {/* Hero Section - Enhanced gradient and added texture */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-100 to-violet-100 pt-36 pb-28 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-7xl font-extrabold mb-10 tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              Smart Expense Tracking
            </span>
            <br className="hidden lg:block" />
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
              For Modern Life
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-14 leading-relaxed font-light"
          >
            Walleto helps you track, analyze, and optimize your spending with beautiful visuals and powerful insights.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mb-20"
          >
            <Link to="/register" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center text-lg">
              <span>Start Free Trial</span>
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </motion.div>
          <div data-aos="zoom-in" className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-200 ring-opacity-50 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80" 
                alt="Dashboard preview" 
                className="w-full h-auto transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Logos Section - Enhanced with subtle background */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <p data-aos="fade-up" className="text-center text-gray-500 mb-12 font-medium text-lg">Trusted by teams at</p>
          <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap justify-center items-center gap-14 md:gap-20">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="font-bold text-2xl text-gray-800"
            >Google</motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="font-bold text-2xl text-gray-800"
            >Microsoft</motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="font-bold text-2xl text-gray-800"
            >Airbnb</motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="font-bold text-2xl text-gray-800"
            >Uber</motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="font-bold text-2xl text-gray-800"
            >Spotify</motion.span>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with deeper shadows and better spacing */}
      <section id="features" className="py-28 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 data-aos="fade-up" className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Powerful Features</h2>
            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-600 max-w-2xl mx-auto text-xl font-light">
              Everything you need to take control of your finances in one beautiful platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              data-aos="fade-up"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                <FiPieChart className="text-blue-600 text-3xl" />
              </div>
              <h3 className="font-bold text-2xl mb-5 text-gray-800">Visual Analytics</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Beautiful charts and graphs that help you understand your spending patterns at a glance.
              </p>
            </motion.div>
            
            <motion.div 
              data-aos="fade-up" 
              data-aos-delay="100"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8">
                <FiFilter className="text-green-600 text-3xl" />
              </div>
              <h3 className="font-bold text-2xl mb-5 text-gray-800">Smart Filtering</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Powerful filters to slice and dice your transaction data exactly how you need it.
              </p>
            </motion.div>
            
            <motion.div 
              data-aos="fade-up" 
              data-aos-delay="200"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
                <FiTrendingUp className="text-purple-600 text-3xl" />
              </div>
              <h3 className="font-bold text-2xl mb-5 text-gray-800">Budget Forecasting</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Predictive analytics that helps you plan for the future based on your spending habits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced with better proportions */}
      <section id="how-it-works" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 data-aos="fade-up" className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Simple Yet Powerful</h2>
            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-600 max-w-2xl mx-auto text-xl font-light">
              Get set up in minutes and start gaining insights into your finances
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            <div data-aos="fade-right" data-aos-delay="0" className="text-center relative">
              <div className="relative inline-flex mb-10">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-lg"
                >
                  <FiUserPlus className="text-blue-600 text-3xl" />
                </motion.div>
                <div className="absolute -right-2 -top-2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-xl">
                  1
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-5 text-gray-800">Create Account</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Sign up in 30 seconds with just your email. No credit card required.
              </p>
              <div className="absolute top-32 right-0 w-full hidden md:block">
                <svg width="100%" height="2" className="transform translate-x-16">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#3B82F6" strokeWidth="3" strokeDasharray="8 4" />
                  <circle cx="100%" cy="0" r="5" fill="#3B82F6" />
                </svg>
              </div>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="200" className="text-center relative">
              <div className="relative inline-flex mb-10">
                <motion.div 
                  whileHover={{ rotate: -5 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg"
                >
                  <FiPlusCircle className="text-green-600 text-3xl" />
                </motion.div>
                <div className="absolute -right-2 -top-2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-xl">
                  2
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-5 text-gray-800">Add Transactions</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Connect your bank or add transactions manually in seconds.
              </p>
              <div className="absolute top-32 right-0 w-full hidden md:block">
                <svg width="100%" height="2" className="transform translate-x-16">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#10B981" strokeWidth="3" strokeDasharray="8 4" />
                  <circle cx="100%" cy="0" r="5" fill="#10B981" />
                </svg>
              </div>
            </div>
            
            <div data-aos="fade-left" data-aos-delay="400" className="text-center">
              <div className="relative inline-flex mb-10">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center shadow-lg"
                >
                  <FiBarChart2 className="text-purple-600 text-3xl" />
                </motion.div>
                <div className="absolute -right-2 -top-2 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-xl">
                  3
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-5 text-gray-800">Gain Insights</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get actionable insights to optimize your spending and savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with better shadows and styling */}
      <section id="testimonials" className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 data-aos="fade-up" className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Trusted by Thousands</h2>
            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-600 max-w-2xl mx-auto text-xl font-light">
              Join thousands of happy users who have transformed their financial lives
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div 
              data-aos="fade-right"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative"
            >
              <div className="absolute top-6 right-6 text-yellow-400">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full mr-5 flex items-center justify-center font-bold text-blue-600 text-xl">SJ</div>
                <div>
                  <h4 className="font-bold text-2xl">Sarah Johnson</h4>
                  <p className="text-gray-500 text-lg">Financial Analyst</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                "Walleto has completely changed how I manage my personal finances. The visual reports are stunning and the insights have helped me save over $500/month."
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              data-aos="fade-left"
              data-aos-delay="100"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative"
            >
              <div className="absolute top-6 right-6 text-yellow-400">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mr-5 flex items-center justify-center font-bold text-green-600 text-xl">MC</div>
                <div>
                  <h4 className="font-bold text-2xl">Michael Chen</h4>
                  <p className="text-gray-500 text-lg">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                "As a small business owner, Walleto gives me the clarity I need to make smart financial decisions. The budgeting tools are second to none."
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with more dramatic gradients */}
      <section className="py-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute left-0 top-0 h-full opacity-10" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L75 150L150 0Z" fill="white"/>
          </svg>
          <svg className="absolute right-0 bottom-0 h-full opacity-10" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 150L75 0L0 150Z" fill="white"/>
          </svg>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-10"
          >
            Ready to Transform Your Finances?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl mb-14 max-w-2xl mx-auto opacity-90 font-light"
          >
            Join thousands of users who are already saving more and spending smarter.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link to="/register" className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center text-lg">
              <span>Start Free Trial</span>
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced with better spacing and hover effects */}
        <footer className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16">
              <div className="flex items-center mb-10 md:mb-0">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiDollarSign className="text-blue-400 text-4xl mr-3" />
                </motion.div>
                <span className="font-bold text-3xl">Walleto</span>
              </div>
              <div className="flex space-x-8">
                {['About', 'Features', 'Pricing', 'Blog', 'Contact'].map((item, index) => (
                  <motion.a 
                    key={index}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-lg"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-10 max-w-lg text-lg">
                The modern way to track expenses and optimize your financial life.
              </p>
              <p className="text-gray-400 mb-10 text-lg">Made with ❤️ Walleto</p>
            </div>
            <div className="border-t border-gray-800 mt-10 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p>© {new Date().getFullYear()} Walleto. All rights reserved.</p>
              <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
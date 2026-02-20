import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden min-h-[90vh] flex items-center">
      
      {/* 1. Premium Dot Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60 z-0"></div>

      {/* Soft Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[pulse_6s_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-10 pb-16">
          
          {/* Left Side: Content */}
          <div className="text-center lg:text-left">
            
            {/* Since 2016 Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 font-semibold text-sm mb-6 shadow-sm">
              <span className="flex w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Excellence Since 2016
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Make Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Japanese Dream
              </span> <br />
              Come True.
            </h1>
            
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              We are a government-registered educational establishment. Join Kanishka Sameera Sensei to learn Japanese the right way and secure your future in Japan.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 text-white bg-red-600 hover:bg-red-700 rounded-full font-bold shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1">
                Start Your Journey
              </button>
              <button className="px-8 py-4 text-gray-700 bg-white border-2 border-gray-100 hover:border-red-100 hover:bg-red-50 hover:text-red-600 rounded-full font-bold shadow-sm transition-all duration-300">
                Explore Courses
              </button>
            </div>

            {/* 2. Trust Indicators (Social Proof) */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-4">
                {/* Dummy Student Avatars (Oyata passe real ewa danna puluwan) */}
                <img className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" src="https://smjapaneselanguagecenter.com/wp-content/uploads/2024/12/IMG-20241212-WA0054.jpg" alt="Student" />
                <img className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" src="https://smjapaneselanguagecenter.com/wp-content/uploads/2025/08/01-top-order-17.jpg" alt="Student" />
                <img className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" src="https://smjapaneselanguagecenter.com/wp-content/uploads/2025/08/02-mid-order-376.jpg" alt="Student" />
                <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                  +1k
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-400 text-lg">
                  ★★★★★
                </div>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  Trusted by 30000+ Students
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: Floating Image Composition with Smooth Float */}
          <div className="relative mt-12 lg:mt-0 px-4 sm:px-0 lg:ml-10">
            
            {/* Main Image Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white z-10">
              <img 
                src="https://smjapaneselanguagecenter.com/wp-content/uploads/2024/08/Untitled-design-20.png" 
                alt="Japanese Language Class" 
                className="w-full h-[450px] sm:h-[550px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* 3. Refined Floating Stats Card 1 */}
            <div className="absolute -left-6 sm:-left-12 top-20 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 z-20 animate-[pulse_4s_ease-in-out_infinite] border border-gray-50">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600 text-2xl">
                🇯🇵
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">JLPT / NAT</p>
                <p className="font-bold text-gray-900 text-xl">100% Focused</p>
              </div>
            </div>

            {/* Refined Floating Stats Card 2 */}
            <div className="absolute -right-4 sm:-right-8 bottom-20 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 z-20 animate-[pulse_5s_ease-in-out_infinite] border border-gray-50" style={{ animationDelay: '2s' }}>
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-2xl">
                ✈️
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Student Visas</p>
                <p className="font-bold text-gray-900 text-xl">Successful</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
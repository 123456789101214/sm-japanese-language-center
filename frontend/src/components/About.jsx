import React from 'react';

const About = () => {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Image & Experience Badge */}
          <div className="relative">
            {/* Decorative Background Shape (Modern look ekata) */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-100 to-red-50 rounded-[3rem] transform -rotate-3 z-0"></div>
            
{/* Main Image Container - Double Neon Snake Effect */}
          <div className="relative z-10 w-full h-[450px] sm:h-[550px] rounded-[2rem] overflow-hidden p-[4px] shadow-[0_0_40px_rgba(255,0,0,0.2)] transform transition duration-500 hover:scale-[1.02] bg-white">
            
            {/* First Neon Snake */}
            <div className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_70%,#ff0000_90%,#ffffff_100%)] animate-[spin_6s_linear_infinite] blur-[4px]"></div>
            
            {/* Second Neon Snake (Starting from 180 degrees) */}
            {/* මෙතන from_180deg දාපු නිසා මේක අනික් එකට විරුද්ධ පැත්තෙන් පටන් ගන්නවා */}
            <div className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_180deg,transparent_70%,#ff0000_90%,#ffffff_100%)] animate-[spin_3s_linear_infinite] blur-[4px]"></div>
            
            {/* Inner Image Section */}
            <img
              src="https://smjapaneselanguagecenter.com/wp-content/uploads/2024/08/Untitled-design-26.png"
              alt="Kanishka Sameera Sensei at SM Japanese Center"
              className="relative z-20 w-full h-full rounded-[calc(2rem-4px)] object-cover bg-white"
            />
          </div>
            
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 z-20 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50 flex items-center gap-4">
              <div className="text-red-600 flex items-start">
                <span className="text-5xl font-extrabold tracking-tighter">10</span>
                <span className="text-2xl font-bold mt-1">+</span>
              </div>
              <p className="text-sm text-gray-600 font-medium leading-tight">
                Years of <br />
                <span className="text-gray-900 font-bold">Excellence</span>
              </p>
            </div>
          </div>

          {/* Right Side: Text & Stats */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-sm text-red-600 font-bold tracking-widest uppercase mb-3">
              Know More About Us
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              We Make Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Japanese Dream</span> Come True.
            </h3>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our institute is a government-registered educational establishment, proudly led by <strong className="text-gray-900">Kanishka Sameera Sensei</strong>, the owner of the SM IMAGAWA GROUP business group in Japan.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We aim at inspiring our students to dream more, learn more, do more, and become more in their respective journeys of life. We successfully guide many students to Japan, even from overseas.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">30000<span className="text-red-600">+</span></p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Successful Students</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">4</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Branches Worldwide</p>
                <p className="text-xs text-gray-400 mt-1">Sri Lanka & Japan</p>
              </div>
            </div>

            <button className="mt-10 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-full font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center group">
              Read Full Story
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
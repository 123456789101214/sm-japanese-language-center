import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <h4 className="text-2xl font-extrabold text-white leading-tight">
              SM <span className="text-red-500">Japanese</span> <br /> Center
            </h4>
            <p className="text-gray-400 leading-relaxed italic">
              Empowering students through Japanese language and culture since 2016. Your success is our mission.
            </p>
            <div className="flex gap-4">
              {/* Social Icons (Simple Text Placeholder) */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition">Fb</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition">Ig</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition">Yt</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-bold mb-6">Quick Links</h5>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="#about" className="hover:text-red-500 transition">About Us</a></li>
              <li><a href="#courses" className="hover:text-red-500 transition">Our Courses</a></li>
              <li><a href="#gallery" className="hover:text-red-500 transition">Gallery</a></li>
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div>
            <h5 className="text-lg font-bold mb-6">Popular Programs</h5>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition">JLPT N5 Beginner</a></li>
              <li><a href="#" className="hover:text-red-500 transition">JLPT N4 Intermediate</a></li>
              <li><a href="#" className="hover:text-red-500 transition">NAT-TEST Preparation</a></li>
              <li><a href="#" className="hover:text-red-500 transition">JFT-Basic Course</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h5 className="text-lg font-bold mb-6">Subscribe</h5>
            <p className="text-gray-400 mb-4 text-sm">Get the latest news about intake dates and events.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none w-full" />
              <button className="bg-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">Go</button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4 text-center md:text-left">
          <p>© 2026 SM Japanese Center. All Rights Reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Navbar = ({ onEnrollClick }) => {
  // Mobile menu eka open da close da kiyala balaganna state eka
  const [isOpen, setIsOpen] = useState(false);

  // Mobile එකේදී Enroll Button එක එබුවම වෙන දේ
  const handleMobileEnrollClick = () => {
    setIsOpen(false); // 1. ඉස්සෙල්ලාම මෙනු එක වහනවා
    onEnrollClick();  // 2. ඊට පස්සේ Modal එක අරිනවා
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <a href="/#home">
              <img 
                src="https://smjapaneselanguagecenter.com/wp-content/uploads/2024/08/cropped-sm-logo.png" 
                alt="SM Japanese Center Logo" 
                className="h-10 w-auto sm:h-12 md:h-14 transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/#home" className="text-gray-600 hover:text-red-600 font-medium transition duration-300">Home</a>
            <a href="/#about" className="text-gray-600 hover:text-red-600 font-medium transition duration-300">About Us</a>
            <a href="/#courses" className="text-gray-600 hover:text-red-600 font-medium transition duration-300">Courses</a>
            <a href="/#contact" className="text-gray-600 hover:text-red-600 font-medium transition duration-300">Contact Us</a>
            
            <Link to="/batch-gallery" className="text-gray-600 hover:text-red-600 font-medium transition duration-300">Batch Gallery</Link>
            <Link to="/upload-works" className="text-gray-600 hover:text-red-600 font-medium transition duration-300">Upload Works</Link>
            
            <button 
              onClick={onEnrollClick} 
              className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute w-full left-0 bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          <a href="/#home" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200">Home</a>
          <a href="/#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200">About Us</a>
          <a href="/#courses" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200">Courses</a>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200">Contact Us</a>
          
          <Link to="/enrollments" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200">Enrollments</Link>
          <Link to="/upload-works" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition duration-200">Upload Works</Link>
          
          {/* Mobile Enroll Button Updated */}
          <button 
            onClick={handleMobileEnrollClick} 
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full font-bold transition duration-300 shadow-md"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
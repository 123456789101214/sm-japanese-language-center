import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // යූසර් පල්ලෙහාට ස්ක්‍රෝල් කරද්දී බටන් එක පෙන්වන්න
  const toggleVisibility = () => {
    // පික්සෙල් 300ක් පල්ලෙහාට ගියාම බටන් එක මතු වෙනවා
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // බටන් එක එබුවම Smooth විදිහට උඩටම යන්න
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    // Component එක අයින් වෙද්දී event listener එකත් අයින් කරනවා
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-40 p-4 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-700 hover:shadow-red-600/50 transition-all duration-300 transform hover:-translate-y-2 group"
          aria-label="Scroll to top"
        >
          {/* උඩට තියෙන ඊතලය (Arrow Icon) */}
          <svg 
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
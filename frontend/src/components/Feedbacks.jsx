import React from 'react';

const feedbackData = [
  { id: 1, text: "සෙන්සෙයි ගොඩක් ස්තූතියි සෑහෙන්න මහන්සි වෙලා අපිට මේ හැමදේම ඉගැන්නුවට.. තෙරුවන් සරණයි!" },
  { id: 2, text: "පාඨමාලාවට සම්බන්ධ වෙනකොට අකුරක්වත් දැනන් හිටියේ නෑ. දැන් ගොඩක් දේවල් සර් නිසා අපි ඉගෙන ගත්තා. ගොඩක් පිං!" },
  { id: 3, text: "ජපන් යන්න මෙලෝ අදහසක් තිබ්බෙ නෑ සෙන්සෙ මටනම්. සෙන්සෙ කියපු දේවල් වලින් පස්සෙ තමා ජපන් පිස්සුවක් හැදුනෙ." },
  { id: 4, text: "අපිත් සර්ට ගොඩක් ආදරෙයි. අපිට හම්බවුන හොඳම ගුරුවරයා. දවසක අපි සර්ව බලන්න එනවාමයි!" },
  { id: 5, text: "රැයක් දවාලක් නැතුව අපි වෙනුවෙන් මහන්සි වුනා. සෙන්සෙයිගෙන් ජීවිතේට ගොඩක් දේවල් ඉගෙන ගත්තා." },
  { id: 6, text: "මෙතෙක් කල් අපට පියෙක් මෙන් ළඟින් හිඳ ගුරුහරුකම් ලබා දුන්නාට ඔබට බොහොම ස්තූතියි සෙන්සෙයි!" }
];

const Feedbacks = () => {
  // Seamless loop එකක් වෙන්න ලිස්ට් එක duplicate කරනවා
  const duplicatedData = [...feedbackData, ...feedbackData];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Student Feedbacks</h2>
        <h3 className="text-4xl font-extrabold text-gray-900">What Our Students Say</h3>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative flex overflow-hidden">
        {/* Magic scrolling div */}
        <div className="animate-scroll-infinite flex gap-6 px-3">
          {duplicatedData.map((fb, index) => (
            <div 
              key={index}
              className="w-[350px] sm:w-[450px] flex-shrink-0 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="text-red-500 opacity-20 text-5xl font-serif leading-none mb-[-10px]">“</div>
              
              <p className="text-gray-700 text-lg font-medium leading-relaxed mb-6">
                {fb.text}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  SM
                </div>
                <div>
                  <div className="flex text-yellow-400 text-xs mb-1">
                    ★★★★★
                  </div>
                  <span className="text-gray-900 font-bold text-sm">Verified Student</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shadow Overlays (දෙපැත්තෙන් ලාවට මැකී යන ගතිය - Fade Effect) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
      </div>
    </section>
  );
};

export default Feedbacks;
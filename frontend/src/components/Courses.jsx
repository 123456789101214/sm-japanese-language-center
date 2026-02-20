import React from 'react';

// Courses data tika api wenama array ekaka thiyagannawa (meka passe backend eken ganna puluwan)
const courseData = [
  {
    id: 1,
    title: 'JLPT N5',
    level: 'Beginner',
    desc: 'The foundational level of Japanese. Master basic grammar, Kanji, and daily conversations.',
    duration: '6 Months',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 2,
    title: 'JLPT N4',
    level: 'Intermediate',
    desc: 'Take your Japanese to the next level. Essential for higher studies and communication.',
    duration: '6 Months',
    badgeColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 3,
    title: 'NAT-TEST 5Q',
    level: 'Beginner',
    desc: 'Equivalent to JLPT N5. Highly recognized for student visa applications in Japan.',
    duration: '6 Months',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    id: 4,
    title: 'NAT-TEST 4Q',
    level: 'Intermediate',
    desc: 'Equivalent to JLPT N4. Boost your chances for part-time jobs and better opportunities.',
    duration: '6 Months',
    badgeColor: 'bg-teal-100 text-teal-700',
  },
  {
    id: 5,
    title: 'JFT-Basic',
    level: 'Practical',
    desc: 'Specifically designed for Specified Skilled Worker (SSW) visas. Focuses on practical usage.',
    duration: '3-6 Months',
    badgeColor: 'bg-purple-100 text-purple-700',
  }
];

const Courses = () => {
  return (
    <section className="py-20 bg-gray-50" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Our Programs</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Learning Path
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Comprehensive Japanese language courses designed to help you achieve your goals, whether for higher studies or working in Japan.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>

              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${course.badgeColor}`}>
                  {course.level}
                </span>
              </div>
              
              <p className="text-gray-600 flex-grow mb-6 line-clamp-3">
                {course.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {course.duration}
                </div>
                
                <button className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center group">
                  Enroll Now
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Courses;
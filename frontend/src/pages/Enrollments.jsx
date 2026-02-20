import React, { useState } from 'react';
import { enrollmentsData } from '../data/enrollmentsData';

const Enrollments = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const openBatch = (batch) => {
    setSelectedBatch(batch);
    setVisibleCount(12);
    document.body.style.overflow = 'hidden';
  };

  const closeBatch = () => {
    setSelectedBatch(null);
    document.body.style.overflow = 'auto';
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Our Students</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">Student Enrollments</h3>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Memories and moments from our previous and current batches.
          </p>
        </div>

        {/* Batch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {enrollmentsData.map((batch) => (
            <div 
              key={batch.id} 
              className="group cursor-pointer bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
              onClick={() => openBatch(batch)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={batch.coverImage} 
                  alt={batch.title} 
                  className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{batch.title}</h4>
                <p className="text-gray-500 text-sm mb-6 flex-grow">{batch.description}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-bold text-gray-400">{batch.images.length} Photos</span>
                  <button className="text-red-600 font-bold flex items-center group-hover:translate-x-2 transition-transform">
                    View Batch <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal (Same logic as Gallery) */}
      {selectedBatch && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto pt-20 pb-10 px-4">
          <div className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-sm z-[110] px-6 py-4 flex justify-between items-center border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedBatch.title}</h2>
              <p className="text-gray-400 text-xs">{selectedBatch.images.length} Photos total</p>
            </div>
            <button 
              onClick={closeBatch}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 transition"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedBatch.images.slice(0, visibleCount).map((img, index) => (
                <div key={index} className="aspect-square rounded-2xl overflow-hidden bg-gray-900 group">
                  <img src={img} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy"/>
                </div>
              ))}
            </div>

            {visibleCount < selectedBatch.images.length && (
              <div className="text-center mt-12 pb-10">
                <button onClick={handleLoadMore} className="px-10 py-4 bg-white text-black rounded-full font-bold shadow-lg hover:bg-red-600 hover:text-white transition duration-300">
                  Load More Photos
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollments;
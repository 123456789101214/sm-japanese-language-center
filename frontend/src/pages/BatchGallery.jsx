import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Users, Image as ImageIcon, X, ArrowRight } from 'lucide-react';

const BatchGallery = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // 1. Supabase එකෙන් දත්ත ලබා ගැනීම
  useEffect(() => {
    fetchBatches();
  }, []);

const fetchBatches = async () => {
    setLoading(true); // Loading පටන් ගන්නවා
    try {
      const { data, error } = await supabase
        .from('batch_students')
        .select('*')
        .eq('is_deleted', false) // 👈 මේක අනිවාර්යයෙන්ම ඕනේ
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error:', error.message);
      } else if (data) {
        // Grouping logic
        const grouped = data.reduce((acc, student) => {
          const key = student.batch_name;
          if (!acc[key]) {
            acc[key] = {
              title: key,
              students: [],
              coverImage: "/images/batch-default.jpg" 
            };
          }
          acc[key].students.push(student);
          return acc;
        }, {});
        
        setBatches(Object.values(grouped));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false); // සාර්ථක වුණත්, නැතත් loading එක නතර කරනවා
    }
  };

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
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-black tracking-[0.2em] uppercase text-xs mb-3 block">Gallery & Archives</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">Student Enrollments</h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Memories and moments from our previous and current batches.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-red-600 font-bold animate-pulse">Loading Batches...</div>
        ) : (
          /* Batch Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {batches.map((batch, index) => (
              <div 
                key={index} 
                className="group cursor-pointer bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
                onClick={() => openBatch(batch)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={batch.coverImage} 
                    alt={batch.title} 
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-red-600 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Official Batch</span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{batch.title}</h4>
                  <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                    Collection of students successfully completed their Japanese language journey in this batch.
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                      <Users size={18} />
                      <span>{batch.students.length} Students</span>
                    </div>
                    <button className="text-red-600 font-black text-sm flex items-center group-hover:gap-3 transition-all">
                      View Students <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 w-full bg-white/80 backdrop-blur-xl z-[110] px-6 py-6 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-4">
               <div className="bg-red-600 p-2 rounded-xl text-white">
                  <ImageIcon size={20} />
               </div>
               <div>
                  <h2 className="text-xl font-black text-gray-900">{selectedBatch.title}</h2>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{selectedBatch.students.length} Registered Students</p>
               </div>
            </div>
            <button 
              onClick={closeBatch}
              className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-red-600 hover:text-white transition-all transform active:scale-90"
            >
              <X size={24} />
            </button>
          </div>

          <div className="max-w-7xl mx-auto p-8 pt-12">
            {/* Student Grid Inside Modal */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {selectedBatch.students.slice(0, visibleCount).map((student, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-all border-4 border-white">
                    <img 
                      src={student.image_url} 
                      alt={student.full_name} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-sm font-black text-gray-900 leading-tight mb-1">{student.full_name}</div>
                    <div className="text-[10px] font-black text-red-600 bg-red-50 inline-block px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {student.reg_no}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < selectedBatch.students.length && (
              <div className="text-center mt-16 pb-10">
                <button onClick={handleLoadMore} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:bg-red-600 transition-all transform hover:-translate-y-1">
                  Load More Students
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchGallery;
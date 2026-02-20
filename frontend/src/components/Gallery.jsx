import React, { useState } from 'react';
// data ෆෝල්ඩර් එකෙන් ඇල්බම් ඩේටා ටික ගෙන්න ගන්නවා
import { albumData } from '../data/galleryData';

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // පින්තූර කීයක් මුලින් පෙන්වනවද කියලා

  // ඇල්බම් එකක් ඕපන් කරන ෆන්ක්ෂන් එක
  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setVisibleCount(12); // ඇල්බම් එක මාරු කරනකොට ආයේ මුල ඉඳන් 12ක් පෙන්වන්න
    document.body.style.overflow = 'hidden'; // ඇල්බම් එක ඕපන් වෙලා තියෙද්දී පිටිපස්සේ සයිට් එක ස්ක්‍රෝල් වෙන්න එපා
  };

  // ඇල්බම් එක වහන ෆන්ක්ෂන් එක
  const closeAlbum = () => {
    setSelectedAlbum(null);
    document.body.style.overflow = 'auto'; // ආයේ ස්ක්‍රෝල් කරන්න පුළුවන් වෙන්න
  };

  // තව පින්තූර පෙන්වන්න (Load More)
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Our Moments</h2>
          <h3 className="text-4xl font-extrabold text-gray-900">Life at SM Japanese Center</h3>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {albumData.map((album) => (
            // මුළු කාඩ් එකම Click කරන්න පුළුවන් විදිහට onClick එක මෙතනට දැම්මා
            <div 
              key={album.id} 
              className="group cursor-pointer relative overflow-hidden rounded-[2.5rem] shadow-xl aspect-[4/5] bg-gray-200"
              onClick={() => openAlbum(album)}
            >
              {/* Cover Image */}
              <img 
                src={album.coverImage} 
                alt={album.title} 
                className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
              />
              {/* Black Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <h4 className="text-2xl font-bold text-white mb-2">{album.title}</h4>
                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {album.description}
                </p>
                
                {/* --- UPDATE: කලින් තිබ්බ ලස්සන Button එක ආපහු දැම්මා --- */}
                {/* මුළු කාඩ් එකම click වෙන නිසා මේ බටන් එකට වෙනම onClick එකක් ඕනේ නෑ, මේක ලස්සනට විතරයි */}
                <button className="w-fit px-8 py-3 bg-red-600 text-white rounded-full font-bold text-sm shadow-lg transform transition-all duration-300 hover:bg-red-700 hover:-translate-y-1 hover:shadow-red-600/40">
                  View Album
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Fullscreen Lightbox Modal --- */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto pt-20 pb-10 px-4">
          
          {/* Top Bar (Title & Close) */}
          <div className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-sm z-[110] px-6 py-4 flex justify-between items-center border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedAlbum.title}</h2>
              <p className="text-gray-400 text-xs">{selectedAlbum.images.length} Photos total</p>
            </div>
            <button 
              onClick={closeAlbum}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 transition"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Image Sub-Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedAlbum.images.slice(0, visibleCount).map((img, index) => (
                <div key={index} className="aspect-square rounded-2xl overflow-hidden bg-gray-900 group">
                  <img 
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < selectedAlbum.images.length && (
              <div className="text-center mt-12 pb-10">
                <button 
                  onClick={handleLoadMore}
                  className="px-10 py-4 bg-white text-black rounded-full font-bold shadow-lg hover:bg-red-600 hover:text-white transition duration-300"
                >
                  Load More Photos
                </button>
              </div>
            )}
            
            {/* If all photos loaded */}
            {visibleCount >= selectedAlbum.images.length && (
              <p className="text-center text-gray-500 mt-10 italic">You've reached the end of the album.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
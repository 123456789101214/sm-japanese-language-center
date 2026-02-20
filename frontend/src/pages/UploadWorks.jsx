import React, { useState } from 'react';

const UploadWorks = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12">
        
        <div className="text-center mb-10">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Student Portal</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Upload Your Work</h3>
          <p className="mt-3 text-gray-500">Submit your assignments, homework, and practice sheets here.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Student Name</label>
              <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="Saman Kumara" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Registration No.</label>
              <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="SM-2026-XXXX" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Select Batch / Course</label>
            <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition">
              <option>JLPT N5 - 2026 Intake</option>
              <option>JLPT N4 - 2026 Intake</option>
              <option>NAT 5Q - Weekend Batch</option>
            </select>
          </div>

          {/* Custom File Upload Area */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Upload File (PDF/Image)</label>
            <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 border-dashed rounded-2xl hover:border-red-500 hover:bg-red-50 transition-colors relative group">
              <div className="space-y-2 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-red-500 transition" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                {file && <p className="text-sm font-bold text-green-600 mt-2">Selected: {file.name}</p>}
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 hover:shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1">
            Submit Homework
          </button>
        </form>

      </div>
    </div>
  );
};

export default UploadWorks;
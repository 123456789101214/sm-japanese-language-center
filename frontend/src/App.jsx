import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; 
// අලුත් Button Component එක Import කරගත්තා
import ScrollToTopButton from './components/ScrollToTopButton';
import AIChatBot from './components/AIChatBot'; // AI Chat Bot Component එක Import කරගත්තා 

// Pages
import Home from './pages/Home';
import UploadWorks from './pages/UploadWorks';
import Enrollments from './pages/Enrollments'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <div className="min-h-screen font-sans bg-white selection:bg-red-100 selection:text-red-600 relative">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enrollments" element={<Enrollments />} /> 
          <Route path="/upload-works" element={<UploadWorks />} />
        </Routes>
        
        
        
        <Footer />
        <AIChatBot />
        {/* මුළු සයිට් එකටම අදාළව Arrow Button එක මෙතන දැම්මා */}
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
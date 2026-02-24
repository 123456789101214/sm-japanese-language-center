import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; 
import ScrollToTopButton from './components/ScrollToTopButton';
import EnrollmentForm from './components/EnrollmentForm';
import AIChatBot from './components/AIChatBot'; 
import AdminHeader from './components/AdminHeader';

// Pages
import Home from './pages/Home';
import UploadWorks from './pages/UploadWorks';
import BatchGallery from './pages/BatchGallery'; 
import BatchMaintenance from './pages/BatchMaintenance';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import HomeworkManager from './pages/HomeworkManager';

function App() {
  // Modal එක පාලනය කරන State එක
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      
      <div className="min-h-screen font-sans bg-white selection:bg-red-100 selection:text-red-600 relative">
        
        {/* 1. AdminHeader එක Routes වලින් පිටත තැබීම (නිවැරදි තැන) */}
        <AdminHeader />
        
        {/* 2. Navbar එක Prop එකත් එක්ක */}
        <Navbar onEnrollClick={() => setIsModalOpen(true)} />
        
        {/* 3. Routes ඇතුළේ තිබිය හැක්කේ Route ටැග්ස් පමණි */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/batch-gallery" element={<BatchGallery />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/maintenance" element={<BatchMaintenance />} /> 
          <Route path="/upload-works" element={<UploadWorks />} />
          <Route path="/admin/homework" element={<HomeworkManager />} />
        </Routes>
        
        <Footer />

        {/* Enrollment Form එක (Modal) */}
        <EnrollmentForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <AIChatBot />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';

const AdminHeader = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Session එක තියෙනවාද කියලා බලනවා
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Login/Logout වෙනස් වීම් අල්ලගන්නවා
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ඇඩ්මින් ලොග් වෙලා නැත්නම් හෝ දැනටමත් Dashboard එකේ නම් මේක පෙන්වන්නේ නැහැ
  if (!session || location.pathname === '/admin-dashboard') return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] w-fit">
      <button 
        onClick={() => navigate('/admin-dashboard')}
        className="flex items-center gap-2 bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-red-600 transition-all border border-white/10 group"
      >
        <LayoutDashboard size={18} className="group-hover:rotate-12 transition-transform" />
        <span>Back to Admin Dashboard</span>
        <ArrowLeft size={16} className="ml-2 opacity-50" />
      </button>
    </div>
  );
};

export default AdminHeader;
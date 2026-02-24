import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // ෆයිල් එක තියෙන තැන අනුව path එක පොඩ්ඩක් බලන්න
const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            alert("Login Failed: " + error.message);
        } else {
            navigate('/admin-dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sensei Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-xl outline-none border border-gray-100 focus:border-red-500" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-xl outline-none border border-gray-100 focus:border-red-500" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 transition">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
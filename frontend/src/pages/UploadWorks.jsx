import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { UploadCloud, FileText, User, Hash, Mail, Send, Users } from 'lucide-react';
import Swal from 'sweetalert2';

const UploadWorks = () => {
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [email, setEmail] = useState('');
    const [batch, setBatch] = useState('January Batch');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return Swal.fire('Error', 'කරුණාකර ෆයිල් එකක් තෝරන්න', 'error');

        setLoading(true);
        try {
            // 1. ෆයිල් එක Storage (homework-files) එකට Upload කිරීම
            const fileExt = file.name.split('.').pop();
            const fileName = `${regNo}-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('homework-files')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. ෆයිල් එකේ Public URL එක ලබා ගැනීම
            const { data: urlData } = supabase.storage.from('homework-files').getPublicUrl(fileName);
            const fileUrl = urlData.publicUrl;

            // 3. සියලුම දත්ත Database එකට ඇතුළත් කිරීම
            const { error: dbError } = await supabase
                .from('homework_submissions')
                .insert([{
                    student_name: name,
                    reg_no: regNo,
                    email: email,
                    batch_name: batch,
                    homework_title: title,
                    file_url: fileUrl
                }]);

            if (dbError) throw dbError;

            Swal.fire({
                title: 'Done!',
                text: 'Homework submitted successfully!',
                icon: 'success',
                confirmButtonColor: '#ef4444'
            });

            // Form එක පිරිසිදු කිරීම
            setName(''); setRegNo(''); setEmail(''); setTitle(''); setFile(null);
            e.target.reset();

        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-3">Homework Submission</h1>
                    <p className="text-gray-500 font-medium">ඔබේ ගෙදර වැඩ විධිමත්ව මෙතැනින් ඉදිරිපත් කරන්න.</p>
                </div>

                <form onSubmit={handleUpload} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-black text-gray-700 ml-1"><User size={16}/> Full Name</label>
                            <input type="text" placeholder="Enter your full name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        {/* Register Number Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-black text-gray-700 ml-1"><Hash size={16}/> Register Number</label>
                            <input type="text" placeholder="10001-J" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-black text-gray-700 ml-1"><Mail size={16}/> Email Address</label>
                            <input type="email" placeholder="example@mail.com" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        {/* Batch Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-black text-gray-700 ml-1"><Users size={16}/> Select Batch</label>
                            <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-gray-600" value={batch} onChange={(e) => setBatch(e.target.value)}>
                                <option value="January Batch">January Batch</option>
                                <option value="February Batch">February Batch</option>
                                <option value="March Batch">March Batch</option>
                            </select>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-black text-gray-700 ml-1"><FileText size={16}/> Homework Title</label>
                        <input type="text" placeholder="Minna no Nihongo - Lesson 10" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    {/* File Upload Box */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-black text-gray-700 ml-1"><UploadCloud size={16}/> Homework File (PDF or Image)</label>
                        <div className="relative group h-32">
                            <input 
                                type="file" 
                                accept=".pdf,image/*" 
                                onChange={(e) => setFile(e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center group-hover:border-red-400 group-hover:bg-red-50/30 transition-all">
                                {file ? (
                                    <span className="text-red-600 font-bold px-4 truncate max-w-full">{file.name}</span>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-gray-400 font-medium">Click to upload homework file</p>
                                        <p className="text-[10px] text-gray-300 uppercase font-black">PDF, JPG, PNG only</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gray-900 text-white p-5 rounded-[1.5rem] font-black shadow-xl hover:bg-red-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : <><Send size={20}/> Submit Homework</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadWorks;
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
    Search, Filter, FileText, Download, CheckCircle, 
    Clock, AlertCircle, Trash2, User, Mail, Hash, Calendar 
} from 'lucide-react';
import Swal from 'sweetalert2';

const HomeworkManager = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBatch, setFilterBatch] = useState('All');

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('homework_submissions')
            .select('*')
            .eq('is_deleted', false)
            .order('created_at', { ascending: false });

        if (!error) {
            setSubmissions(data);
            setFilteredData(data);
        }
        setLoading(false);
    };

    // 🔍 Search සහ Filter Logic
    useEffect(() => {
        let results = submissions.filter(s => 
            (s.student_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             s.reg_no.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterBatch === 'All' || s.batch_name === filterBatch)
        );
        setFilteredData(results);
    }, [searchTerm, filterBatch, submissions]);

    // ✅ Status එක Update කිරීම (Pending -> Checked -> Redo)
    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase
            .from('homework_submissions')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            Swal.fire('Updated!', `Status changed to ${newStatus}`, 'success');
            fetchSubmissions();
        }
    };

    // 🗑️ Soft Delete
    const deleteSubmission = async (id, name) => {
        const result = await Swal.fire({
            title: 'ඉවත් කරනවාද?',
            text: `${name} ගේ මෙම homework එක dashboard එකෙන් ඉවත් කරමුද?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'ඔව්, ඉවත් කරන්න'
        });

        if (result.isConfirmed) {
            await supabase.from('homework_submissions').update({ is_deleted: true }).eq('id', id);
            fetchSubmissions();
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Homework Management</h1>
                        <p className="text-gray-500 font-medium">Manage and review student homework submissions.</p>
                    </div>
                    
                    {/* Stats Summary */}
                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <Clock className="text-orange-500" size={20} />
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Pending</p>
                                <p className="text-lg font-black text-gray-900">{submissions.filter(s => s.status === 'Pending').length}</p>
                            </div>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={20} />
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Checked</p>
                                <p className="text-lg font-black text-gray-900">{submissions.filter(s => s.status === 'Checked').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name or reg no..." 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="p-3 bg-gray-50 rounded-2xl outline-none border-none font-bold text-gray-600 min-w-[200px]"
                        value={filterBatch}
                        onChange={(e) => setFilterBatch(e.target.value)}
                    >
                        <option value="All">All Batches</option>
                        <option value="January Batch">January Batch</option>
                        <option value="February Batch">February Batch</option>
                        <option value="March Batch">March Batch</option>
                    </select>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest">Student Info</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest">Homework Detail</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest text-center">Status</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan="4" className="py-20 text-center font-bold text-gray-400 animate-pulse">Loading Submissions...</td></tr>
                                ) : filteredData.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black">
                                                    {s.student_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{s.student_name}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{s.reg_no} • {s.batch_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-gray-700">{s.homework_title}</p>
                                            <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Calendar size={12}/> {new Date(s.created_at).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <select 
                                                value={s.status} 
                                                onChange={(e) => updateStatus(s.id, e.target.value)}
                                                className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border-none outline-none cursor-pointer
                                                    ${s.status === 'Checked' ? 'bg-green-100 text-green-600' : 
                                                      s.status === 'Redo' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Checked">Checked</option>
                                                <option value="Redo">Redo</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <a 
                                                    href={s.file_url} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                    title="View Homework"
                                                >
                                                    <Download size={18} />
                                                </a>
                                                <button 
                                                    onClick={() => deleteSubmission(s.id, s.student_name)}
                                                    className="p-3 bg-gray-50 text-gray-400 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeworkManager;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Swal from 'sweetalert2';
// සියලුම අවශ්‍ය Icons එකවර import කරගන්නවා
import {
    LogOut, RefreshCw, Phone, Search, Filter,
    User, Mail, Trash2, Calendar, CheckCircle, Clock, 
    GraduationCap, ClipboardList, ArrowRight, Image as ImageIcon
} from 'lucide-react';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [courseFilter, setCourseFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) navigate('/admin');
            else fetchStudents();
        };
        checkUser();
    }, [navigate]);

    const fetchStudents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('enrollments')
            .select('*')
            .eq('is_deleted', false)
            .order('created_at', { ascending: false });

        if (error) console.error('Error:', error);
        else {
            setStudents(data);
            setFilteredStudents(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        let results = students.filter(student =>
            student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.phone_number.includes(searchTerm)
        );
        if (courseFilter !== 'All') results = results.filter(s => s.course === courseFilter);
        setFilteredStudents(results);
    }, [searchTerm, courseFilter, students]);

    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase.from('enrollments').update({ status: newStatus }).eq('id', id);
        if (!error) fetchStudents();
    };

    const deleteStudent = async (id, name) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `${name} 's details will be hidden from the dashboard.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            const { error } = await supabase
                .from('enrollments')
                .update({ is_deleted: true })
                .eq('id', id);

            if (error) {
                Swal.fire('Error', 'Failed to remove student', 'error');
            } else {
                Swal.fire('Removed!', 'Student hidden successfully.', 'success');
                fetchStudents();
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="bg-red-600 p-4 rounded-[1.5rem] text-white shadow-2xl shadow-red-200">
                            <GraduationCap size={35} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sensei Dashboard</h1>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">SM Japanese Language Center</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <button onClick={fetchStudents} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-gray-600" title="Refresh Data">
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button 
                            onClick={() => supabase.auth.signOut().then(() => navigate('/admin'))} 
                            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-black hover:bg-red-600 transition-all shadow-lg"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* --- QUICK ACTION CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    
                    {/* 📚 View Homeworks Card */}
                    <button 
                        onClick={() => navigate('/admin/homework')}
                        className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-5 text-left"
                    >
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-[1.5rem] flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-inner">
                            <ClipboardList size={30} />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">View Homeworks</h3>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Check Student Submissions</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </button>

                    {/* 🖼️ Manage Batch Gallery Card */}
                    <button 
                        onClick={() => navigate('/admin/maintenance')}
                        className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-5 text-left"
                    >
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">
                            <ImageIcon size={30} />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-black text-gray-900 group-hover:text-red-600 transition-colors">Batch Gallery</h3>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Update Student Photos</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-red-50 group-hover:text-red-600 transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </button>

                    {/* 📊 Total Students Stats Card */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                            <User size={30} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Active Enrollments</p>
                            <h3 className="text-3xl font-black text-gray-900">{students.length}</h3>
                        </div>
                    </div>
                </div>

                {/* --- FILTERS SECTION --- */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by student name or phone..."
                            className="w-full pl-14 pr-6 py-5 bg-white rounded-[1.5rem] border-none shadow-sm focus:ring-2 focus:ring-red-500 transition outline-none text-gray-700 font-bold"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            className="pl-14 pr-12 py-5 bg-white rounded-[1.5rem] border-none shadow-sm outline-none font-black text-gray-600 appearance-none cursor-pointer focus:ring-2 focus:ring-red-500 min-w-[200px]"
                            onChange={(e) => setCourseFilter(e.target.value)}
                        >
                            <option value="All">All Courses</option>
                            <option value="N5">JLPT N5</option>
                            <option value="N4">JLPT N4</option>
                            <option value="N3">JLPT N3</option>
                        </select>
                    </div>
                </div>

                {/* --- MAIN ENROLLMENTS TABLE --- */}
                <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/40 overflow-hidden border border-gray-50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-10 py-7 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Student Details</th>
                                    <th className="px-10 py-7 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Contact</th>
                                    <th className="px-10 py-7 text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-center">Status</th>
                                    <th className="px-10 py-7 text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-red-50/10 transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 font-black text-lg">
                                                    {student.full_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 text-lg leading-tight">{student.full_name}</div>
                                                    <div className="inline-block bg-red-50 text-red-600 text-[10px] font-black mt-2 px-3 py-1 rounded-lg uppercase tracking-wider">{student.course}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-sm font-black text-gray-700">
                                                    <Phone size={14} className="text-gray-300" /> {student.phone_number}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                    <Mail size={14} className="text-gray-300" /> {student.email || 'No Email'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <select
                                                value={student.status || 'Pending'}
                                                onChange={(e) => updateStatus(student.id, e.target.value)}
                                                className={`mx-auto px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-none shadow-sm cursor-pointer focus:ring-0 transition-all
                                                    ${student.status === 'Called' ? 'bg-blue-100 text-blue-600' :
                                                      student.status === 'Enrolled' ? 'bg-green-100 text-green-600' :
                                                      'bg-yellow-100 text-yellow-600'}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Called">Called</option>
                                                <option value="Enrolled">Enrolled</option>
                                            </select>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center justify-center gap-3">
                                                <a
                                                    href={`tel:${student.phone_number}`}
                                                    className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 group shadow-sm"
                                                    title="Call Student"
                                                >
                                                    <Phone size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                                                </a>
                                                <button
                                                    onClick={() => deleteStudent(student.id, student.full_name)}
                                                    className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 group shadow-sm"
                                                    title="Remove Student"
                                                >
                                                    <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-10 py-20 text-center text-gray-400 font-bold">No students found matching your search.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
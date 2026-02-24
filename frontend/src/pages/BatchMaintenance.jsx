import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Camera, UserPlus, Hash, Calendar, ArrowLeft, Trash2, User } from 'lucide-react';
import Swal from 'sweetalert2';

const BatchMaintenance = () => {
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [batch, setBatch] = useState('January Batch');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]); // දැනට ඉන්න ළමයි ලැයිස්තුව
    
    const navigate = useNavigate();

    // 1. පේජ් එක ලෝඩ් වෙද්දී දැනට ඉන්න ළමයි ටික ගන්නවා
    useEffect(() => {
        fetchGalleryStudents();
    }, []);

    const fetchGalleryStudents = async () => {
        const { data, error } = await supabase
            .from('batch_students')
            .select('*')
            .eq('is_deleted', false) // අයින් කරපු අය ගන්නේ නැහැ
            .order('created_at', { ascending: false });

        if (!error) setStudents(data);
    };

    // 2. ශිෂ්‍යයෙක්ව "Soft Delete" කිරීම
    const deleteStudent = async (id, studentName) => {
        const result = await Swal.fire({
            title: 'Are you sure to delete?',
            text: `${studentName} s details will be removed permanently.'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            const { error } = await supabase
                .from('batch_students')
                .update({ is_deleted: true }) // දත්ත මකන්නේ නැහැ, status එක විතරක් වෙනස් කරනවා
                .eq('id', id);

            if (error) {
                Swal.fire('Error', 'not deleted', 'error');
            } else {
                Swal.fire('Removed!', 'deleted successfully', 'success');
                fetchGalleryStudents(); // ලැයිස්තුව Refresh කරනවා
            }
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return Swal.fire('Error', 'Please select a image file', 'error');

        setLoading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${regNo}-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('student-gallery')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('student-gallery').getPublicUrl(fileName);
            const imageUrl = data.publicUrl;

            const { error: dbError } = await supabase
                .from('batch_students')
                .insert([{
                    reg_no: regNo,
                    full_name: name,
                    batch_name: batch,
                    image_url: imageUrl
                }]);

            if (dbError) throw dbError;

            Swal.fire('Success!', 'Student added to gallery successfully!', 'success');
            setName(''); setRegNo(''); setFile(null);
            fetchGalleryStudents(); // අලුත් කෙනා ඇඩ් වුණාම ලිස්ට් එක Refresh කරනවා
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* වම් පැත්ත: Form එක */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 h-fit">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-gray-900">Add to Gallery</h2>
                            <p className="text-gray-500 font-medium text-sm">Add a new student to the gallery</p>
                        </div>
                        <form onSubmit={handleUpload} className="space-y-5">
                            <input type="text" placeholder="Registration No" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
                            <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500" value={name} onChange={(e) => setName(e.target.value)} required />
                            <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-gray-600" value={batch} onChange={(e) => setBatch(e.target.value)}>
                                <option value="January Batch">January Batch</option>
                                <option value="February Batch">February Batch</option>
                                <option value="March Batch">March Batch</option>
                            </select>
                            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-5 rounded-2xl font-black shadow-lg hover:bg-red-700 transition disabled:opacity-50">
                                {loading ? 'Uploading...' : 'Save Student'}
                            </button>
                        </form>
                    </div>

                    {/* දකුණු පැත්ත: දැනට ඉන්න ළමයි ලිස්ට් එක */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <h3 className="text-xl font-black text-gray-900 mb-6">Current Gallery ({students.length})</h3>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {students.map((s) => (
                                <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-red-50 transition">
                                    <div className="flex items-center gap-4">
                                        <img src={s.image_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{s.full_name}</div>
                                            <div className="text-[10px] font-black text-red-600 uppercase tracking-widest">{s.batch_name}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteStudent(s.id, s.full_name)} className="p-2 text-gray-400 hover:text-red-600 transition">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                            {students.length === 0 && <p className="text-center text-gray-400 py-10">No students added yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatchMaintenance;
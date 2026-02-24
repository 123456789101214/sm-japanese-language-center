import { useState } from 'react';
import Swal from 'sweetalert2';
import { supabase } from '../supabaseClient'; // ෆයිල් එක තියෙන තැන අනුව path එක පොඩ්ඩක් බලන්න

const EnrollmentForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: 'N5' });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
        .from('enrollments')
        .insert([{ 
            full_name: formData.name, 
            phone_number: formData.phone, 
            email: formData.email, 
            course: formData.course 
        }]);

    if (error) {
        // ❌ Error Alert එක
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: `Error: ${error.message}`,
            confirmButtonColor: '#dc2626' // Red color
        });
    } else {
        // ✅ Success Alert එක (Premium Look)
        Swal.fire({
            title: 'Success!',
            text: 'Student enrolled successfully! We will contact you soon.',
            icon: 'success',
            iconColor: '#dc2626',
            confirmButtonText: 'Great!',
            confirmButtonColor: '#dc2626',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

        setFormData({ name: '', phone: '', email: '', course: 'N5' });
        onClose(); 
    }
    setLoading(false);
};

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-red-600 p-6 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Student Enrollment</h2>
                    <button onClick={onClose} className="text-2xl hover:text-red-200 transition">×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                        <input className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none transition" placeholder="Enter your name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                        <input className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none transition" placeholder="07x xxx xxxx" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Email (Optional)</label>
                        <input className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none transition" placeholder="example@mail.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Select Course</label>
                        <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" onChange={(e) => setFormData({...formData, course: e.target.value})}>
                            <option value="N5">JLPT N5 (Beginner)</option>
                            <option value="N4">JLPT N4 (Intermediate)</option>
                            <option value="N3">JLPT N3 (Advanced)</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 transition shadow-lg active:scale-95">
                        {loading ? 'Processing...' : 'Register Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default EnrollmentForm;
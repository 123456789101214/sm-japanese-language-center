import React from 'react';

const Contact = () => {
  return (
    <section className="py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Get In Touch</h2>
          <h3 className="text-4xl font-extrabold text-gray-900">Contact Us</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h4>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-xl">📍</div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Our Location</p>
                    <p className="text-gray-900 font-bold italic">SM Japanese Center, Your Address Here, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-xl">📞</div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Call Us</p>
                    <p className="text-gray-900 font-bold">+94 7X XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-xl">✉️</div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email Us</p>
                    <p className="text-gray-900 font-bold">info@smjapanese.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Implementation */}
            <div className="w-full h-[300px] rounded-[2rem] overflow-hidden shadow-md border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585984606!2d79.861243!3d6.921837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1708360000000!5m2!1sen!2slk" 
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-50">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="+94 7X XXX XXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition">
                  <option>Inquiry about JLPT N5</option>
                  <option>Inquiry about JLPT N4</option>
                  <option>Inquiry about NAT Test</option>
                  <option>General Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                <textarea rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 hover:shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
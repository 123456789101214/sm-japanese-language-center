import React, { useState, useEffect, useRef } from 'react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { role: 'bot', text: 'Konnichiwa! SM-Kun, the AI assistant of SM Japanese Language Center Here! How can I help you today? 😊' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isTyping]);

  // චැට් එක ක්ලියර් කරන ෆන්ක්ෂන් එක
  const clearChat = () => {
    setChat([
      { role: 'bot', text: 'Konnichiwa! SM-Kun, the AI assistant of SM Japanese Language Center Here! How can I help you today? 😊' }
    ]);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { role: 'user', text: message };
    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (error) {
      setChat(prev => [...prev, { role: 'bot', text: "Sorry, something went wrong. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // AIChatBot.jsx එකේ උඩම තියෙන div එක මේ විදිහට වෙනස් කරන්න
<div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[99999] font-sans pointer-events-none text-left">
      
      {/* Chat Window */}
      <div className={`transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} origin-bottom-right mb-4 pointer-events-auto`}>
        <div className="bg-white w-[320px] sm:w-[350px] h-[500px] shadow-2xl rounded-[25px] flex flex-col border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm text-xl">🤖</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg leading-tight">SM-Kun</h3>
              <p className="text-xs text-red-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
            
            {/* Clear Chat Button */}
            <button 
              onClick={clearChat} 
              className="text-[10px] uppercase tracking-wider bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md border border-white/20 transition duration-200"
            >
              Clear
            </button>

            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition text-2xl leading-none">&times;</button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-[18px] text-sm shadow-sm ${msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="flex justify-start"><div className="bg-white p-3 rounded-[18px] rounded-tl-none border border-gray-100 shadow-sm flex gap-1"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span></div></div>}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
            <input className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500/20 transition" placeholder="Ask me anything..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()}/>
            <button onClick={sendMessage} className="bg-red-600 p-2.5 rounded-full text-white hover:bg-red-700 transition shadow-lg active:scale-90"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg></button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl transition-all duration-300 transform pointer-events-auto ${isOpen ? 'bg-gray-800 rotate-90 scale-90' : 'bg-red-600 hover:scale-110'}`}
        >
          {isOpen ? '×' : '💬'}
        </button>
      </div>
    </div>
  );
};

export default AIChatBot;
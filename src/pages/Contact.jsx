import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle, FiSend, FiUser, FiArrowUp } from 'react-icons/fi';

const Contact = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => { if (window.scrollY > 300) setShowTopBtn(true); else setShowTopBtn(false); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-16 relative overflow-hidden transition-colors duration-300">
      <div className="text-center pt-20 pb-12 px-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 tracking-wider uppercase">Get in Touch</p>
        <h1 className="text-5xl md:text-6xl font-serif mb-5 leading-tight">We'd love to <span className="text-[#eab308] italic">hear from</span><br/>you.</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-[15px] leading-relaxed">Questions about an order, sizing, or a custom request? Send us a message or reach out directly — we're a small team and we answer every message personally.</p>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: <FiMail size={20}/>, title: 'EMAIL', desc: 'hello@ttscollection.com', sub: 'We reply within 24 hours' },
              { icon: <FiPhone size={20}/>, title: 'PHONE', desc: '+1 (234) 567-890', sub: 'Mon-Fri, 9am-6pm EST' },
              { icon: <FiMapPin size={20}/>, title: 'STUDIO', desc: '123 Fashion Ave\nNew York, NY 10012', sub: 'Visits by appointment' },
              { icon: <FiClock size={20}/>, title: 'RESPONSE TIME', desc: 'Under 24 hours', sub: 'Often much faster' },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800/80 p-5 rounded-2xl flex items-start gap-4 hover:border-[#eab308]/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-all duration-300">
                <div className="bg-[#eab308]/10 text-[#eab308] p-3 rounded-xl">{item.icon}</div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-widest text-gray-500 mb-1">{item.title}</h3>
                  <p className="text-[15px] font-medium whitespace-pre-line">{item.desc}</p>
                  <p className="text-gray-500 text-[13px] mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
            <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] mt-2 text-[15px]"><FiMessageCircle size={20} /> Chat on WhatsApp</button>
          </div>

          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800/80 p-6 md:p-8 rounded-3xl transition-colors duration-300">
            <h2 className="text-2xl font-serif mb-2">Send us a message</h2>
            <p className="text-gray-600 dark:text-gray-400 text-[13px] mb-6">Fill in the form below and we'll respond as soon as we can.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-1.5">YOUR NAME</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="Jane Doe" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-800 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-[#eab308] text-sm transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-1.5">EMAIL ADDRESS</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="email" placeholder="you@example.com" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-800 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-[#eab308] text-sm transition-colors" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-1.5">SUBJECT</label>
                <input type="text" placeholder="How can we help?" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#eab308] text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-1.5">MESSAGE</label>
                <textarea rows="4" placeholder="Tell us a bit more..." className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#eab308] text-sm resize-none transition-colors"></textarea>
                <div className="text-right text-[10px] text-gray-600 dark:text-gray-600 mt-1">0/500 characters</div>
              </div>
              <button type="button" className="w-full bg-[#eab308] text-black font-bold py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-[#facc15] transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)] mt-2"><FiSend /> Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mb-16">
        <div className="bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-gray-800/60 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Looking for quick answers?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] mb-6 max-w-2xl mx-auto">Many questions about shipping, returns, and sizing are answered in our FAQ.</p>
          <button className="border border-gray-400 dark:border-gray-600 hover:border-[#eab308] hover:text-[#eab308] px-8 py-3 rounded-full font-medium transition-all duration-300">Visit the FAQ</button>
        </div>
      </div>

      <a href="#" className="fixed bottom-8 left-8 bg-[#25D366] p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-50 text-black"><FiMessageCircle size={24} /></a>
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 hover:bg-[#eab308] hover:text-black hover:border-[#eab308] p-3.5 rounded-full shadow-lg transition-all duration-500 z-50 text-gray-600 dark:text-gray-300 transform active:scale-90 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}><FiArrowUp size={20} strokeWidth={1.5} /></button>
    </div>
  );
};
export default Contact;
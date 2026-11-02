import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiFeather, FiHeart, FiAward, FiStar, FiMessageCircle, FiArrowUp } from 'react-icons/fi';

const About = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => { if (window.scrollY > 300) setShowTopBtn(true); else setShowTopBtn(false); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-16 overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto px-6 pt-20 pb-12 max-w-6xl">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 tracking-wider">Our Story</p>
        <h1 className="text-5xl md:text-6xl font-serif mb-5 leading-tight">
          Timeless design,<br/><span className="text-[#eab308] italic">modern spirit.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-[15px] leading-relaxed mb-8">
          TTS Collection was born from a simple idea: that everyday clothing should feel as good as it looks. We design considered pieces for people who care about quality, comfort, and craft — not fast trends.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/collection" className="bg-[#eab308] hover:bg-[#facc15] text-black px-7 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]">Explore the Collection <FiArrowRight /></Link>
          <Link to="/contact" className="border border-gray-400 dark:border-gray-600 hover:border-[#eab308] hover:text-[#eab308] text-gray-900 dark:text-white px-7 py-3 rounded-full font-medium text-sm transition-all duration-300">Get in Touch</Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mb-16">
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-gray-200 dark:divide-gray-800 transition-colors duration-300">
          {[{v:'2018',l:'Founded'},{v:'25k+',l:'Happy Customers'},{v:'60+',l:'Countries Shipped'},{v:'4.9',l:'Average Rating',star:true}].map((item, idx) => (
            <div key={idx}>
              <h3 className="text-3xl font-serif text-[#eab308] mb-1">{item.v}{item.star && <FiStar className="inline mb-1 ml-1 fill-[#eab308]" />}</h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">{item.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 tracking-wider">The Mission</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-5 leading-tight">Clothing that respects your wardrobe — and the world.</h2>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mb-3">We're not chasing volume. We release small, focused collections of pieces we genuinely believe in. Each one is designed to outlast seasons, trends, and the way the industry usually works.</p>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">Our studio in New York works directly with a tight circle of makers we trust. Materials are sourced with intention. Every decision — from the thread to the tag — is made to give you something that actually lasts.</p>
        </div>
        <div className="space-y-4">
          {[{i:<FiUsers size={20}/>,t:'Small Team',d:'Direct from our studio'},{i:<FiFeather size={20}/>,t:'Sustainable',d:'Low-waste production'}].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800/80 p-5 rounded-2xl flex items-start gap-4 hover:border-[#eab308]/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] transition-all duration-300">
              <div className="bg-[#eab308]/10 text-[#eab308] p-3 rounded-xl">{item.i}</div>
              <div><h4 className="font-serif text-lg mb-1">{item.t}</h4><p className="text-gray-500 text-sm">{item.d}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mb-16">
        <div className="text-center mb-10">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 tracking-wider">What We Stand For</p>
          <h2 className="text-4xl font-serif">Four principles, one<br/>wardrobe.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: <FiStar />, title: 'Crafted with Intention', desc: 'Every stitch, seam, and silhouette is designed with purpose — nothing is accidental.' },
            { icon: <FiHeart />, title: 'Built to Last', desc: 'We choose premium materials and slow-fashion practices so your pieces stay with you.' },
            { icon: <FiFeather />, title: 'Mindful & Ethical', desc: 'Fair labor, low-waste production, and packaging that respects the planet.' },
            { icon: <FiAward />, title: 'Quality Over Quantity', desc: 'Small, focused collections. Every release is a considered edit — not a race.' },
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800/80 p-6 rounded-2xl hover:border-[#eab308]/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] transition-all duration-300">
              <div className="bg-[#eab308]/10 text-[#eab308] p-3 rounded-xl inline-block mb-4">{item.icon}</div>
              <h3 className="text-xl font-serif mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-gray-100 dark:bg-gradient-to-r dark:from-[#1a1a1a] dark:to-[#0f0f0f] border border-gray-200 dark:border-gray-800/80 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-lg dark:shadow-[0_0_30px_rgba(234,179,8,0.05)] transition-colors duration-300">
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Ready to see the collection?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] mb-6 max-w-2xl mx-auto">Browse our latest pieces, or reach out — we're a small team and we answer every message personally.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/collection" className="bg-[#eab308] hover:bg-[#facc15] text-black px-7 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]">Shop Now <FiArrowRight /></Link>
            <Link to="/contact" className="border border-gray-400 dark:border-gray-600 hover:border-[#eab308] hover:text-[#eab308] px-7 py-3 rounded-full font-medium text-sm transition-all duration-300">Contact Us</Link>
          </div>
        </div>
      </div>

      <a href="#" className="fixed bottom-8 left-8 bg-[#25D366] p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-50 text-black"><FiMessageCircle size={24} /></a>
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 hover:bg-[#eab308] hover:text-black hover:border-[#eab308] p-3.5 rounded-full shadow-lg transition-all duration-500 z-50 text-gray-600 dark:text-gray-300 transform active:scale-90 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}><FiArrowUp size={20} strokeWidth={1.5} /></button>
    </div>
  );
};
export default About;
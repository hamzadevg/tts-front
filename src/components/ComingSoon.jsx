import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiClock } from 'react-icons/fi';

const ComingSoon = ({ title }) => {
  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-[80vh] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-[#eab308]/10 text-[#eab308] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <FiClock size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-[#eab308] font-bold text-sm tracking-widest uppercase mb-6">
          Coming Soon
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8 leading-relaxed">
          Hamari team is section par mehnat kar rahi hai. Jald hi tumhe yahan premium products milenge. Tab tak Collection page explore karo!
        </p>
        <Link 
          to="/collection" 
          className="inline-flex items-center gap-2 bg-[#eab308] hover:bg-[#facc15] text-black px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
        >
          <FiArrowLeft /> Back to Collection
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
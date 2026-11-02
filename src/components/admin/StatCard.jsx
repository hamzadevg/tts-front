import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const StatCard = ({ icon, title, value, change, changeLabel }) => {
  return (
    <div className="admin-card bg-[#111] border border-[#eab308]/20 rounded-2xl p-6 hover:border-[#eab308]/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#eab308]/10 text-[#eab308] rounded-xl flex items-center justify-center text-xl group-hover:bg-[#eab308] group-hover:text-black transition-all duration-300">
          {icon}
        </div>
      </div>
      <p className="admin-text-muted text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-serif admin-text-primary text-white mb-3">{value}</h3>
      {change && (
        <p className="text-xs flex items-center gap-1">
          <span className="text-green-500 flex items-center gap-0.5 font-bold"><FiArrowUp size={12} /> {change}</span>
          <span className="admin-text-muted text-gray-500">{changeLabel}</span>
        </p>
      )}
    </div>
  );
};

export default StatCard;
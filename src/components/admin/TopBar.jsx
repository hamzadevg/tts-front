import React, { useState, useEffect } from 'react';
import { FiMenu, FiSun, FiMoon, FiBell, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/api';
const TopBar = ({ setIsOpen, isCollapsed, setIsCollapsed }) => {
  const userName = localStorage.getItem('userName') || 'Admin';
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem('read_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light'); root.classList.remove('dark');
    } else {
      root.classList.add('dark'); root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/admin/notifications`, { 
  headers: { Authorization: `Bearer ${token}` } 
});

        setNotifications(res.data);
      } catch (error) { console.error(error); }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Read notifications ka count check karo
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('read_notifications');
      setReadIds(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sirf UNREAD notifications ka count nikaalo
  const unreadCount = notifications.filter(notif => !readIds.includes(notif._id)).length;

  return (
    <header className="sticky top-0 z-30 admin-topbar bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#eab308]/20 px-4 md:px-6 py-4 flex justify-between items-center transition-colors duration-300">
      
      {/* LEFT: Menu Toggle */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden admin-text-primary text-white" onClick={() => setIsOpen(true)}>
          <FiMenu size={24} />
        </button>
        <button 
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl bg-[#141414] border border-[#eab308]/20 text-[#eab308] hover:bg-[#eab308] hover:text-black transition-all"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      {/* RIGHT: Theme, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        
        <button onClick={toggleTheme} className="admin-text-secondary text-gray-400 hover:text-[#eab308] transition-colors p-2 rounded-full hover:bg-[#eab308]/10">
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* NOTIFICATION BELL - SIRF UNREAD COUNT */}
        <button 
          onClick={() => navigate('/admin/notifications')} 
          className="relative admin-text-secondary text-gray-400 hover:text-[#eab308] transition-colors p-2 rounded-full hover:bg-[#eab308]/10"
          title="View Notifications"
        >
          <FiBell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#eab308] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 pl-3 md:pl-4 border-l admin-divider border-[#eab308]/20">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold admin-text-primary text-white">{userName}</p>
            <p className="text-[11px] text-[#eab308] flex items-center justify-end gap-1">
              <FaCrown size={10} /> Admin
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#eab308] to-[#b8860b] rounded-full flex items-center justify-center text-black font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

    </header>
  );
};

export default TopBar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBell, FiCheckCircle, FiClock, FiPackage, FiArrowLeft, FiCheckSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem('read_notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/notifications', { headers: { Authorization: `Bearer ${token}` } });
        setNotifications(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const newReadIds = [...readIds, id];
      setReadIds(newReadIds);
      localStorage.setItem('read_notifications', JSON.stringify(newReadIds));
    }
  };

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n._id);
    setReadIds(allIds);
    localStorage.setItem('read_notifications', JSON.stringify(allIds));
  };

  return (
    <AdminLayout>
      {/* GAP FIX: max-w-4xl hata diya, ab full width lega */}
      <div className="space-y-6 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link to="/admin" className="flex items-center gap-2 text-[#eab308] text-sm font-medium hover:underline mb-3">
              <FiArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-serif admin-text-primary flex items-center gap-3">
              <FiBell className="text-[#eab308]" /> Notifications
            </h1>
            <p className="admin-text-secondary text-sm mt-1">{notifications.length} total notifications</p>
          </div>

          {/* MARK ALL AS READ BUTTON */}
          {notifications.length > 0 && (
            <button 
              onClick={markAllAsRead} 
              className="flex items-center gap-2 bg-[#eab308] hover:bg-[#facc15] text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
              <FiCheckSquare size={18} /> Mark All as Read
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center w-full">
            <FiBell size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <p className="admin-text-secondary">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const isRead = readIds.includes(notif._id);
              return (
                <div 
                  key={notif._id} 
                  className={`p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                    isRead 
                      ? 'bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 opacity-80' 
                      : 'bg-white dark:bg-[#111] border-[#eab308]/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isRead ? 'bg-gray-200 dark:bg-gray-800 text-gray-500' : 'bg-[#eab308]/10 text-[#eab308]'}`}>
                    <FiPackage size={22} />
                  </div>

                  <div className="flex-grow">
                    <p className={`text-sm font-bold ${isRead ? 'admin-text-secondary' : 'admin-text-primary'}`}>{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                      <FiClock size={10}/> {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {!isRead ? (
                    <button 
                      onClick={() => markAsRead(notif._id)} 
                      className="bg-[#eab308] hover:bg-[#facc15] text-black font-bold text-[11px] px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shrink-0"
                    >
                      <FiCheckCircle size={14} /> Mark Read
                    </button>
                  ) : (
                    <span className="text-green-500 text-[11px] font-bold flex items-center gap-1.5 shrink-0 bg-green-500/10 px-3 py-2 rounded-lg">
                      <FiCheckCircle size={14} /> Read
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiUser, FiMail, FiCalendar, FiMoreVertical } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/admin/customers`, { headers: { Authorization: `Bearer ${token}` } });
        setCustomers(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Generate random colors for avatars
  const getAvatarColor = (name) => {
    const colors = ['#eab308', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f97316'];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif admin-text-primary">Customers</h1>
            <p className="admin-text-secondary text-sm mt-1">{customers.length} total customers registered</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors"
            />
          </div>
        </div>

        {/* Customers Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800">
            <FiUser size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <p className="admin-text-secondary text-gray-500">No customers found matching "{search}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCustomers.map((customer) => (
              <div key={customer._id} className="group admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-[#eab308]/50 hover:shadow-lg transition-all duration-300">
                
                <div className="flex justify-between items-start mb-4">
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md"
                      style={{ backgroundColor: getAvatarColor(customer.name) }}
                    >
                      {customer.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-1">
                        {customer.name}
                        {customer.isAdmin && <FaCrown size={12} className="text-[#eab308]" title="Admin" />}
                      </h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <FiCalendar size={10} /> Joined {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Options Button */}
                  <button className="text-gray-400 hover:text-[#eab308] p-1.5 rounded-lg hover:bg-[#eab308]/10 transition-colors">
                    <FiMoreVertical size={18} />
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-black/30 px-3 py-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                  <FiMail className="text-[#eab308]" size={16} />
                  <span className="truncate">{customer.email}</span>
                </div>

                {/* Optional Phone (if exists) */}
                {customer.address?.phone && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-black/30 px-3 py-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                    <span className="text-[#eab308] text-xs font-bold">PHONE</span>
                    <span>{customer.address.phone}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiCheckCircle, FiClock, FiSearch, FiRefreshCw, FiPackage, FiUser, FiEye 
} from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // <-- NAYA

  // URL Search
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    if (searchQuery) setSearch(searchQuery);
  }, [location.search]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/admin/orders`, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const filteredOrders = orders.filter(order => {
    const searchLower = search.toLowerCase();
    return (
      order._id.toLowerCase().includes(searchLower) ||
      order.customerDetails?.fullName?.toLowerCase().includes(searchLower) ||
      order.customerDetails?.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif admin-text-primary">Manage Orders</h1>
            <p className="admin-text-secondary text-sm mt-1">{orders.length} total orders</p>
          </div>
          <button onClick={fetchOrders} className="flex items-center gap-2 bg-[#eab308] text-black px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-[#facc15] transition-all">
            <FiRefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Search */}
        <div className="relative admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer Name or Email..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" 
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#eab308]/10 flex items-center justify-center text-[#eab308]">
                            <FiPackage size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-mono font-bold admin-text-primary">#{order._id.slice(-8).toUpperCase()}</p>
                            <p className="text-[11px] text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                            <FiUser size={14} />
                          </div>
                          <div>
                            <p className="text-sm font-bold admin-text-primary">{order.customerDetails?.fullName || 'N/A'}</p>
                            <p className="text-[11px] text-gray-500">{order.customerDetails?.email || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold admin-text-primary">Rs {order.totalPrice.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-500">{order.paymentMethod}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full ${order.isDelivered ? 'bg-green-500/10 text-green-500' : 'bg-[#eab308]/10 text-[#eab308]'}`}>
                          {order.isDelivered ? <FiCheckCircle size={12} /> : <FiClock size={12} />}
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* PREVIEW BUTTON - NAVIGATES TO DETAILS PAGE */}
                        <button 
                          onClick={() => navigate(`/admin/orders/${order._id}`)} 
                          className="bg-gray-100 dark:bg-white/5 hover:bg-[#eab308] text-gray-700 dark:text-gray-300 hover:text-black border border-gray-200 dark:border-gray-800 hover:border-[#eab308] text-[11px] font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ml-auto"
                        >
                          <FiEye size={14} /> Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
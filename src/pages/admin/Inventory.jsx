import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiAlertTriangle, FiCheckCircle, FiXCircle, FiRefreshCw, FiPackage } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/admin/inventory`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setInventory(res.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInventory(); }, []);

  const filtered = inventory.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === 'Out of Stock') return { bg: 'bg-red-500/10 text-red-500 border-red-500/20', icon: <FiXCircle size={12} /> };
    if (status === 'Low Stock') return { bg: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: <FiAlertTriangle size={12} /> };
    return { bg: 'bg-green-500/10 text-green-500 border-green-500/20', icon: <FiCheckCircle size={12} /> };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif admin-text-primary">Inventory</h1>
            <p className="admin-text-secondary text-sm mt-1">Manage product stock levels</p>
          </div>
          <button onClick={fetchInventory} className="flex items-center gap-2 bg-[#eab308] text-black px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-[#facc15] transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <FiRefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search inventory by name or category..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors"
            />
          </div>
        </div>

        {/* Table */}
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
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Stock</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filtered.length > 0 ? (
                    filtered.map((product) => {
                      const statusStyle = getStatusStyle(product.status);
                      return (
                        <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-sm font-bold admin-text-primary line-clamp-1 max-w-[200px]">{product.name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm admin-text-secondary">{product.category}</td>
                          <td className="px-6 py-4 text-sm font-bold text-[#eab308]">Rs {product.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-bold ${
                              product.quantity === 0 ? 'text-red-500' : 
                              product.quantity < 10 ? 'text-orange-500' : 
                              'admin-text-primary'
                            }`}>
                              {product.quantity} units
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border ${statusStyle.bg}`}>
                              {statusStyle.icon} {product.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center admin-text-secondary">
                        No inventory items found matching "{search}".
                      </td>
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

export default AdminInventory;
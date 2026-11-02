import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const AdminReports = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/admin/monthly-sales`, { headers: { Authorization: `Bearer ${token}` } });
        setSalesData(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif text-white admin-text-primary">Sales Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Monthly sales performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#111] border border-[#eab308]/20 rounded-2xl p-6">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
            <h2 className="text-3xl font-serif text-[#eab308] font-bold mt-2">Rs {totalSales.toLocaleString()}</h2>
          </div>
          <div className="bg-[#111] border border-[#eab308]/20 rounded-2xl p-6">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Orders</p>
            <h2 className="text-3xl font-serif text-[#eab308] font-bold mt-2">{totalOrders}</h2>
          </div>
        </div>

        <div className="bg-[#111] border border-[#eab308]/20 rounded-2xl p-6">
          <h2 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-[#eab308]" /> Monthly Sales Trend
          </h2>
          {loading ? (
            <div className="text-center py-20"><div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div></div>
          ) : salesData.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No sales data available yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888', fontSize: 11 }} />
                <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #eab308', borderRadius: '8px' }}
                  labelStyle={{ color: '#eab308' }}
                  formatter={(value) => `Rs ${value.toLocaleString()}`}
                />
                <Line type="monotone" dataKey="sales" stroke="#eab308" strokeWidth={3} dot={{ fill: '#eab308', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
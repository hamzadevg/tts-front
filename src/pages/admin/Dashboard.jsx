import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiShoppingCart, FiUsers, FiBox, FiCalendar, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { API_URL } from '../../services/api';
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="text-center py-20 admin-text-muted text-gray-500">Failed to load data.</div>
      </AdminLayout>
    );
  }

  // 1. BAR CHART DATA (Top Selling Products)
  const barChartData = data.topProducts.map((product, index) => ({
    label: `#${index + 1}`, 
    name: product.name,
    sales: product.totalSold,
    price: product.price,
    revenue: product.price * product.totalSold,
  }));

  // 2. PIE CHART DATA (Order Status)
  const pieData = [
    { name: 'Delivered', value: data.orderStatus.delivered, color: '#22c55e' },
    { name: 'Processing', value: data.orderStatus.processing, color: '#eab308' },
    { name: 'Pending', value: data.orderStatus.pending, color: '#f97316' },
    { name: 'Cancelled', value: data.orderStatus.cancelled, color: '#ef4444' },
  ];

  const getStatusColor = (status) => {
    if (status.isDelivered) return 'bg-green-500/20 text-green-500';
    if (status.isPaid) return 'bg-yellow-500/20 text-yellow-500';
    return 'bg-orange-500/20 text-orange-500';
  };

  const getStatusText = (status) => {
    if (status.isDelivered) return 'Delivered';
    if (status.isPaid) return 'Processing';
    return 'Pending';
  };

  const userName = localStorage.getItem('userName') || 'Admin';
  const today = new Date();

  // 3. CUSTOM TOOLTIP
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#0a0a0a] border-2 border-[#eab308] rounded-lg p-3 shadow-[0_0_25px_rgba(234,179,8,0.5)]">
          <p className="text-white font-bold text-xs mb-1">{item.name}</p>
          <p className="text-[#eab308] text-[11px] font-bold">{item.sales} Units Sold</p>
          <p className="text-gray-400 text-[10px]">Revenue: Rs {item.revenue.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#eab308]/20 via-[#111] to-[#111] border border-[#eab308]/30 rounded-2xl p-8 admin-card">
          <div className="relative z-10">
            <h1 className="text-3xl font-serif admin-text-primary text-white mb-2">
              Welcome back, <span className="text-[#eab308]">{userName}!</span>
            </h1>
            <p className="admin-text-secondary text-gray-400 text-sm">Here's what's happening with your store today.</p>
          </div>
          <div className="absolute top-6 right-6 text-right z-10">
            <p className="text-[#eab308] text-sm font-bold flex items-center gap-2">
              <FiCalendar /> {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="admin-text-muted text-gray-500 text-xs mt-1">
              {today.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
          </div>
          <FaCrown className="absolute -bottom-10 -right-10 text-[#eab308] opacity-[0.05] text-[200px]" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard icon={<FiDollarSign />} title="Total Sales" value={`Rs ${data.totalSales.toLocaleString()}`} change="25%" changeLabel="Compared to last week" />
          <StatCard icon={<FiShoppingCart />} title="Total Orders" value={data.totalOrders} change="50%" changeLabel="Compared to last week" />
          <StatCard icon={<FiUsers />} title="Total Customers" value={data.totalCustomers.toLocaleString()} change="15%" changeLabel="Compared to last week" />
          <StatCard icon={<FiBox />} title="Total Products" value={data.totalProducts} change="5%" changeLabel="Active products" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* TOP SELLING PRODUCTS (Highlighted Bar Chart) */}
          <div className="lg:col-span-2 admin-card bg-[#111] border border-[#eab308]/20 rounded-2xl p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-serif admin-text-primary text-white flex items-center gap-2">
                <FiTrendingUp className="text-[#eab308]" /> Top Selling Products
              </h2>
              <span className="text-[10px] bg-[#0a0a0a] text-[#eab308] px-3 py-1.5 rounded-full border border-[#eab308]/30 font-bold">Last 30 Days</span>
            </div>
            
            <div className="w-full h-[300px]" style={{ pointerEvents: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={barChartData} 
                  margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  
                  <XAxis 
                    dataKey="label" 
                    stroke="#666" 
                    tick={{ fill: '#888', fontSize: 12, fontWeight: 'bold' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
                  
                  {/* CURSOR=FALSE: Background highlight hata diya */}
                  <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={false} 
                  />
                  
                  <Bar 
                    dataKey="sales" 
                    radius={[8, 8, 0, 0]} 
                    barSize={60}
                  >
                    {barChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#facc15' : '#6b5311'} 
                        style={{ 
                          filter: index === 0 ? 'drop-shadow(0px 0px 10px rgba(250, 204, 21, 0.6))' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-2">Hover over bars to see product details</p>
          </div>

          {/* ORDER STATUS PIE CHART */}
          <div className="admin-card bg-[#111] border border-[#eab308]/20 rounded-2xl p-6">
            <h2 className="text-lg font-serif admin-text-primary text-white mb-6">Order Status</h2>
            
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-serif admin-text-primary text-white">{data.totalOrders}</p>
                <p className="text-[10px] admin-text-muted text-gray-500 uppercase tracking-widest">Total Orders</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="admin-text-secondary text-gray-400">{item.name}</span>
                  </div>
                  <span className="admin-text-primary text-white font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          <div className="lg:col-span-2 admin-card bg-[#111] border border-[#eab308]/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-serif admin-text-primary text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-[#eab308] text-xs font-bold flex items-center gap-1 hover:underline">View All <FiArrowRight size={12} /></Link>
            </div>

            <div className="space-y-3">
              {data.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors admin-table-row">
                  <div className="w-12 h-12 bg-[#0a0a0a] rounded-lg flex items-center justify-center text-[#eab308]"><FiShoppingCart size={20} /></div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold admin-text-primary text-white">#{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-[11px] admin-text-muted text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${getStatusColor(order)}`}>{getStatusText(order)}</span>
                    <p className="text-sm font-bold admin-text-primary text-white mt-1">Rs {order.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card bg-[#111] border border-[#eab308]/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-serif admin-text-primary text-white flex items-center gap-2"><FaCrown className="text-[#eab308]" size={16} /> Top Products</h2>
            </div>

            <div className="space-y-4">
              {data.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                    <span className="absolute -top-1 -left-1 bg-[#eab308] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">#{idx + 1}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-bold admin-text-primary text-white line-clamp-1">{product.name}</p>
                    <p className="text-[11px] admin-text-muted text-gray-500">Rs {product.price.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-[#eab308] font-bold">{product.totalSold} sold</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
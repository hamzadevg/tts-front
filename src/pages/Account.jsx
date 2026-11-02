import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiSave, FiLogOut, FiPackage, FiMapPin, FiPhone, FiUpload, FiShoppingBag, FiCheckCircle, FiClock, FiCalendar, FiStar, FiTruck, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import RatingPopup from '../components/RatingPopup';
import { API_URL } from '../services/api';
const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [originalData, setOriginalData] = useState({ name: '', email: '', avatar: '', address: { street: '', city: '', postalCode: '', country: 'Pakistan', phone: '' } });
  const [userData, setUserData] = useState({ name: '', email: '', avatar: '', address: { street: '', city: '', postalCode: '', country: 'Pakistan', phone: '' } });
  
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [ratingProduct, setRatingProduct] = useState(null);
  const [ratingOrderId, setRatingOrderId] = useState(null);

  const isDemoUser = localStorage.getItem('token') === 'dummy_token_123';
  const hasUnsavedChanges = JSON.stringify(originalData) !== JSON.stringify(userData);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (!token || isDemoUser) {
      const demoData = {
        name: userName || 'Demo User',
        email: userEmail || 'demo@tts.com',
        avatar: '',
        address: { street: '', city: '', postalCode: '', country: 'Pakistan', phone: '' }
      };
      setUserData(demoData);
      setOriginalData(demoData);
      setOrdersLoading(false);
    } else {
      fetchProfile();
      fetchOrders();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } });
      const data = {
        name: res.data.name || '',
        email: res.data.email || '',
        avatar: res.data.avatar || '',
        address: res.data.address || { street: '', city: '', postalCode: '', country: 'Pakistan', phone: '' }
      };
      setUserData(data);
      setOriginalData(data);
    } catch (error) { console.log(error); }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/orders/myorders`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      console.log('Orders fetched:', res.data); // Debug ke liye
      setOrders(res.data);
    } catch (error) {
      console.log('Error fetching orders:', error);
      setOrdersError(error.response?.data?.message || 'Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      if (isDemoUser) {
        localStorage.setItem('userName', userData.name);
        setOriginalData(userData);
        setMessage({ type: 'success', text: 'Preferences saved! (Demo Mode)' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        return;
      }
      
      const res = await axios.put(`${API_URL}/auth/profile`, 
        { name: userData.name, email: userData.email, avatar: userData.avatar, address: userData.address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      localStorage.setItem('userName', res.data.name);
      localStorage.setItem('userEmail', res.data.email);
      setOriginalData({ ...userData, name: res.data.name, email: res.data.email });
      setMessage({ type: 'success', text: 'Preferences saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally { setLoading(false); }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserData({ ...userData, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      const confirmLogout = window.confirm("You have unsaved changes. Are you sure you want to logout?");
      if (!confirmLogout) return;
    }
    localStorage.clear();
    navigate('/');
  };

  const handleSubmitReview = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/orders/${data.orderId}/review`, {
        productId: data.productId,
        rating: data.rating,
        comment: data.comment || 'No comment provided'
      }, { headers: { Authorization: `Bearer ${token}` } });

      setMessage({ type: 'success', text: 'Review submitted successfully! Thank you.' });
      setRatingProduct(null);
      setRatingOrderId(null);
      fetchOrders();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Review failed' });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // COUNTDOWN LOGIC
  const getDeliveryStatus = (order) => {
    if (order.isDelivered) {
      return { 
        text: 'Delivered', 
        color: 'text-green-500', 
        bg: 'bg-green-500/10 border-green-500/30', 
        icon: <FiCheckCircle size={14} />,
        description: `Delivered on ${new Date(order.deliveredAt || order.updatedAt).toLocaleDateString()}`,
      };
    }
    
    const now = new Date().getTime();
    const est = new Date(order.estimatedDelivery).getTime();
    const diff = est - now;
    
    if (diff <= 0) {
      return { 
        text: 'Out for Delivery', 
        color: 'text-blue-500', 
        bg: 'bg-blue-500/10 border-blue-500/30', 
        icon: <FiTruck size={14} />,
        description: 'Your order will be delivered today',
      };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { 
      text: `${days}d ${hours}h ${minutes}m remaining`, 
      color: 'text-[#eab308]', 
      bg: 'bg-[#eab308]/10 border-[#eab308]/30', 
      icon: <FiClock size={14} />,
      description: `Expected by ${new Date(order.estimatedDelivery).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    };
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-20 relative transition-colors duration-300">
      
      {ratingProduct && (
        <RatingPopup product={ratingProduct} orderId={ratingOrderId}
          onClose={() => { setRatingProduct(null); setRatingOrderId(null); }}
          onSuccess={handleSubmitReview} />
      )}

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#eab308]/30 via-[#eab308]/10 to-transparent dark:from-[#eab308]/20 dark:via-[#141414] dark:to-[#141414] border-b border-[#eab308]/30">
        <div className="absolute inset-0 opacity-10">
          <FaCrown className="absolute -top-10 -right-10 text-[#eab308] text-[300px]" />
        </div>
        <div className="container mx-auto px-6 max-w-6xl pt-16 pb-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              {userData.avatar ? (
                <img src={userData.avatar} alt="avatar" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.4)]" />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#eab308] to-[#b8860b] text-black rounded-full flex items-center justify-center text-3xl font-bold border-4 border-[#eab308] shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                  {getInitials(userData.name)}
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-3xl md:text-4xl font-serif">{userData.name}</h1>
                <FaCrown className="text-[#eab308]" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{userData.email}</p>
              <p className="text-xs text-[#eab308] mt-2 font-bold">Member since {new Date().getFullYear()}</p>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-2xl font-serif text-[#eab308] font-bold">{orders.length}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Orders</p>
              </div>
              <div className="text-center border-l border-gray-300 dark:border-gray-700 pl-4 md:pl-6">
                <p className="text-2xl font-serif text-[#eab308] font-bold">Rs {totalSpent.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-[#eab308]/10 to-transparent">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Account Menu</h3>
              </div>
              <nav className="p-2">
                {[
                  { id: 'profile', name: 'Profile Settings', icon: <FiUser size={18} /> },
                  { id: 'orders', name: 'My Orders', icon: <FiPackage size={18} />, count: orders.length },
                  { id: 'address', name: 'My Address', icon: <FiMapPin size={18} /> },
                ].map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-all duration-300 mb-1 ${
                      activeTab === item.id ? 'bg-gradient-to-r from-[#eab308]/20 to-transparent text-[#eab308] border-l-4 border-[#eab308]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}>
                    <span className="flex items-center gap-3">{item.icon} {item.name}</span>
                    {item.count !== undefined && (
                      <span className="bg-[#eab308]/20 text-[#eab308] text-[10px] font-bold px-2 py-0.5 rounded-full">{item.count}</span>
                    )}
                  </button>
                ))}
              </nav>
              <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-medium text-sm transition-colors">
                  <FiLogOut size={18} /> Logout
                </button>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-br from-[#eab308] to-[#b8860b] rounded-2xl p-5 text-black">
              <FaCrown className="text-2xl mb-2" />
              <h4 className="font-serif font-bold text-lg mb-1">Need Help?</h4>
              <p className="text-xs mb-3 opacity-80">Our support team is here for you 24/7.</p>
              <button className="bg-black text-[#eab308] text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-900 transition-colors">Contact Support</button>
            </div>
          </div>

          <div className="md:col-span-2">
            {message.text && (
              <div className={`p-4 rounded-xl mb-4 text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                {message.text}
              </div>
            )}

            <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="w-10 h-10 bg-[#eab308]/10 text-[#eab308] rounded-lg flex items-center justify-center"><FiUser size={20} /></div>
                    <div><h2 className="text-xl font-serif">Profile Information</h2><p className="text-xs text-gray-500">Update your personal details</p></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-gray-800">
                      {userData.avatar ? (
                        <img src={userData.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border-2 border-[#eab308]" />
                      ) : (
                        <div className="w-16 h-16 bg-[#eab308] text-black rounded-full flex items-center justify-center font-bold text-xl">{getInitials(userData.name)}</div>
                      )}
                      <div className="flex-grow">
                        <p className="text-sm font-bold">Profile Photo</p>
                        <p className="text-xs text-gray-500">JPG, PNG. Max 2MB</p>
                      </div>
                      <label className="bg-[#eab308] hover:bg-[#facc15] text-black text-xs font-bold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors">
                        <FiUpload size={14} /> Upload
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Email Address</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                      </div>
                    </div>

                    <button onClick={handleSave} disabled={!hasUnsavedChanges || loading}
                      className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 ${
                        hasUnsavedChanges ? 'bg-[#eab308] hover:bg-[#facc15] text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}>
                      <FiSave size={18} /> {loading ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#eab308]/10 text-[#eab308] rounded-lg flex items-center justify-center"><FiPackage size={20} /></div>
                      <div><h2 className="text-xl font-serif">My Orders</h2><p className="text-xs text-gray-500">{orders.length} total orders</p></div>
                    </div>
                    <button onClick={fetchOrders} className="text-[#eab308] hover:bg-[#eab308]/10 p-2 rounded-lg transition-colors" title="Refresh Orders">
                      <FiRefreshCw size={16} />
                    </button>
                  </div>

                  {ordersLoading ? (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-500 text-sm">Loading orders...</p>
                    </div>
                  ) : ordersError ? (
                    <div className="text-center py-12">
                      <FiAlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                      <p className="text-red-500 mb-4">{ordersError}</p>
                      <button onClick={fetchOrders} className="bg-[#eab308] text-black px-6 py-2.5 rounded-full font-bold text-sm">Try Again</button>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <FiShoppingBag size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                      <p className="text-gray-500 mb-4">You have no orders yet.</p>
                      <button onClick={() => navigate('/collection')} className="bg-[#eab308] hover:bg-[#facc15] text-black px-6 py-2.5 rounded-full font-bold text-sm">Start Shopping</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const status = getDeliveryStatus(order);
                        return (
                          <div key={order._id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-[#eab308]/50 transition-colors">
                            
                            <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-200 dark:border-gray-800">
                              <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Order ID</p>
                                <p className="text-sm font-mono text-gray-900 dark:text-white">#{order._id.slice(-8).toUpperCase()}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total</p>
                                <p className="text-lg font-bold text-[#eab308]">Rs {order.totalPrice.toLocaleString()}</p>
                              </div>
                            </div>

                            {/* Delivery Status with Countdown */}
                            <div className={`${status.bg} ${status.color} border px-4 py-3 rounded-lg mb-3`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="flex items-center gap-2 font-bold text-sm">{status.icon} {status.text}</span>
                                <span className="text-[10px] opacity-70">{order.deliveryMethod}</span>
                              </div>
                              <p className="text-[10px] opacity-80">{status.description}</p>
                            </div>

                            <div className="space-y-2 mb-3">
                              {order.orderItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-[#0a0a0a] p-2 rounded-lg">
                                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                  <div className="flex-grow">
                                    <p className="text-xs font-medium">{item.name}</p>
                                    <p className="text-[10px] text-gray-500">Qty: {item.quantity} × Rs {item.price}</p>
                                  </div>
                                  {order.isDelivered && !item.isReviewed && (
                                    <button onClick={() => { setRatingProduct(item); setRatingOrderId(order._id); }}
                                      className="bg-gradient-to-r from-[#eab308] to-[#facc15] text-black text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:scale-105 transition-transform shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                                      <FiStar size={10} fill="black" /> Rate Product
                                    </button>
                                  )}
                                  {item.isReviewed && (
                                    <span className="text-green-500 text-[10px] font-bold flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                                      <FiCheckCircle size={12} /> Reviewed
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-800">
                              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                <FiCalendar size={10} /> Ordered: {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                              <span className="text-[10px] font-bold text-gray-500">{order.paymentMethod}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* ADDRESS TAB */}
              {activeTab === 'address' && (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="w-10 h-10 bg-[#eab308]/10 text-[#eab308] rounded-lg flex items-center justify-center"><FiMapPin size={20} /></div>
                    <div><h2 className="text-xl font-serif">My Address</h2><p className="text-xs text-gray-500">Save your delivery address</p></div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Street Address</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" value={userData.address?.street || ''} onChange={(e) => setUserData({...userData, address: {...userData.address, street: e.target.value}})} placeholder="House #, Street, Area" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">City</label>
                        <input type="text" value={userData.address?.city || ''} onChange={(e) => setUserData({...userData, address: {...userData.address, city: e.target.value}})} placeholder="Lahore" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Postal Code (Optional)</label>
                        <input type="text" value={userData.address?.postalCode || ''} onChange={(e) => setUserData({...userData, address: {...userData.address, postalCode: e.target.value}})} placeholder="54000" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Country</label>
                        <input type="text" value={userData.address?.country || ''} onChange={(e) => setUserData({...userData, address: {...userData.address, country: e.target.value}})} placeholder="Pakistan" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Phone Number</label>
                        <div className="relative">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          <input type="text" value={userData.address?.phone || ''} onChange={(e) => setUserData({...userData, address: {...userData.address, phone: e.target.value}})} placeholder="+92 300 0000000" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#eab308] transition-all" />
                        </div>
                      </div>
                    </div>

                    <button onClick={handleSave} disabled={!hasUnsavedChanges || loading}
                      className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 ${
                        hasUnsavedChanges ? 'bg-[#eab308] hover:bg-[#facc15] text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}>
                      <FiSave size={18} /> {loading ? 'Saving...' : 'Save Address'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
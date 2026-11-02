import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FiSearch, FiPhone, FiPackage, FiCheckCircle, FiClock, 
  FiUser, FiMapPin, FiArrowRight, FiAlertTriangle 
} from 'react-icons/fi';

const TrackOrder = () => {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setOrders(null);

    try {
      const res = await axios.post('http://localhost:5000/api/orders/track', { query });
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to track orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timeline Steps
  const steps = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

  const getStepStatus = (order, stepIndex) => {
    if (order.isDelivered) return 'completed';
    if (stepIndex === 0) return 'completed';
    if (stepIndex === 1 && order.isPaid) return 'completed';
    if (stepIndex === 2 && order.isPaid) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-20 relative transition-colors duration-300">
      
      {/* Golden Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#eab308] opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* HERO */}
      <div className="relative z-10 text-center pt-20 pb-10 px-4">
        <div className="inline-flex items-center gap-2 border border-[#eab308]/50 bg-[#eab308]/10 text-[#eab308] px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wider mb-6">
          <FiPackage size={16} /> ORDER TRACKING
        </div>
        <h1 className="text-5xl md:text-6xl font-serif mb-4">Track Your Orders</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-[15px]">
          Enter your phone number or order ID — no account needed
        </p>
      </div>

      {/* SEARCH FORM */}
      <div className="relative z-10 container mx-auto px-4 max-w-3xl mb-10">
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#eab308]/10 text-[#eab308] rounded-xl flex items-center justify-center">
              <FiSearch size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif">Find Your Orders</h2>
              <p className="text-xs text-gray-500">We'll show all orders linked to your details</p>
            </div>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Phone number or Order ID" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#eab308] transition-colors"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#eab308] hover:bg-[#facc15] text-black font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Searching...' : <><FiSearch /> Track</>}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-lg flex items-center gap-2">
              <FiAlertTriangle /> {error}
            </div>
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        {orders && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order ID</p>
                    <p className="text-sm font-mono font-bold text-[#eab308]">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${order.isDelivered ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {order.isDelivered ? 'DELIVERED' : 'PENDING'}
                  </span>
                </div>

                {/* Timeline */}
                <div className="relative flex justify-between mb-10">
                  {steps.map((step, idx) => {
                    const status = getStepStatus(order, idx);
                    return (
                      <div key={idx} className="flex flex-col items-center relative z-10 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          status === 'completed' ? 'bg-[#eab308] text-black' : 
                          status === 'current' ? 'bg-[#eab308]/20 text-[#eab308] border-2 border-[#eab308]' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-400'
                        }`}>
                          {status === 'completed' ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
                        </div>
                        <p className={`text-[10px] font-bold ${status === 'upcoming' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>{step}</p>
                        {idx < steps.length - 1 && (
                          <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-10 ${status === 'completed' ? 'bg-[#eab308]' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Order Date</p>
                    <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Payment</p>
                    <p className="text-sm font-bold">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total</p>
                    <p className="text-sm font-bold text-[#eab308]">Rs {order.totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                {/* Customer & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-start gap-2">
                    <FiUser className="text-[#eab308] mt-0.5" size={14} />
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Customer</p>
                      <p className="text-sm">{order.customerDetails?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-[#eab308] mt-0.5" size={14} />
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Delivery Address</p>
                      <p className="text-sm">{order.customerDetails?.address1}, {order.customerDetails?.city}</p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Items ({order.orderItems.length})</p>
                  <div className="space-y-2">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-[#0a0a0a] p-3 rounded-lg">
                        <p className="text-sm font-medium">{item.quantity}x {item.name}</p>
                        <p className="text-sm font-bold text-[#eab308]">Rs {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {orders && orders.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#141414] rounded-3xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-500">No orders found. Try a different phone number.</p>
          </div>
        )}

      </div>

      {/* Continue Shopping */}
      <div className="relative z-10 text-center mt-12">
        <Link to="/collection" className="inline-flex items-center gap-2 text-[#eab308] font-bold hover:underline">
          Continue Shopping <FiArrowRight />
        </Link>
      </div>

    </div>
  );
};

export default TrackOrder;
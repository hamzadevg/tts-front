import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiCheckCircle, FiClock, FiPackage, FiUser, FiX, 
  FiMapPin, FiPhone, FiMail, FiShoppingBag, FiArrowLeft, FiAlertTriangle 
} from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Confirm Popup State
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('confirm');
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/admin/orders`, { headers: { Authorization: `Bearer ${token}` } });
        const foundOrder = res.data.find(o => o._id === id);
        setOrder(foundOrder);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchOrder();
  }, [id]);

  const askToDeliver = () => {
    setPopupType('confirm');
    setPopupMessage('Are you sure you want to mark this order as Delivered?');
    setShowPopup(true);
  };

  const confirmDeliver = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/orders/${id}/deliver`, {}, { headers: { Authorization: `Bearer ${token}` } });
      
      setPopupType('success');
      setPopupMessage('Order has been marked as Delivered successfully!');
      setOrder(prev => ({ ...prev, isDelivered: true }));
    } catch (error) {
      setPopupType('error');
      setPopupMessage('Failed to update order.');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-gray-500">Order not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* GAP FIX: max-w-5xl mx-auto hata diya, ab w-full hoga */}
      <div className="space-y-6 w-full">
        
        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
            <div className="bg-[#111] border-2 border-[#eab308] rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
                popupType === 'success' ? 'bg-green-500/10 text-green-500' : popupType === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-[#eab308]/10 text-[#eab308]'
              }`}>
                {popupType === 'success' ? <FiCheckCircle size={32} /> : popupType === 'error' ? <FiX size={32} /> : <FiAlertTriangle size={32} />}
              </div>
              <h2 className="text-2xl font-serif text-white mb-2">
                {popupType === 'success' ? 'Success!' : popupType === 'error' ? 'Error!' : 'Confirm Action'}
              </h2>
              <p className="text-gray-400 text-sm mb-6">{popupMessage}</p>
              <div className="flex gap-3">
                {popupType === 'confirm' && (
                  <button onClick={() => setShowPopup(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
                )}
                <button onClick={() => { if (popupType === 'confirm') confirmDeliver(); else setShowPopup(false); }} className="flex-1 bg-[#eab308] hover:bg-[#facc15] text-black font-bold py-3 rounded-xl transition-all">
                  {popupType === 'confirm' ? 'Yes, Deliver' : 'OK'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 hover:border-[#eab308]/50 transition-all"
          >
            <FiArrowLeft size={16} /> Back to Orders
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#eab308] text-black rounded-xl flex items-center justify-center">
            <FiPackage size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif admin-text-primary">Order Details</h1>
            <p className="text-xs font-mono text-[#eab308] font-bold mt-1">#{order._id.toUpperCase()}</p>
          </div>
        </div>

        {/* 3 SMALL BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Customer */}
          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-[#eab308] mb-4">
              <FiUser size={16} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Customer</p>
            </div>
            <p className="text-sm font-bold admin-text-primary mb-2">{order.customerDetails?.fullName}</p>
            <p className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-1"><FiMail size={12}/> {order.customerDetails?.email}</p>
            <p className="text-[12px] text-gray-500 flex items-center gap-1.5"><FiPhone size={12}/> {order.customerDetails?.phone}</p>
          </div>

          {/* 2. Address */}
          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-[#eab308] mb-4">
              <FiMapPin size={16} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Shipping Address</p>
            </div>
            <p className="text-xs admin-text-secondary leading-relaxed">
              {order.customerDetails?.address1},<br/>
              {order.customerDetails?.address2 && `${order.customerDetails.address2}, `}
              {order.customerDetails?.city}
              {order.customerDetails?.postalCode && ` - ${order.customerDetails.postalCode}`}
            </p>
          </div>

          {/* 3. Status */}
          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-[#eab308] mb-4">
              <FiCheckCircle size={16} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Order Status</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full ${order.isDelivered ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
              {order.isDelivered ? <FiCheckCircle size={12} /> : <FiClock size={12} />}
              {order.isDelivered ? 'Delivered' : 'Pending / Processing'}
            </span>
            <p className="text-[11px] text-gray-500 mt-3">Payment: <span className="font-bold">{order.paymentMethod}</span></p>
          </div>
        </div>

        {/* 1 BIG BOX (Products List) */}
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm w-full">
          <div className="flex items-center gap-2 text-[#eab308] mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
            <FiShoppingBag size={16} />
            <p className="text-xs font-bold uppercase tracking-widest">Products Ordered ({order.orderItems.length})</p>
          </div>
          
          <div className="space-y-3">
            {order.orderItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-gray-50 dark:bg-[#0a0a0a] p-3 rounded-xl border border-gray-200 dark:border-gray-800">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-200" />
                <div className="flex-grow">
                  <p className="text-sm font-bold admin-text-primary">{item.name}</p>
                  <p className="text-[12px] text-gray-500">Qty: {item.quantity} × Rs {item.price.toLocaleString()}</p>
                </div>
                <p className="text-sm font-bold text-[#eab308]">Rs {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-5 pt-5 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-bold admin-text-secondary uppercase tracking-widest">Total Amount</p>
            <p className="text-2xl font-bold text-[#eab308]">Rs {order.totalPrice.toLocaleString()}</p>
          </div>
        </div>

        {/* Mark as Delivered Button */}
        {!order.isDelivered && (
          <div className="flex justify-end">
            <button 
              onClick={askToDeliver} 
              className="bg-[#eab308] hover:bg-[#facc15] text-black font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            >
              <FiCheckCircle size={18} /> Mark as Delivered
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetails;
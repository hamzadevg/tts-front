import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiMapPin, FiHome, FiTruck, FiCreditCard, FiShield, FiLock } from 'react-icons/fi';
import axios from 'axios';
import { API_URL } from '../services/api';
const CheckoutPopup = ({ cart, cartTotal, onClose, onSuccess }) => {
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail') || '';

  const [formData, setFormData] = useState({
    fullName: '', email: userEmail, phone: '',
    address1: '', address2: '', city: '', postalCode: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('Standard');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingCost = deliveryMethod === 'Express' ? 450 : 250;
  const finalTotal = cartTotal + shippingCost;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('`{API_URL}`/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(prev => ({
          ...prev,
          fullName: res.data.name || '',
          email: res.data.email || userEmail,
          phone: res.data.address?.phone || '',
          address1: res.data.address?.street || '',
          city: res.data.address?.city || '',
          postalCode: res.data.address?.postalCode || '',
        }));
      } catch (error) { console.log('No saved profile'); }
    };
    if (token && token !== 'dummy_token_123') fetchProfile();
  }, [token, userEmail]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const orderItems = cart.map(item => ({
        name: item.name, quantity: item.quantity, image: item.image,
        price: parseInt(item.price.replace(/[^0-9]/g, '')), product: item._id
      }));

      if (token === 'dummy_token_123') {
        onSuccess();
        return;
      }

      await axios.post(`${API_URL}/orders`, {

        orderItems, customerDetails: formData, deliveryMethod, paymentMethod, totalPrice: finalTotal,
      }, { headers: { Authorization: `Bearer ${token}` } });

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-gradient-to-br from-[#1a1408] to-[#0a0804] border border-[#eab308]/50 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.3)] relative max-h-[92vh] flex flex-col overflow-hidden">
        
        <button onClick={onClose} className="absolute top-3 right-3 z-20 text-[#eab308] hover:text-white bg-[#eab308]/10 hover:bg-[#eab308]/20 p-1.5 rounded-full transition-all">
          <FiX size={18} />
        </button>

        <div className="px-6 py-4 border-b border-[#eab308]/20 flex-shrink-0">
          <h2 className="text-xl font-serif text-white flex items-center gap-2">
            <FiLock className="text-[#eab308]" size={18} /> Complete Your Order
          </h2>
          <p className="text-gray-400 text-[11px] mt-1">Fill in your details to place your order securely.</p>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            
            {/* LEFT: FORM (Bade Inputs) */}
            <div className="lg:col-span-3 p-6 md:p-8">
              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4">{error}</div>}

              <form onSubmit={handlePlaceOrder} className="space-y-5">
                
                {/* Personal Info */}
                <div>
                  <h3 className="text-[12px] font-bold text-[#eab308] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FiUser size={14} /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">Full Name *</label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Enter your full name"
                          className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">Email *</label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@example.com"
                          className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">Phone *</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+92 300 1234567"
                        className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-[12px] font-bold text-[#eab308] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FiMapPin size={14} /> Shipping Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">Address Line 1 *</label>
                      <div className="relative">
                        <FiHome className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" required value={formData.address1} onChange={(e) => setFormData({...formData, address1: e.target.value})} placeholder="House No, Street, Area"
                          className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">Address Line 2 (Optional)</label>
                      <input type="text" value={formData.address2} onChange={(e) => setFormData({...formData, address2: e.target.value})} placeholder="Apartment, Floor, etc."
                        className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">City *</label>
                        <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="City"
                          className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 font-bold uppercase mb-1.5 block">Postal Code (Optional)</label>
                        <input type="text" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} placeholder="e.g. 54000"
                          className="w-full bg-black/40 border border-[#eab308]/30 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#eab308] selection:bg-[#eab308] selection:text-black" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <h3 className="text-[12px] font-bold text-[#eab308] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FiTruck size={14} /> Delivery Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${deliveryMethod === 'Standard' ? 'border-[#eab308] bg-[#eab308]/10' : 'border-[#eab308]/20 bg-black/20'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="delivery" checked={deliveryMethod === 'Standard'} onChange={() => setDeliveryMethod('Standard')} className="accent-[#eab308] w-4 h-4" />
                        <div>
                          <p className="text-sm font-bold text-white">Standard</p>
                          <p className="text-[11px] text-gray-400">3-5 days</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#eab308]">Rs. 250</p>
                    </label>
                    <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${deliveryMethod === 'Express' ? 'border-[#eab308] bg-[#eab308]/10' : 'border-[#eab308]/20 bg-black/20'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="delivery" checked={deliveryMethod === 'Express'} onChange={() => setDeliveryMethod('Express')} className="accent-[#eab308] w-4 h-4" />
                        <div>
                          <p className="text-sm font-bold text-white">Express</p>
                          <p className="text-[11px] text-gray-400">1-2 days</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#eab308]">Rs. 450</p>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-[12px] font-bold text-[#eab308] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FiCreditCard size={14} /> Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Cash on Delivery' ? 'border-[#eab308] bg-[#eab308]/10' : 'border-[#eab308]/20 bg-black/20'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'Cash on Delivery'} onChange={() => setPaymentMethod('Cash on Delivery')} className="accent-[#eab308] w-4 h-4" />
                      <div>
                        <p className="text-sm font-bold text-white">Cash on Delivery</p>
                        <p className="text-[11px] text-gray-400">Pay on arrival</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'Online Payment' ? 'border-[#eab308] bg-[#eab308]/10' : 'border-[#eab308]/20 bg-black/20'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === 'Online Payment'} onChange={() => setPaymentMethod('Online Payment')} className="accent-[#eab308] w-4 h-4" />
                      <div>
                        <p className="text-sm font-bold text-white">Online Payment</p>
                        <p className="text-[11px] text-gray-400">Card, JazzCash</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-[#eab308] to-[#facc15] hover:from-[#facc15] hover:to-[#eab308] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 mt-4 text-sm">
                  <FiLock size={16} /> {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#eab308]/20 via-black/40 to-black p-6 md:p-8 border-l border-[#eab308]/30 flex flex-col">
              <h3 className="text-xl font-serif text-white mb-4">Order Summary</h3>

              <div className="space-y-3 max-h-48 overflow-y-auto mb-4 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-black/30 p-2.5 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-white line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-[#eab308]">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-[#eab308]/30 pt-4">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>Rs. {cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-400"><span>Shipping</span><span>Rs. {shippingCost}</span></div>
                <div className="flex justify-between text-lg font-bold text-white border-t border-[#eab308]/30 pt-2 mt-2">
                  <span>Total</span><span className="text-[#eab308]">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5 p-3 bg-black/40 rounded-xl border border-[#eab308]/20">
                <div className="flex items-start gap-2.5">
                  <FiShield className="text-[#eab308] mt-0.5" size={16} />
                  <p className="text-[10px] text-gray-400 leading-relaxed">Your information is safe with us. We use industry-standard encryption.</p>
                </div>
              </div>

              <div className="mt-auto pt-5 text-center">
                <p className="font-serif italic text-xl text-[#eab308]">Thank You!</p>
                <p className="text-[11px] text-gray-400">For shopping with us</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiShield, FiRefreshCw, FiHeadphones, FiCheckCircle, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import CheckoutPopup from '../components/CheckoutPopup';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); 

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    setSelectedItems(cart.map(item => item._id));
  }, [cart]);

  const toggleItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]); 
    } else {
      setSelectedItems(cart.map(item => item._id)); 
    }
  };

  const cartItemsToCheckout = cart.filter(item => selectedItems.includes(item._id));

  const selectedTotal = cartItemsToCheckout.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return total + price * item.quantity;
  }, 0);

  const shipping = cartItemsToCheckout.length > 0 ? 200 : 0;
  const finalTotal = selectedTotal + shipping;

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (cartItemsToCheckout.length === 0) {
      alert('Please select at least one product to checkout.');
      return;
    }
    setShowCheckout(true);
  };

  const handleOrderSuccess = () => {
    setShowCheckout(false);
    setShowSuccess(true);
    selectedItems.forEach(id => removeFromCart(id));
  };

  const handleGoHome = () => {
    setShowSuccess(false);
    navigate('/');
  };

  const isAllSelected = cart.length > 0 && selectedItems.length === cart.length;

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-20 relative transition-colors duration-300">
      
      {showCheckout && (
        <CheckoutPopup 
          cart={cartItemsToCheckout} 
          cartTotal={selectedTotal} 
          onClose={() => setShowCheckout(false)}
          onSuccess={handleOrderSuccess}
        />
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-serif mb-3">Order Placed!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-8">
              Thank you for shopping with TTS Collection. You can track your order from your account.
            </p>
            <button onClick={handleGoHome} className="w-full bg-[#eab308] hover:bg-[#facc15] text-black font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              Go to Home
            </button>
          </div>
        </div>
      )}

      <div className="relative h-[250px] w-full bg-[#111] mb-[-100px]">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f0] dark:from-[#0a0a0a] to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-serif mb-2">Your Cart</h1>
          <p className="text-gray-400 text-sm">Good choices. Better style.</p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl pt-16">
        {cart.length === 0 && !showSuccess ? (
          <div className="text-center py-20 bg-white dark:bg-[#141414] rounded-3xl border border-gray-200 dark:border-gray-800">
            <FiShoppingBag size={60} className="mx-auto text-gray-300 dark:text-gray-700 mb-6" />
            <h2 className="text-3xl font-serif mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/collection" className="bg-[#eab308] hover:bg-[#facc15] text-black px-8 py-3.5 rounded-full font-bold transition-all duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          !showSuccess && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-4">
                
                {/* SELECT ALL BAR - CUSTOM GOLDEN BUTTON */}
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl flex justify-between items-center">
                  <button 
                    onClick={toggleSelectAll}
                    className="flex items-center gap-3 group"
                  >
                    {/* Custom Golden Checkbox */}
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                      isAllSelected 
                        ? 'bg-[#eab308] border-[#eab308] shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
                        : 'border-gray-400 dark:border-gray-600 group-hover:border-[#eab308]'
                    }`}>
                      {isAllSelected && <FiCheck size={16} className="text-black font-bold" strokeWidth={3} />}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#eab308] transition-colors">
                      Select All ({selectedItems.length}/{cart.length})
                    </span>
                  </button>
                  <p className="text-sm text-gray-500">
                    Selected Total: <span className="text-[#eab308] font-bold">Rs {selectedTotal.toLocaleString()}</span>
                  </p>
                </div>

                {/* Products List */}
                {cart.map((item) => {
                  const isSelected = selectedItems.includes(item._id);
                  return (
                    <div 
                      key={item._id} 
                      className={`bg-white dark:bg-[#141414] border p-4 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-300 ${
                        isSelected ? 'border-[#eab308]/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      
                      {/* CUSTOM GOLDEN CHECKBOX */}
                      <button 
                        onClick={() => toggleItem(item._id)}
                        className="flex-shrink-0 group"
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? 'bg-[#eab308] border-[#eab308] shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
                            : 'border-gray-400 dark:border-gray-600 group-hover:border-[#eab308]'
                        }`}>
                          {isSelected && <FiCheck size={16} className="text-black font-bold" strokeWidth={3} />}
                        </div>
                      </button>

                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      
                      <div className="flex-grow">
                        <h3 className="text-[15px] font-serif font-medium mb-1">{item.name}</h3>
                        <p className="text-[11px] text-gray-500 mb-2">{item.category}</p>
                        <p className="text-[15px] font-bold text-[#eab308]">{item.price}</p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <FiTrash2 size={18} />
                        </button>
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                          <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 text-gray-500 hover:text-[#eab308]"><FiMinus size={12} /></button>
                          <span className="px-2 text-[13px] font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 text-gray-500 hover:text-[#eab308]"><FiPlus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="flex justify-between items-center mt-6">
                  <Link to="/collection" className="text-[#eab308] text-sm font-medium flex items-center gap-2 hover:underline">
                    <FiArrowLeft /> Continue Shopping
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE - SUMMARY */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl sticky top-28">
                  <h2 className="text-2xl font-serif mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-[14px] mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({cartItemsToCheckout.length} items)</span>
                      <span>Rs {selectedTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>Rs {shipping}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-between font-bold text-[18px]">
                      <span>Total</span>
                      <span className="text-[#eab308]">Rs {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckoutClick} 
                    disabled={cartItemsToCheckout.length === 0}
                    className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 mb-6 ${
                      cartItemsToCheckout.length === 0 
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-[#eab308] hover:bg-[#facc15] text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                    }`}
                  >
                    Proceed to Checkout
                  </button>

                  <div className="grid grid-cols-3 gap-2 border-t border-gray-200 dark:border-gray-800 pt-6">
                    <div className="flex flex-col items-center text-center text-gray-500"><FiShield size={20} className="mb-1 text-[#eab308]" /><span className="text-[10px]">Secure<br/>Checkout</span></div>
                    <div className="flex flex-col items-center text-center text-gray-500"><FiRefreshCw size={20} className="mb-1 text-[#eab308]" /><span className="text-[10px]">Easy<br/>Returns</span></div>
                    <div className="flex flex-col items-center text-center text-gray-500"><FiHeadphones size={20} className="mb-1 text-[#eab308]" /><span className="text-[10px]">24/7<br/>Support</span></div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cart;
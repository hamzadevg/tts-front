import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiGrid, FiList, FiHeart, FiShoppingBag, FiSliders, FiMessageCircle, FiArrowUp, FiStar } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { API_URL } from '../services/api';

const Collection = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const handleScroll = () => { if (window.scrollY > 300) setShowTopBtn(true); else setShowTopBtn(false); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const formattedProduct = {
      ...product,
      id: product._id,
      price: `Rs ${product.price.toLocaleString()}`,
      oldPrice: product.oldPrice ? `Rs ${product.oldPrice.toLocaleString()}` : null
    };
    addToCart(formattedProduct);
  };

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-16 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#eab308] opacity-[0.1] dark:opacity-[0.05] blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 text-center pt-20 pb-10 px-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 tracking-wider">Collection</p>
        <h1 className="text-5xl md:text-6xl font-serif mb-3">All Products</h1>
        <p className="text-gray-500 text-[14px]">{loading ? 'Loading...' : `${products.length} products found`}</p>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input type="text" placeholder="Search products..." className="w-full bg-white dark:bg-[#141414] border border-gray-300 dark:border-gray-800 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:border-[#eab308]/50 text-[15px] transition-colors" />
          </div>
          <button className="bg-[#eab308] hover:bg-[#facc15] text-black px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]"><FiSearch size={18} /> Search</button>
          <button className="bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] border border-gray-300 dark:border-gray-800 px-8 py-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"><FiSliders size={18} /> Advanced</button>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium">Showing <span className="text-gray-900 dark:text-white">{products.length}</span> products</p>
        <div className="flex items-center gap-1 bg-white dark:bg-[#141414] border border-gray-300 dark:border-gray-800 p-1 rounded-xl">
          <button className="bg-[#eab308]/10 text-[#eab308] p-2 rounded-lg"><FiGrid size={18} /></button>
          <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg"><FiList size={18} /></button>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="group relative flex flex-col bg-transparent">
                <div className="relative aspect-[4/5] bg-gray-200 dark:bg-[#141414] rounded-2xl overflow-hidden mb-4 border border-transparent dark:border-gray-800/50 group-hover:border-[#eab308]/30 transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.isSale && <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">SALE</div>}
                  {product.quantity <= 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">Out of Stock</span>
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:text-[#eab308] hover:bg-black/60 transition-colors z-20"><FiHeart size={18} /></button>
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/80 to-transparent pt-12 z-20">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)} 
                      disabled={product.quantity <= 0}
                      className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg ${product.quantity <= 0 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-white/95 backdrop-blur-md text-black hover:bg-[#eab308]'}`}
                    >
                      <FiShoppingBag size={18} /> {product.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1.5">{product.category}</p>
                  <h3 className="text-[15px] font-serif font-medium leading-tight mb-2 group-hover:text-[#eab308] transition-colors cursor-pointer">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-gray-400 dark:text-gray-600">
                      {[...Array(5)].map((_, i) => (<FiStar key={i} size={12} className={i < Math.floor(product.rating) ? "fill-[#eab308] text-[#eab308]" : "text-gray-400 dark:text-gray-600"} />))}
                    </div>
                    <span className="text-[11px] text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-[16px] font-bold text-[#eab308]">Rs {product.price.toLocaleString()}</span>
                    {product.oldPrice && <span className="text-[13px] text-gray-500 line-through">Rs {product.oldPrice.toLocaleString()}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <a href="#" className="fixed bottom-8 left-8 bg-[#25D366] p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-50 text-black"><FiMessageCircle size={24} /></a>
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 hover:bg-[#eab308] hover:text-black hover:border-[#eab308] p-3.5 rounded-full shadow-lg transition-all duration-500 z-50 text-gray-600 dark:text-gray-300 transform active:scale-90 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}><FiArrowUp size={20} strokeWidth={1.5} /></button>
    </div>
  );
};

export default Collection;
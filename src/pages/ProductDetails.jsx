import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiShoppingBag, FiStar, FiTruck, FiShield, FiRefreshCw, FiMinus, FiPlus, FiHeart, FiCheckCircle } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { API_URL } from '../services/api';
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.image);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      category: product.category,
      price: `Rs ${product.price.toLocaleString()}`,
      oldPrice: product.discountPrice ? `Rs ${product.discountPrice.toLocaleString()}` : null,
      image: product.image,
      quantity: quantity,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-3xl font-serif mb-4">Product Not Found</h2>
        <Link to="/collection" className="bg-[#eab308] text-black px-6 py-3 rounded-full font-bold">Back to Collection</Link>
      </div>
    );
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pb-20 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#eab308] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl pt-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#eab308] mb-8 text-sm font-medium transition-colors">
          <FiArrowLeft /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <div className="relative aspect-square bg-[#141414] rounded-3xl overflow-hidden border border-[#eab308]/30 shadow-[0_0_40px_rgba(234,179,8,0.15)]">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">-{product.discountPercent}% OFF</div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {gallery.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#eab308]/10 border border-[#eab308]/30 text-[#eab308] px-3 py-1.5 rounded-full text-xs font-bold w-fit mb-4">
              <FaCrown size={10} /> {product.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{product.name}</h1>

            <p className="text-gray-400 text-[15px] leading-relaxed mb-6">
              {product.description || 'Crafted with premium materials and attention to detail.'}
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#eab308]">Rs {product.price.toLocaleString()}</span>
              {product.discountPrice && <span className="text-xl text-gray-500 line-through">Rs {product.discountPrice.toLocaleString()}</span>}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-[#eab308]">
                {[...Array(5)].map((_, i) => (<FiStar key={i} size={18} className={i < Math.floor(product.rating) ? "fill-[#eab308]" : "text-gray-600"} />))}
              </div>
              <span className="text-sm text-gray-400">{product.rating} ({product.reviews || 0} reviews)</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8 bg-[#141414] border border-[#eab308]/20 rounded-2xl p-4">
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${product.quantity > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}><FiCheckCircle size={16} /></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">In Stock</span>
                <span className="text-[10px] text-gray-500">{product.quantity} available</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#eab308]/20 text-[#eab308] flex items-center justify-center mb-2"><FiTruck size={16} /></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Free Delivery</span>
                <span className="text-[10px] text-gray-500">All Pakistan</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#eab308]/20 text-[#eab308] flex items-center justify-center mb-2"><FiRefreshCw size={16} /></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">7-Day Return</span>
                <span className="text-[10px] text-gray-500">Easy policy</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center bg-[#141414] border-2 border-[#eab308]/30 rounded-xl overflow-hidden w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-[#eab308]/10 transition-colors"><FiMinus size={16} /></button>
                <span className="px-6 text-lg font-bold min-w-[60px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-[#eab308]/10 transition-colors"><FiPlus size={16} /></button>
              </div>
              <button onClick={handleAddToCart} disabled={product.quantity === 0}
                className="flex-grow bg-gradient-to-r from-[#eab308] to-[#facc15] hover:from-[#facc15] hover:to-[#eab308] text-black font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50">
                <FiShoppingBag size={20} /> {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="border-2 border-[#eab308]/30 hover:border-red-500 hover:text-red-500 p-3.5 rounded-xl transition-colors"><FiHeart size={20} /></button>
            </div>

            <div className="bg-[#141414] border border-[#eab308]/20 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><FiCheckCircle className="text-[#eab308]" /> Product Description</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{product.description || 'Premium quality product for everyday use.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
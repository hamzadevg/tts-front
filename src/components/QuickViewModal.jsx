import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingBag, FiStar, FiArrowRight, FiHeart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      category: product.category,
      price: `Rs ${product.price.toLocaleString()}`,
      oldPrice: product.discountPrice ? `Rs ${product.discountPrice.toLocaleString()}` : null,
      image: product.image,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={onClose}>
      <div 
        className="w-full max-w-4xl bg-[#0f0f0f] border border-[#eab308]/30 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden relative grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-[#eab308] text-black p-2 rounded-full hover:scale-110 transition-transform">
          <FiX size={20} />
        </button>

        {/* Left: Image */}
        <div className="relative h-[300px] md:h-full bg-[#1a1a1a]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{product.discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <p className="text-[#eab308] text-[10px] font-bold tracking-widest uppercase mb-2">{product.category}</p>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">{product.name}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-[#eab308]">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#eab308]" : ""} />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#eab308]">Rs {product.price.toLocaleString()}</span>
            {product.discountPrice && (
              <span className="text-lg text-gray-500 line-through">Rs {product.discountPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {product.description || 'No description available for this product.'}
          </p>

          {/* Stock Status */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className={product.quantity > 0 ? 'text-green-500' : 'text-red-500'}>
              {product.quantity > 0 ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="w-full bg-[#eab308] hover:bg-[#facc15] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
              <FiShoppingBag size={18} /> {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <Link 
              to={`/product/${product._id}`}
              onClick={onClose}
              className="w-full border border-[#eab308]/50 text-[#eab308] hover:bg-[#eab308]/10 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              View Full Details <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
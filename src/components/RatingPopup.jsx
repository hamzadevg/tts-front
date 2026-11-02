import React, { useState } from 'react';
import { FiX, FiStar, FiSend, FiCheckCircle } from 'react-icons/fi';

const RatingPopup = ({ product, orderId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSuccess({ orderId, productId: product.product, rating, comment });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#1a1408] to-[#0a0804] border border-[#eab308]/50 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.3)] p-6 relative">
        
        <button onClick={onClose} className="absolute top-3 right-3 text-[#eab308] hover:text-white bg-[#eab308]/10 p-1.5 rounded-full">
          <FiX size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#eab308]/10 text-[#eab308] rounded-full flex items-center justify-center mx-auto mb-3">
            <FiStar size={32} fill="#eab308" />
          </div>
          <h2 className="text-2xl font-serif text-white">Rate Your Product</h2>
          <p className="text-xs text-gray-400 mt-1">{product.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110"
              >
                <FiStar 
                  size={36} 
                  className={`transition-colors ${
                    star <= (hover || rating) 
                      ? 'text-[#eab308] fill-[#eab308]' 
                      : 'text-gray-600'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Comment */}
          <div>
            <label className="text-[10px] font-bold text-[#eab308] uppercase tracking-widest mb-2 block">Your Review (Optional)</label>
            <textarea 
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you liked or disliked about this product..."
              className="w-full bg-black/40 border border-[#eab308]/30 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#eab308] resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#eab308] to-[#facc15] hover:from-[#facc15] hover:to-[#eab308] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50"
          >
            {loading ? 'Submitting...' : <><FiSend size={16} /> Submit Review</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingPopup;
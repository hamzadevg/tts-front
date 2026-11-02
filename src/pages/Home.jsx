import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiSearch, FiGrid, FiTruck, FiShield, FiTag, FiRefreshCw, FiMessageCircle, FiArrowUp, FiCheck, FiX, FiPlus, FiMinus, FiStar } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { API_URL } from '../services/api';
// ==========================================
// ANIMATED COUNTER COMPONENT
// ==========================================
const AnimatedCounter = ({ endValue, duration = 2000, suffix = '', isDecimal = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const startValue = 0;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setCount(currentValue);
      if (percentage < 1) requestAnimationFrame(animate);
      else setCount(endValue);
    };
    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);

  const formatValue = (val) => {
    if (isDecimal) return val.toFixed(1);
    if (val >= 1000) {
      const kValue = val / 1000;
      const formatted = kValue % 1 === 0 ? kValue.toFixed(0) : kValue.toFixed(1);
      return `${formatted}K${suffix}`;
    }
    if (val >= 100) {
      const rounded = Math.floor(val / 100) * 100;
      return `${rounded}${suffix}`;
    }
    return Math.floor(val) + suffix;
  };

  return <span ref={ref} className="font-serif font-bold tracking-tight">{formatValue(count)}</span>;
};

// ==========================================
// AOS COMPONENT (Sirf Ek Dafa Chalega)
// ==========================================
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const hasAnimated = useRef(false); // Ye track karega ke animation ho chuki hai

  useEffect(() => {
    // Agar pehle hi animate ho chuka hai, toh kuch mat karo
    if (hasAnimated.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true; // Mark kar do ke ho gaya
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100';
    switch (direction) {
      case 'left': return '-translate-x-20 translate-y-0 opacity-0';
      case 'right': return 'translate-x-20 translate-y-0 opacity-0';
      case 'up':
      default: return 'translate-x-0 translate-y-12 opacity-0';
    }
  };

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }} 
      className={`transition-all duration-1000 ease-out ${getTransformClass()}`}
    >
      {children}
    </div>
  );
};


const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 6000, rating: 4.8 });

  useEffect(() => {
    const handleScroll = () => { if (window.scrollY > 300) setShowTopBtn(true); else setShowTopBtn(false); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsRes = await axios.get(`${API_URL}/products`);
        setStats(prev => ({ ...prev, totalProducts: productsRes.data.length }));
      } catch (error) {
        console.log("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
  };

  const categories = [
    { title: 'Undergarments', desc: 'Vests, briefs, boxers, camisoles', icon: <FiGrid size={24} />, color: 'text-red-500' },
    { title: 'Peshawari Chappals', desc: 'Handmade leather, Kaptaan, Kheri style', icon: <FiShoppingBag size={24} />, color: 'text-[#eab308]' },
    { title: 'Footwear', desc: 'Shoes, sandals, khussa, joggers', icon: <FiTruck size={24} />, color: 'text-green-500' },
    { title: 'Fabrics & Suits', desc: 'Unstitched, lawn, cotton, khaddar', icon: <FiTag size={24} />, color: 'text-blue-500' },
  ];

  const products = [
    { id: 1, name: 'Premium Brown Peshawari Chappal', category: 'Peshawari Chappals', price: 'Rs 4,500', oldPrice: null, rating: 5, reviews: 12, isSale: false, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800' },
    { id: 2, name: 'Classic Kaptaan Chappal Black', category: 'Peshawari Chappals', price: 'Rs 3,800', oldPrice: 'Rs 4,200', rating: 4.5, reviews: 8, isSale: true, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800' },
    { id: 3, name: 'Minimalist White Sneakers', category: 'Footwear', price: 'Rs 3,200', oldPrice: null, rating: 4.5, reviews: 15, isSale: false, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800' },
    { id: 4, name: 'Vintage Denim Jacket', category: 'Outerwear', price: 'Rs 7,500', oldPrice: 'Rs 9,000', rating: 5, reviews: 34, isSale: true, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800' },
  ];

  const reviews = [
    { name: 'Ahmed Khan', location: 'Toba Tek Singh', text: '"Ordered 3 Peshawari chappals for my brothers from Toba Tek Singh. Original leather, perfect stitching, delivered to my door in 2 days. Better than going to the bazaar."', initial: 'AK' },
    { name: 'Sana Rehman', location: 'Shop Owner, Gojra', text: '"We run a small garments shop in Gojra and order undergarments in bulk from here. Quality is consistent, prices are fair, and returns for size issues are painless."', initial: 'SR' },
    { name: 'Muhammad Nawaz', location: 'Toba Tek Singh', text: '"Bought cotton vests and boxers for my father. Soft fabric, no shrinkage after wash, and cash on delivery was smooth. Will order again."', initial: 'MN' },
  ];

  const faqs = [
    { q: 'How do I know which size will fit me?', a: 'Every product page has a detailed size chart with chest, waist, and length measurements. If you\'re between sizes, we recommend sizing up for undergarments.' },
    { q: 'Are the Peshawari chappals genuine leather?', a: 'Yes, 100%. We source directly from local artisans in Khyber Pakhtunkhwa. Every pair is hand-stitched using genuine leather, ensuring durability and comfort.' },
    { q: 'Do you offer cash on delivery?', a: 'Absolutely. We offer cash on delivery across Toba Tek Singh and surrounding areas. Same-day delivery is available for orders placed before 2 PM.' },
    { q: 'What is your return and exchange policy?', a: 'We offer a 7-day easy exchange policy. If the size doesn\'t fit or you receive a damaged product, just WhatsApp us and we\'ll arrange a pickup.' },
  ];

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-16 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[#eab308] opacity-[0.1] dark:opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* 1. HERO SECTION */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimateOnScroll direction="left" id="hero-text">
          <div>
            <div className="inline-flex items-center gap-2 text-[#eab308] text-[12px] font-bold tracking-widest mb-6"><span className="text-lg">✦</span> SERVING TOBA TEK SINGH SINCE 2018</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6">Undergarments.<br/><span className="text-[#eab308]">Peshawari Chappals.</span><br/>Delivered Fast.</h1>
            <p className="text-gray-600 dark:text-gray-400 text-[16px] leading-relaxed mb-8 max-w-lg">Toba Tek Singh's trusted online store for premium undergarments, handmade Peshawari chappals, footwear, and fabrics. Order from your phone — cash on delivery.</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/collection" className="bg-[#eab308] hover:bg-[#facc15] text-black px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]">Shop Now <FiArrowRight /></Link>
              <button className="border border-gray-300 dark:border-gray-700 hover:border-gray-500 text-gray-900 dark:text-white px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 transition-colors"><FiSearch /> Browse by Category</button>
            </div>
            <div className="inline-flex items-center gap-6 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 shadow-sm dark:shadow-none">
              <span className="text-[13px] text-gray-600 dark:text-gray-300 flex items-center gap-2">🇵🇰 Same-Day Delivery</span>
              <span className="text-[13px] text-[#eab308] flex items-center gap-1"><FiStar className="fill-[#eab308]" /> 4.8 · 6,000+ Orders</span>
            </div>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right" delay={200} id="hero-image">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_40px_rgba(234,179,8,0.1)]">
            <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800" alt="Shoes" className="w-full h-full object-cover" />
          </div>
        </AnimateOnScroll>
      </div>

      {/* 2. STATS BAR */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
        <AnimateOnScroll direction="up" id="stats-bar">
          <div className="border-y border-gray-300 dark:border-gray-800 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-colors duration-300">
            <div>
              <h3 className="text-4xl md:text-5xl font-serif text-[#eab308] mb-1"><AnimatedCounter endValue={stats.totalProducts} suffix="+" /></h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Items in Stock</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-serif text-[#eab308] mb-1"><AnimatedCounter endValue={stats.totalOrders} suffix="+" /></h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Orders Delivered</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-serif text-[#eab308] mb-1 flex items-center justify-center gap-1">
                <AnimatedCounter endValue={stats.rating} suffix="" isDecimal={true} />
                <FiStar className="fill-[#eab308] mb-2" size={24} />
              </h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Customer Rating</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-serif text-[#eab308] mb-1">7-Day</h3>
              <p className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Exchange Policy</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* 3. SHOP BY CATEGORY */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
        <AnimateOnScroll direction="up" id="shop-category-heading">
          <div className="mb-8">
            <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> Shop By Category</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-2">What are you looking for today?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-[15px]">From everyday essentials to traditional footwear — everything verified for quality, delivered to your door.</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => (
            <AnimateOnScroll key={idx} delay={idx * 100} direction="up" id={`category-${idx}`}>
              <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl hover:border-[#eab308]/50 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] transition-all duration-300 group cursor-pointer h-full">
                <div className={`mb-4 ${cat.color}`}>{cat.icon}</div>
                <h3 className="text-lg font-serif mb-1">{cat.title}</h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">{cat.desc}</p>
                <p className="text-[#eab308] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Browse <FiArrowRight size={14} /></p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 4. TOP PICKS */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
        <AnimateOnScroll direction="up" id="top-picks-heading">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> Best Sellers</p>
              <h2 className="text-4xl md:text-5xl font-serif">Top Picks This Week</h2>
            </div>
            <Link to="/collection" className="text-[#eab308] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <FiArrowRight size={14} /></Link>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <AnimateOnScroll key={product.id} delay={idx * 100} direction="up" id={`top-product-${product.id}`}>
              <div className="group relative flex flex-col bg-transparent h-full">
                <div className="relative aspect-[4/5] bg-gray-200 dark:bg-[#141414] rounded-2xl overflow-hidden mb-4 border border-transparent dark:border-gray-800/50 group-hover:border-[#eab308]/30 transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.isSale && <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">SALE</div>}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/90 to-transparent pt-12">
                    <button onClick={(e) => handleAddToCart(e, product)} className="w-full bg-white/95 backdrop-blur-md text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#eab308] transition-colors shadow-lg"><FiShoppingBag size={18} /> Add to Cart</button>
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
                    <span className="text-[16px] font-bold text-[#eab308]">{product.price}</span>
                    {product.oldPrice && <span className="text-[13px] text-gray-500 line-through">{product.oldPrice}</span>}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 5. SIZE GUIDE */}
      <AnimateOnScroll direction="up" id="size-guide">
        <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#111] p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-800/50 transition-colors duration-300">
          <div>
            <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> Need help choosing the right size?</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Tell us what you need.<br/><span className="text-[#eab308] italic">We'll sort it out.</span></h2>
            <p className="text-gray-600 dark:text-gray-400 text-[15px] mb-6">Not sure about sizing or which chappal style suits you? Send us a WhatsApp message with your measurements. Our team will recommend the right product and reserve it for you — within 15 minutes.</p>
            <ul className="space-y-3 mb-8 text-[14px] text-gray-700 dark:text-gray-300">
              {['Free size consultation via WhatsApp', 'Genuine leather Peshawari chappals', 'Soft, breathable undergarments', 'Wholesale & bulk pricing'].map((item, i) => (<li key={i} className="flex items-center gap-3"><FiCheck className="text-[#eab308]" /> {item}</li>))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#eab308] hover:bg-[#facc15] text-black px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300"><FiGrid /> Browse Categories</button>
              <button className="border border-gray-300 dark:border-gray-700 hover:border-gray-500 px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 transition-colors"><FiMessageCircle /> Talk to Us on WhatsApp</button>
            </div>
          </div>
          <div className="space-y-4">
            {categories.slice(0, 3).map((cat, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl flex items-center gap-4 transition-colors">
                <div className="bg-[#eab308]/10 text-[#eab308] p-3 rounded-xl">{cat.icon}</div>
                <div><h4 className="font-serif text-lg">{cat.title}</h4><p className="text-gray-500 text-sm">{cat.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* 6. NEW ARRIVALS */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
        <AnimateOnScroll direction="up" id="new-arrivals-heading">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> Fresh Stock</p>
              <h2 className="text-4xl md:text-5xl font-serif">New Arrivals</h2>
            </div>
            <Link to="/collection" className="text-[#eab308] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <FiArrowRight size={14} /></Link>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 2).map((product, idx) => (
            <AnimateOnScroll key={product.id} delay={idx * 100} direction="up" id={`new-product-${product.id}`}>
              <div className="group relative flex flex-col bg-transparent h-full">
                <div className="relative aspect-[4/5] bg-gray-200 dark:bg-[#141414] rounded-2xl overflow-hidden mb-4 border border-transparent dark:border-gray-800/50 group-hover:border-[#eab308]/30 transition-all duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.isSale && <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">SALE</div>}
                </div>
                <div className="flex flex-col px-1">
                  <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1.5">{product.category}</p>
                  <h3 className="text-[15px] font-serif font-medium leading-tight mb-2 group-hover:text-[#eab308] transition-colors cursor-pointer">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-auto"><span className="text-[16px] font-bold text-[#eab308]">{product.price}</span></div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 7. WHY CHOOSE US */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
        <AnimateOnScroll direction="up" id="why-choose-us-heading">
          <div className="mb-8">
            <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-2">Real quality. Real fast. Real simple.</h2>
            <p className="text-gray-600 dark:text-gray-400 text-[15px]">We're not a random online seller. We stock what we sell, and we stand behind every item that ships.</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: <FiTruck size={24}/>, title: 'Same-Day Delivery', desc: 'Order before 2 PM and get it the same day in Toba Tek Singh city.' },
            { icon: <FiShield size={24}/>, title: 'Genuine or Refunded', desc: 'Every item is quality-checked before dispatch. Fake or damaged? Full refund.' },
            { icon: <FiTag size={24}/>, title: 'Honest Pricing', desc: 'Fixed online prices with no haggling. Wholesale rates available for shops.' },
            { icon: <FiRefreshCw size={24}/>, title: '7-Day Exchange', desc: 'Size doesn\'t fit? We\'ll pick it up and send the right size. No arguments.' },
          ].map((item, idx) => (
            <AnimateOnScroll key={idx} delay={idx * 100} direction="up" id={`why-card-${idx}`}>
              <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl hover:border-[#eab308]/50 transition-all duration-300 h-full">
                <div className="bg-[#eab308]/10 text-[#eab308] p-3 rounded-xl inline-block mb-4">{item.icon}</div>
                <h3 className="text-lg font-serif mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 8. COMPARISON TABLE */}
      <AnimateOnScroll direction="up" id="comparison-table">
        <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
          <div className="mb-8">
            <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> The Honest Difference</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-2">Buying from us vs. going to the bazaar</h2>
            <p className="text-gray-600 dark:text-gray-400 text-[15px]">We're not saying the local bazaar is bad. Just that we're faster, more convenient, and more accountable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
            <div className="bg-white dark:bg-[#141414] p-8 md:p-12">
              <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">The Local Bazaar</h3>
              <h4 className="text-2xl font-serif mb-6">What you're used to</h4>
              <ul className="space-y-4 text-[14px] text-gray-700 dark:text-gray-300">
                {['Walk from shop to shop', 'Negotiate price every time', 'Fake or low-quality items', 'No bill, no exchange, no returns', 'No idea what\'s in stock'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><FiX className="text-red-500 mt-1 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-[#eab308] p-8 md:p-12 text-black">
              <h3 className="text-xs font-bold tracking-widest text-black/60 uppercase mb-6">With Our Store</h3>
              <h4 className="text-2xl font-serif mb-6">The modern way</h4>
              <ul className="space-y-4 text-[14px] font-medium">
                {['Live stock shown — order in 60 seconds', 'Fixed online prices — no surprises', '100% quality-checked', 'Digital receipt + 7-day exchange', 'Same-day delivery in Toba Tek Singh'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><FiCheck className="mt-1 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* 9. CUSTOMER REVIEWS */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl mb-20">
        <AnimateOnScroll direction="up" id="reviews-heading">
          <div className="mb-8">
            <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2"><span className="text-lg">✦</span> Customer Reviews</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-2">What customers say</h2>
            <p className="text-gray-600 dark:text-gray-400 text-[15px]">6,000+ orders delivered across Toba Tek Singh district — here's what a few customers think.</p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <AnimateOnScroll key={idx} delay={idx * 150} direction="up" id={`review-card-${idx}`}>
              <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl flex flex-col justify-between transition-colors h-full">
                <div>
                  <div className="flex gap-1 text-[#eab308] mb-4">{[...Array(5)].map((_, i) => <FiStar key={i} className="fill-[#eab308]" size={16} />)}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-[14px] leading-relaxed italic mb-6">{rev.text}</p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-[#eab308] text-black rounded-full flex items-center justify-center font-bold text-sm">{rev.initial}</div>
                  <div><h4 className="text-[14px] font-bold text-gray-900 dark:text-white">{rev.name}</h4><p className="text-[12px] text-gray-500">{rev.location}</p></div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 10. FAQ SECTION */}
      <div className="relative z-10 container mx-auto px-6 max-w-4xl mb-20">
        <AnimateOnScroll direction="up" id="faq-heading">
          <div className="mb-8 text-center">
            <p className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2"><span className="text-lg">✦</span> FAQs</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 text-[15px]">Can't find your answer? WhatsApp us anytime — we reply fast.</p>
          </div>
        </AnimateOnScroll>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <AnimateOnScroll key={idx} delay={idx * 100} direction="up" id={`faq-card-${idx}`}>
              <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
                <button onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                  <h4 className="text-[16px] font-bold text-gray-900 dark:text-white pr-4">{faq.q}</h4>
                  <div className={`p-1.5 rounded-full ${openFaq === idx ? 'bg-[#eab308] text-black' : 'bg-[#eab308]/10 text-[#eab308]'}`}>{openFaq === idx ? <FiMinus size={16} /> : <FiPlus size={16} />}</div>
                </button>
                <div className={`px-6 pb-6 text-gray-600 dark:text-gray-400 text-[14px] leading-relaxed ${openFaq === idx ? 'block' : 'hidden'}`}>{faq.a}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* 11. FINAL CTA */}
      <AnimateOnScroll direction="up" id="final-cta">
        <div className="relative z-10 container mx-auto px-6 max-w-5xl mb-10">
          <div className="bg-gray-100 dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#0a0a0a] border border-gray-200 dark:border-gray-800/80 rounded-3xl p-12 md:p-16 text-center flex flex-col items-center justify-center shadow-lg dark:shadow-[0_0_30px_rgba(234,179,8,0.05)] relative overflow-hidden transition-colors duration-300">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif mb-4">Ready to shop <span className="text-[#eab308]">smart?</span></h2>
              <p className="text-gray-600 dark:text-gray-400 text-[15px] max-w-2xl mx-auto mb-8">Quality undergarments, handmade Peshawari chappals, and more — delivered same-day in Toba Tek Singh.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/collection" className="bg-[#eab308] hover:bg-[#facc15] text-black px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]">Shop Now <FiArrowRight /></Link>
                <button className="border border-gray-400 dark:border-gray-700 hover:border-gray-600 px-8 py-3.5 rounded-full font-medium text-sm transition-colors">Become a Wholesale Buyer</button>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Floating Buttons */}
      <a href="#" className="fixed bottom-8 left-8 bg-[#25D366] p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-50 text-black"><FiMessageCircle size={24} /></a>
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 hover:bg-[#eab308] hover:text-black hover:border-[#eab308] p-3.5 rounded-full shadow-lg transition-all duration-500 z-50 text-gray-600 dark:text-gray-300 transform active:scale-90 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}><FiArrowUp size={20} strokeWidth={1.5} /></button>
    </div>
  );
};

export default Home;
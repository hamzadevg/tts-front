import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiStar, FiArrowLeft, FiArrowUp, FiMessageCircle } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const CategoryPage = ({ 
  pageTitle, 
  pageTitleHighlight, 
  pageDescription, 
  categories, 
  backLink = "/collection" 
}) => {
  const { addToCart } = useContext(CartContext);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // ==========================================
  // SCROLL LOGIC (Jab Navbar se click karke aao)
  // ==========================================
  useEffect(() => {
    const jumpTarget = searchParams.get('jump');
    
    if (jumpTarget) {
      // Thoda wait karo taake page render ho jaye
      const timer = setTimeout(() => {
        const element = document.getElementById(jumpTarget);
        if (element) {
          // Navbar ki height (80px) + Offer bar (30px) + Jump To bar (50px) = ~160px
          const yOffset = -160;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 500); // 500ms ka delay

      return () => clearTimeout(timer);
    }
  }, [searchParams, location.pathname]);

  // Scroll to Top Button Logic
  useEffect(() => {
    const handleScroll = () => { if (window.scrollY > 300) setShowTopBtn(true); else setShowTopBtn(false); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // ==========================================
  // MANUAL SCROLL (Jab "Jump To" bar par click karo)
  // ==========================================
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -160; // Navbar + Jump To bar ki height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f8f6f0] dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-white pb-20 relative transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#eab308] opacity-[0.1] dark:opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-16 pb-12">
        <Link to={backLink} className="text-[#eab308] text-sm font-medium flex items-center gap-2 hover:underline mb-6 w-fit">
          <FiArrowLeft /> Back to Collection
        </Link>
        <h1 className="text-5xl md:text-6xl font-serif mb-4">
          {pageTitle} <span className="text-[#eab308] italic">{pageTitleHighlight}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-[16px] max-w-2xl">{pageDescription}</p>
      </div>

      {/* QUICK NAVIGATION BAR (STICKY) */}
      <div className="sticky top-[80px] z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-y border-gray-200 dark:border-gray-800 py-3 mb-12 shadow-sm">
        <div className="container mx-auto px-6 max-w-7xl flex items-center gap-6 overflow-x-auto">
          <span className="text-[12px] font-bold tracking-widest text-gray-500 uppercase shrink-0">Jump To:</span>
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => scrollToSection(cat.id)} 
              className="text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#eab308] transition-colors whitespace-nowrap"
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORIES & PRODUCTS */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {categories.map((category) => (
          <div key={category.id} id={category.id} className="mb-20 scroll-mt-40">
            
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-[#eab308] rounded-full"></span>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <span className="text-[#eab308] italic">{category.title}</span>
                </h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-[15px] max-w-2xl">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {category.products.map((product) => (
                <div key={product.id} className="group relative flex flex-col bg-transparent">
                  <div className="relative aspect-[4/5] bg-gray-200 dark:bg-[#141414] rounded-2xl overflow-hidden mb-4 border border-transparent dark:border-gray-800/50 group-hover:border-[#eab308]/30 transition-all duration-300">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.isSale && <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">SALE</div>}
                    
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/90 to-transparent pt-12">
                      <button onClick={(e) => handleAddToCart(e, product)} className="w-full bg-white/95 backdrop-blur-md text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#eab308] transition-colors shadow-lg">
                        <FiShoppingBag size={18} /> Add to Cart
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
                      <span className="text-[16px] font-bold text-[#eab308]">{product.price}</span>
                      {product.oldPrice && <span className="text-[13px] text-gray-500 line-through">{product.oldPrice}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mt-16"></div>
          </div>
        ))}
      </div>

      <a href="#" className="fixed bottom-8 left-8 bg-[#25D366] p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 z-50 text-black"><FiMessageCircle size={24} /></a>
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 hover:bg-[#eab308] hover:text-black hover:border-[#eab308] p-3.5 rounded-full shadow-lg transition-all duration-500 z-50 text-gray-600 dark:text-gray-300 transform active:scale-90 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}><FiArrowUp size={20} strokeWidth={1.5} /></button>
    </div>
  );
};

export default CategoryPage;
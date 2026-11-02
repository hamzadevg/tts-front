import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiInstagram, FiFacebook, FiTwitter, FiSun, FiMoon, FiUser, FiLogOut, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('garments');
  const [activeSubItem, setActiveSubItem] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(loginStatus === 'true');
    setUserName(name || 'Account');
  }, [location.pathname]); 

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/'); 
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const garmentsData = [
    { title: 'Handmade Chappels', subItems: ['Kheri Style', 'Kaptaan Style', 'Noroozi Style', 'Quetta Style'] },
    { title: 'Shoes', subItems: ['Sneakers', 'Loafers', 'Oxfords', 'Sandals'] },
    { title: 'Clothes', subItems: ['T-Shirts', 'Hoodies', 'Shirts', 'Jackets'] },
    { title: 'Fabrics', subItems: ['Unstitched Lawn', 'Cotton', 'Khaddar', 'Silk'] },
    { title: 'Jewelleries', subItems: ['Rings', 'Bracelets', 'Necklaces', 'Earrings'] }
  ];

  const femalesData = [
    { title: 'Dresses', subItems: ['Lawn Suits', 'Silk Dresses', 'Casual Wear', 'Formal Wear'] },
    { title: 'Handbags', subItems: ['Tote Bags', 'Clutches', 'Shoulder Bags', 'Backpacks'] },
    { title: 'Footwear', subItems: ['Heels', 'Flats', 'Khussa', 'Sneakers'] },
    { title: 'Jewellery', subItems: ['Bangles', 'Earrings', 'Necklaces', 'Rings'] },
    { title: 'Fabrics', subItems: ['Chiffon', 'Lawn', 'Silk', 'Velvet'] }
  ];

  const currentData = activeTab === 'garments' ? garmentsData : femalesData;

  // ==========================================
  // CLICK HANDLER (URL mein ?jump= add karta hai)
  // ==========================================
  const handleSubItemClick = (subItem, categoryTitle) => {
    setActiveSubItem(subItem);
    setIsDropdownOpen(false);
    
    let categoryId = subItem.toLowerCase().replace(/ /g, '-');
    let baseRoute = '/collection';

    if (activeTab === 'garments') {
      if (subItem === 'Kheri Style') categoryId = 'kheri';
      if (subItem === 'Kaptaan Style') categoryId = 'kaptaan';
      if (subItem === 'Noroozi Style') categoryId = 'noroozi';
      if (subItem === 'Quetta Style') categoryId = 'quetta';
      if (subItem === 'T-Shirts') categoryId = 'tshirts';
      if (subItem === 'Unstitched Lawn') categoryId = 'lawn';
      
      if (categoryTitle === 'Handmade Chappels') baseRoute = '/collection/chappels';
      else if (categoryTitle === 'Shoes') baseRoute = '/collection/shoes';
      else if (categoryTitle === 'Clothes') baseRoute = '/collection/clothes';
      else if (categoryTitle === 'Fabrics') baseRoute = '/collection/fabrics';
      else if (categoryTitle === 'Jewelleries') baseRoute = '/collection/jewelleries';
    } 
    else {
      if (subItem === 'Lawn Suits') categoryId = 'lawn-suits';
      if (subItem === 'Silk Dresses') categoryId = 'silk-dresses';
      if (subItem === 'Casual Wear') categoryId = 'casual-wear';
      if (subItem === 'Formal Wear') categoryId = 'formal-wear';
      if (subItem === 'Tote Bags') categoryId = 'tote-bags';
      if (subItem === 'Shoulder Bags') categoryId = 'shoulder-bags';
      if (subItem === 'Heels') categoryId = 'heels';
      if (subItem === 'Flats') categoryId = 'flats';
      if (subItem === 'Khussa') categoryId = 'khussa';
      if (subItem === 'Sneakers') categoryId = 'sneakers-women';
      if (subItem === 'Bangles') categoryId = 'bangles';
      if (subItem === 'Earrings') categoryId = 'earrings-women';
      if (subItem === 'Necklaces') categoryId = 'necklaces-women';
      if (subItem === 'Rings') categoryId = 'rings-women';
      if (subItem === 'Chiffon') categoryId = 'chiffon';
      if (subItem === 'Lawn') categoryId = 'lawn-female';
      if (subItem === 'Silk') categoryId = 'silk-female';
      if (subItem === 'Velvet') categoryId = 'velvet';

      if (categoryTitle === 'Dresses') baseRoute = '/collection/dresses';
      else if (categoryTitle === 'Handbags') baseRoute = '/collection/handbags';
      else if (categoryTitle === 'Footwear') baseRoute = '/collection/female-footwear';
      else if (categoryTitle === 'Jewellery') baseRoute = '/collection/female-jewellery';
      else if (categoryTitle === 'Fabrics') baseRoute = '/collection/female-fabrics';
    }

    // Yahan URL mein ?jump add ho raha hai
    navigate(`${baseRoute}?jump=${categoryId}`);
  };

  return (
    <div className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* Top Offer Bar */}
      <div className="bg-[#eab308] text-black text-[11px] font-semibold py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-black text-[#eab308] px-2 py-0.5 rounded text-[9px]">OFFER</span>
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <span className="flex items-center gap-1">📞 +1 (234) 567-890</span>
          <div className="flex gap-3 text-black/80">
            <FiInstagram className="hover:text-black cursor-pointer" />
            <FiFacebook className="hover:text-black cursor-pointer" />
            <FiTwitter className="hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 dark:bg-[#0a0a0a]/95 border-b border-gray-200 dark:border-gray-800/50 backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-3xl font-serif tracking-widest font-bold text-gray-900 dark:text-white leading-none transition-colors">TTS</span>
            <span className="text-[10px] tracking-[0.4em] text-[#eab308] font-sans mt-1">COLLECTION</span>
          </Link>

          <div className="hidden md:flex space-x-2 text-[13px] font-medium tracking-wide items-center">
            
            {navLinks.map((link) => {
              if (link.name === 'Collection') return null;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'text-[#eab308] bg-[#eab308]/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#eab308] hover:bg-[#eab308]/5'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#eab308] shadow-[0_0_10px_rgba(234,179,8,0.8)] rounded-full"></span>
                  )}
                </Link>
              );
            })}

            {/* COLLECTION MEGA MENU */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                to="/collection"
                className={`relative flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === '/collection' 
                    ? 'text-[#eab308] bg-[#eab308]/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#eab308] hover:bg-[#eab308]/5'
                }`}
              >
                Collection
                <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} size={14} />
              </Link>

              {/* DROPDOWN */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              >
                <div className="bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl border border-gray-200 dark:border-[#eab308]/20 shadow-2xl rounded-2xl p-6 overflow-hidden">
                  
                  <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
                    <button 
                      onClick={() => { setActiveTab('garments'); setActiveSubItem(null); }}
                      className={`font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === 'garments' ? 'text-[#eab308]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${activeTab === 'garments' ? 'bg-[#eab308]' : 'bg-gray-300 dark:bg-gray-700'}`}></span> 
                      Garments
                    </button>
                    
                    <button 
                      onClick={() => { setActiveTab('females'); setActiveSubItem(null); }}
                      className={`font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === 'females' ? 'text-[#eab308]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${activeTab === 'females' ? 'bg-[#eab308]' : 'bg-gray-300 dark:bg-gray-700'}`}></span> 
                      Females
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {currentData.map((category, index) => (
                      <div key={index} className="flex flex-col">
                        <h4 className="text-[11px] font-bold tracking-widest text-gray-900 dark:text-white uppercase mb-3">{category.title}</h4>
                        <ul className="space-y-2">
                          {category.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <button 
                                onClick={() => handleSubItemClick(subItem, category.title)}
                                className={`text-[12px] transition-colors flex items-center gap-1 group/link text-left w-full ${activeSubItem === subItem ? 'text-[#eab308] font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-[#eab308]'}`}
                              >
                                {subItem}
                                <FiArrowRight size={10} className={`transition-all ${activeSubItem === subItem ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0'}`} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300 hover:text-[#eab308] transition-colors"><FiSearch size={20} /></button>
            
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-[#eab308] transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-[#eab308] transition-colors">
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#eab308] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/account" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#eab308] transition-colors font-medium text-[13px] border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-full max-w-[200px] truncate" title={userName}>
                  <FiUser size={16} className="shrink-0" /> 
                  <span className="truncate">{userName}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center justify-center w-9 h-9 rounded-full text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 transition-all duration-300" title="Logout">
                  <FiLogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-[#eab308] hover:bg-[#facc15] text-black px-7 py-2.5 rounded-full font-bold text-[13px] shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] transition-all duration-300 ml-2">
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
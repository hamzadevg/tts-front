import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiBox, FiShoppingCart, FiUsers, FiGrid, FiLayers, 
  FiBarChart2, FiSettings, FiLogOut, FiX, FiBell 
} from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen, isCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/admin' },
    { name: 'Notifications', icon: <FiBell />, path: '/admin/notifications' }, // <-- NAYA SECTION
    { name: 'Products', icon: <FiBox />, path: '/admin/products' },
    { name: 'Orders', icon: <FiShoppingCart />, path: '/admin/orders' },
    { name: 'Customers', icon: <FiUsers />, path: '/admin/customers' },
    { name: 'Categories', icon: <FiGrid />, path: '/admin/categories' },
    { name: 'Inventory', icon: <FiLayers />, path: '/admin/inventory' },
    { name: 'Reports', icon: <FiBarChart2 />, path: '/admin/reports' },
    { name: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      <div 
        className={`
          fixed top-0 left-0 h-screen admin-sidebar bg-[#0a0a0a] border-r border-[#eab308]/20 z-50 flex flex-col transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        
        <button className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white z-50" onClick={() => setIsOpen(false)}>
          <FiX size={20} />
        </button>

        {/* Logo */}
        <div className="relative flex flex-col items-center py-8 border-b border-[#eab308]/20 admin-divider">
          <FaCrown className="text-[#eab308] text-3xl mb-2 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          {!isCollapsed && (
            <div className="text-center">
              <h1 className="text-xl font-serif tracking-widest admin-text-primary text-white">TTS COLLECTION</h1>
              <p className="text-[9px] text-[#eab308] tracking-[0.3em] uppercase mt-1">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-4 mx-2 rounded-lg text-sm font-medium transition-all duration-300 mb-1 relative group
                  ${isCollapsed ? 'justify-center px-2 py-3' : 'px-6 py-3'}
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#eab308]/20 to-transparent text-[#eab308] border-l-4 border-[#eab308]' 
                    : 'admin-text-secondary text-gray-400 hover:text-[#eab308] hover:bg-[#eab308]/5'
                  }
                `}
                title={isCollapsed ? item.name : ''}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#eab308]/20 admin-divider">
          <button onClick={handleLogout} className={`w-full flex items-center rounded-lg text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium ${isCollapsed ? 'justify-center py-3' : 'gap-4 px-4 py-3'}`} title={isCollapsed ? 'Logout' : ''}>
            <FiLogOut size={18} className="flex-shrink-0" /> 
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Footer Text */}
        {!isCollapsed && (
          <div className="p-4 text-center border-t border-[#eab308]/20 admin-divider">
            <p className="font-serif italic text-[#eab308] text-sm">Good Things Take Time</p>
            <p className="text-[10px] admin-text-muted text-gray-600 mt-2">© 2025 TTS Collection</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
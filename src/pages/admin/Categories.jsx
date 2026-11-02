import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiGrid, FiBox, FiLayers, FiArrowLeft, FiStar, FiSearch, FiChevronRight } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW STATE: Selected category aur uske products
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [search, setSearch] = useState('');

  // Categories fetch karo
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/admin/categories`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setCategories(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchCategories();
  }, []);

  // Jab kisi category par click karo
  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setProductsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      // Saare products fetch karo (kyunke backend mein specific category route nahi hai)
      const res = await axios.get('/api/admin/products', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      // Sirf selected category ke products filter karo
      const filtered = res.data.filter(p => p.category === categoryName);
      setCategoryProducts(filtered);
    } catch (error) { 
      console.error(error); 
    } finally { 
      setProductsLoading(false); 
    }
  };

  // Back button
  const handleBack = () => {
    setSelectedCategory(null);
    setCategoryProducts([]);
    setSearch('');
  };

  // Filter products by search (Category products view ke andar)
  const filteredProducts = categoryProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ============ CATEGORY PRODUCTS VIEW ============
  if (selectedCategory) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          
          {/* Back Button & Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 hover:border-[#eab308]/50 transition-all"
            >
              <FiArrowLeft size={16} /> Back to Categories
            </button>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#eab308]/10 text-[#eab308] rounded-xl flex items-center justify-center text-xl">
                <FiGrid />
              </div>
              <div>
                <h1 className="text-3xl font-serif admin-text-primary">{selectedCategory}</h1>
                <p className="admin-text-secondary text-sm mt-1">{categoryProducts.length} products in this category</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={`Search in ${selectedCategory}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors"
              />
            </div>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
              <FiBox size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="admin-text-secondary">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-[#eab308]/50 hover:shadow-lg transition-all duration-300">
                  
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {product.quantity === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs">Out of Stock</span>
                      </div>
                    )}
                    
                    {product.discountPercent > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        -{product.discountPercent}%
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-serif font-medium text-sm admin-text-primary mb-1 line-clamp-1" title={product.name}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <FiStar size={10} className="fill-[#eab308] text-[#eab308]" />
                      <span className="text-[11px] text-gray-500">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-bold text-[#eab308]">Rs {product.price.toLocaleString()}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        product.quantity === 0 ? 'bg-red-500/10 text-red-500' :
                        product.quantity < 10 ? 'bg-orange-500/10 text-orange-500' :
                        'bg-green-500/10 text-green-500'
                      }`}>
                        {product.quantity} in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }

  // ============ CATEGORIES LIST VIEW ============
  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif admin-text-primary">Categories</h1>
          <p className="admin-text-secondary text-sm mt-1">{categories.length} total categories available</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
            <FiGrid size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <p className="admin-text-secondary">No categories yet. Add products to create categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div 
                key={cat._id} 
                onClick={() => handleCategoryClick(cat.name)}
                className="group cursor-pointer admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-[#eab308]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Golden Glow Background */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#eab308] opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-300 pointer-events-none"></div>

                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className="w-12 h-12 bg-[#eab308]/10 text-[#eab308] rounded-xl flex items-center justify-center text-xl group-hover:bg-[#eab308] group-hover:text-black transition-all duration-300">
                    <FiGrid />
                  </div>
                  <FaCrown className="text-gray-200 dark:text-gray-800 text-2xl group-hover:text-[#eab308]/30 transition-colors" />
                </div>

                <h3 className="text-xl font-serif admin-text-primary mb-1 relative z-10">{cat.name}</h3>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-5 relative z-10">Category</p>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm admin-text-secondary">
                      <div className="w-6 h-6 rounded-md bg-gray-100 dark:bg-black/40 flex items-center justify-center">
                        <FiBox size={12} className="text-[#eab308]" />
                      </div>
                      <span className="font-bold">{cat.productCount}</span>
                      <span className="text-xs text-gray-500">Products</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm admin-text-secondary">
                      <div className="w-6 h-6 rounded-md bg-gray-100 dark:bg-black/40 flex items-center justify-center">
                        <FiLayers size={12} className="text-[#eab308]" />
                      </div>
                      <span className="font-bold">{cat.totalStock}</span>
                      <span className="text-xs text-gray-500">Units</span>
                    </div>
                  </div>
                  
                  {/* Arrow Icon (Hover effect) */}
                  <div className="w-8 h-8 rounded-full bg-[#eab308]/10 text-[#eab308] flex items-center justify-center group-hover:bg-[#eab308] group-hover:text-black transition-all">
                    <FiChevronRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  FiPlus, FiEdit, FiTrash2, FiSearch, FiSave, 
  FiUploadCloud, FiArrowLeft, FiList, FiImage 
} from 'react-icons/fi';
import { FaCrown, FaMars, FaVenus } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const MALE_CATEGORIES = ['Handmade Chappels', 'Shoes', 'Clothes', 'Fabrics', 'Jewelleries'];
const FEMALE_CATEGORIES = ['Dresses', 'Handbags', 'Footwear', 'Jewellery', 'Fabrics'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [view, setView] = useState('list');
  const [editingProduct, setEditingProduct] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', description: '', gender: 'male', category: '', subCategory: '',
    brand: '', tags: '', price: '', discountPrice: '', discountPercent: '',
    quantity: '', image: '', images: [], isSale: false, isFeatured: false, status: 'Published',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleOpenForm = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name, description: product.description || '',
        gender: product.gender || 'male', category: product.category,
        subCategory: product.subCategory || '', brand: product.brand || '',
        tags: product.tags?.join(', ') || '', price: product.price,
        discountPrice: product.discountPrice || '', discountPercent: product.discountPercent || '',
        quantity: product.quantity, image: product.image, images: product.images || [product.image],
        isSale: product.isSale, isFeatured: product.isFeatured, status: product.status || 'Published',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', description: '', gender: 'male', category: '', subCategory: '',
        brand: '', tags: '', price: '', discountPrice: '', discountPercent: '',
        quantity: '', image: '', images: [], isSale: false, isFeatured: false, status: 'Published',
      });
    }
    setView('form');
    window.scrollTo(0, 0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const submitData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        images: [formData.image],
      };

      if (editingProduct) {
        await axios.put(`${API_URL}/admin/products/${editingProduct._id}`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/admin/products`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setView('list');
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) { alert('Failed to delete'); }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const currentCategories = formData.gender === 'male' ? MALE_CATEGORIES : FEMALE_CATEGORIES;

  // ================= FORM VIEW =================
  if (view === 'form') {
    return (
      <AdminLayout>
        <div className="space-y-6 max-w-6xl mx-auto pb-10">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('list')}
              className="w-10 h-10 rounded-xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#eab308]/20 text-[#eab308] flex items-center justify-center hover:bg-[#eab308] hover:text-black transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-serif admin-text-primary flex items-center gap-2">
                <FaCrown className="text-[#eab308]" /> {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-xs admin-text-secondary mt-1">Fill in the details below and publish it.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Top Section: Gender & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Select Gender *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setFormData({...formData, gender: 'male', category: ''})}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${formData.gender === 'male' ? 'bg-[#eab308] text-black border-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-gray-50 dark:bg-black/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#eab308]/30 hover:border-[#eab308]'}`}>
                    <FaMars /> Male
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, gender: 'female', category: ''})}
                    className={`py-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${formData.gender === 'female' ? 'bg-[#eab308] text-black border-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-gray-50 dark:bg-black/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#eab308]/30 hover:border-[#eab308]'}`}>
                    <FaVenus /> Female
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Select Category *</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-[#eab308]/30 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308]">
                  <option value="">Select Category</option>
                  {currentCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left: Images */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold admin-text-primary mb-1 flex items-center gap-2"><FiUploadCloud className="text-[#eab308]" /> Product Image</h3>
                <p className="text-[10px] admin-text-secondary mb-4">Main image of the product.</p>
                
                {formData.image ? (
                  <div className="relative mb-4">
                    <img src={formData.image} alt="Preview" className="w-full h-48 object-contain rounded-lg border-2 border-[#eab308] bg-gray-100 dark:bg-black/40" />
                    <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-[#eab308]/30 rounded-xl p-8 text-center hover:border-[#eab308] transition-colors cursor-pointer bg-gray-50 dark:bg-black/20 mb-4">
                    <FiImage className="mx-auto text-[#eab308] mb-2" size={40} />
                    <p className="text-sm admin-text-primary font-bold">Click to upload image</p>
                    <p className="text-[10px] admin-text-secondary mt-1">PNG, JPG (Max 5MB)</p>
                  </div>
                )}
                
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />

                <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-[#eab308]/10 border border-[#eab308]/30 text-[#eab308] py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#eab308]/20 transition-colors">
                  <FiUploadCloud size={16} /> {formData.image ? 'Change Image' : 'Upload Image'}
                </button>
              </div>

              {/* Right: Product Details */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold admin-text-primary flex items-center gap-2"><FiList className="text-[#eab308]" /> Product Details</h3>
                
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Product Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter product name" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Description</label>
                  <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Write product description..." className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] resize-none transition-colors"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Price (PKR) *</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="Enter price" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Stock *</label>
                    <input type="number" required value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} placeholder="Enter stock" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Discount Price</label>
                    <input type="number" value={formData.discountPrice} onChange={(e) => setFormData({...formData, discountPrice: e.target.value})} placeholder="Optional" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Discount %</label>
                    <input type="number" value={formData.discountPercent} onChange={(e) => setFormData({...formData, discountPercent: e.target.value})} placeholder="Optional" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold admin-text-primary mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Brand</label>
                  <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} placeholder="Enter brand name" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Tags</label>
                  <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="e.g. summer, trendy" className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 px-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors">
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-[#eab308]" />
                <label className="text-sm admin-text-secondary">Featured Product</label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button type="button" onClick={() => setView('list')} className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 admin-text-secondary font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" className="px-8 py-3 rounded-xl bg-[#eab308] hover:bg-[#facc15] text-black font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all">
                <FiSave size={16} /> {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }

  // ================= LIST VIEW =================
  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif admin-text-primary flex items-center gap-2">
              <FaCrown className="text-[#eab308]" /> Products Management
            </h1>
            <p className="admin-text-secondary text-sm mt-1">{products.length} total products</p>
          </div>
          <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-[#eab308] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#facc15] transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <FiPlus size={18} /> Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
          <label className="text-[10px] font-bold text-[#eab308] uppercase mb-2 block flex items-center gap-1">
            <FiSearch size={12} /> Search Product
          </label>
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name or category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" />
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-20"><div className="w-16 h-16 border-4 border-[#eab308] border-t-transparent rounded-full animate-spin mx-auto"></div></div>
        ) : (
          <div className="admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Gender</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                          <p className="text-sm font-bold admin-text-primary line-clamp-1 max-w-[200px]">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          product.gender === 'male' ? 'bg-blue-500/10 text-blue-500' : 
                          product.gender === 'female' ? 'bg-pink-500/10 text-pink-500' : 
                          'bg-purple-500/10 text-purple-500'
                        }`}>
                          {product.gender === 'male' ? <FaMars size={10}/> : <FaVenus size={10}/>} 
                          {product.gender || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm admin-text-secondary">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#eab308]">Rs {product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm admin-text-secondary">{product.quantity} units</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleOpenForm(product)} className="text-[#eab308] hover:bg-[#eab308]/10 p-2 rounded-lg transition-colors"><FiEdit size={16} /></button>
                          <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"><FiTrash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr><td colSpan="6" className="px-6 py-12 text-center admin-text-secondary">No products found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
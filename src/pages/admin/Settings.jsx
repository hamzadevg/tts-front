import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiSave, FiCheckCircle, FiShield, FiAlertTriangle, FiCamera } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../services/api';
const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [initialData, setInitialData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/profile', { headers: { Authorization: `Bearer ${token}` } });
        setFormData({ name: res.data.name, email: res.data.email, password: '', confirmPassword: '' });
        setInitialData({ name: res.data.name, email: res.data.email });
      } catch (error) { console.error(error); }
    };
    fetchProfile();
  }, []);

  const hasChanges = 
    formData.name !== initialData.name || 
    formData.email !== initialData.email || 
    formData.password !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password && formData.password !== formData.confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match' });
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const updateData = { name: formData.name, email: formData.email };
      if (formData.password) updateData.password = formData.password;

      await axios.put(`${API_URL}/admin/profile`, updateData, { headers: { Authorization: `Bearer ${token}` } });
      
      localStorage.setItem('userName', formData.name);
      setInitialData({ name: formData.name, email: formData.email });
      setFormData({ ...formData, password: '', confirmPassword: '' });
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally { setLoading(false); }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif admin-text-primary">Admin Settings</h1>
          <p className="admin-text-secondary text-sm mt-1">Manage your account information and security</p>
        </div>

        {/* Alerts */}
        {message.text && (
          <div className={`p-4 rounded-xl flex items-start gap-3 border ${
            message.type === 'success' 
              ? 'bg-green-500/10 text-green-500 border-green-500/30' 
              : 'bg-red-500/10 text-red-500 border-red-500/30'
          }`}>
            {message.type === 'success' ? <FiCheckCircle className="mt-0.5" size={18} /> : <FiAlertTriangle className="mt-0.5" size={18} />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-[#eab308]/20 to-transparent"></div>
              
              {/* Avatar */}
              <div className="relative z-10 mb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#eab308] to-[#b8860b] rounded-full flex items-center justify-center text-black font-bold text-4xl shadow-lg">
                  {formData.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <button className="absolute bottom-1 right-1/3 bg-white dark:bg-gray-800 border-2 border-[#eab308] text-[#eab308] p-1.5 rounded-full hover:bg-[#eab308] hover:text-black transition-all">
                  <FiCamera size={14} />
                </button>
              </div>

              <h3 className="text-lg font-bold admin-text-primary relative z-10">{formData.name}</h3>
              <p className="text-xs admin-text-secondary relative z-10">{formData.email}</p>
              
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#eab308]/10 rounded-full">
                <FaCrown size={10} className="text-[#eab308]" />
                <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-widest">Super Admin</span>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM CARD */}
          <div className="lg:col-span-2">
            <div className="admin-card bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              
              {/* Tabs Header */}
              <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/20">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                    activeTab === 'profile' 
                      ? 'text-[#eab308]' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FiUser size={16} /> Profile
                  {activeTab === 'profile' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eab308]"></span>}
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                    activeTab === 'security' 
                      ? 'text-[#eab308]' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FiShield size={16} /> Security
                  {activeTab === 'security' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eab308]"></span>}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                
                {activeTab === 'profile' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="text" required value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})} 
                          className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Email Address</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="email" required value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})} 
                          className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" 
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2 flex items-center gap-1">
                        <FiShield size={10} /> Your email is used for login and notifications.
                      </p>
                    </div>
                  </>
                )}

                {activeTab === 'security' && (
                  <>
                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-2">
                      <p className="text-xs text-blue-500 font-medium">Change your password below. Leave blank to keep your current password.</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">New Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="password" value={formData.password} 
                          onChange={(e) => setFormData({...formData, password: e.target.value})} 
                          placeholder="Enter new password" 
                          className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Confirm Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="password" value={formData.confirmPassword} 
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                          placeholder="Confirm new password" 
                          className="w-full admin-input bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm admin-text-primary focus:outline-none focus:border-[#eab308] transition-colors" 
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Save Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button 
                    type="submit" 
                    disabled={!hasChanges || loading} 
                    className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      hasChanges 
                        ? 'bg-[#eab308] hover:bg-[#facc15] text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <FiSave size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
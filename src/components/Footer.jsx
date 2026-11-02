import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook, FiMusic, FiMessageCircle } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] pt-16 border-t border-gray-200 dark:border-gray-800 relative transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl mb-16">
        <div className="bg-gray-100 dark:bg-[#1a1a1a] flex flex-col md:flex-row justify-between items-center p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-800/80 transition-colors duration-300">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-serif mb-2 text-gray-900 dark:text-white">Join the TTS Family</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Subscribe for exclusive drops, early access, and 15% off your first order.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input type="email" placeholder="Enter your email" className="bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-l-full py-3.5 px-6 outline-none focus:border-[#eab308] w-full md:w-72 text-sm text-gray-900 dark:text-white transition-colors" />
            <button className="bg-[#eab308] hover:bg-[#facc15] text-black font-bold px-8 py-3.5 rounded-r-full transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)]">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-200 dark:border-gray-800 pb-12">
        <div>
          <h3 className="text-2xl font-serif mb-4 tracking-widest text-gray-900 dark:text-white">TTS</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">Premium clothing for the modern individual. Designed in studio, made with care.</p>
          <div className="flex space-x-3">
            {[FiInstagram, FiFacebook, FiTwitter, FiMusic].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2 border border-gray-300 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:bg-[#eab308] hover:text-black hover:border-[#eab308] hover:shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-300"><Icon size={16}/></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider text-[12px]">Shop</h4>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            {['All Products', 'New Arrivals', 'Best Sellers', 'Sale', 'Accessories'].map(item => <li key={item}><a href="#" className="hover:text-[#eab308] transition-colors">{item}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider text-[12px]">Help</h4>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            {['Shipping Info', 'Returns & Exchanges', 'Size Guide', 'FAQ', 'Track Order'].map(item => <li key={item}><a href="#" className="hover:text-[#eab308] transition-colors">{item}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider text-[12px]">Contact Us</h4>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            <li className="flex items-center gap-3"><FiMail className="text-[#eab308]"/> hello@ttscollection.com</li>
            <li className="flex items-center gap-3"><FiPhone className="text-[#eab308]"/> +1 (234) 567-890</li>
            <li className="flex items-center gap-3"><FiMessageCircle className="text-[#eab308]"/> Chat on WhatsApp</li>
            <li className="flex items-start gap-3"><FiMapPin className="text-[#eab308] mt-1"/> 123 Fashion Ave, New York, NY</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-8 pb-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500">
        <p>© 2026 TTS Collection. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0 text-gray-700 dark:text-gray-400">
          <span className="mr-2">Secure payment:</span>
          {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL', 'APPLE PAY'].map(method => (
            <span key={method} className="border border-gray-300 dark:border-gray-700 px-2 py-1 rounded bg-gray-100 dark:bg-[#141414]">{method}</span>
          ))}
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#eab308] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#eab308] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#eab308] transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
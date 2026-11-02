import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import TrackOrder from './pages/TrackOrder';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Account from './pages/Account';
import ProductDetails from './pages/ProductDetails';
import ScrollToTop from './components/ScrollToTop';

// ADMIN IMPORTS
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminOrderDetails from './pages/admin/OrderDetails';
import AdminCustomers from './pages/admin/Customers';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import AdminCategories from './pages/admin/Categories';
import AdminInventory from './pages/admin/Inventory';
import AdminNotifications from './pages/admin/Notifications';

// GARMENTS
import HandmadeChappels from './pages/garments/chappels/HandmadeChappels';
import Shoes from './pages/garments/shoes/Shoes';
import Clothes from './pages/garments/clothes/Clothes';
import Fabrics from './pages/garments/fabrics/Fabrics';
import Jewelleries from './pages/garments/jewelleries/Jewelleries';

// FEMALES
import Dresses from './pages/females/dresses/Dresses';
import Handbags from './pages/females/handbags/Handbags';
import FemaleFootwear from './pages/females/footwear/FemaleFootwear';
import FemaleJewellery from './pages/females/jewellery/FemaleJewellery';
import FemaleFabrics from './pages/females/fabrics/FemaleFabrics';

const DummyPage = () => <div className="h-screen flex items-center justify-center text-4xl font-serif text-gray-900 dark:text-white dark:bg-[#0a0a0a]">Page Coming Soon</div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN ROUTES - NO WRAP (Layout is inside each page) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* MAIN WEBSITE */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-[#f8f6f0] dark:bg-[#0a0a0a]">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                
                <Route path="/collection/chappels" element={<HandmadeChappels />} />
                <Route path="/collection/shoes" element={<Shoes />} />
                <Route path="/collection/clothes" element={<Clothes />} />
                <Route path="/collection/fabrics" element={<Fabrics />} />
                <Route path="/collection/jewelleries" element={<Jewelleries />} />
                <Route path="/collection/dresses" element={<Dresses />} />
                <Route path="/collection/handbags" element={<Handbags />} />
                <Route path="/collection/female-footwear" element={<FemaleFootwear />} />
                <Route path="/collection/female-jewellery" element={<FemaleJewellery />} />
                <Route path="/collection/female-fabrics" element={<FemaleFabrics />} />

                <Route path="*" element={<DummyPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
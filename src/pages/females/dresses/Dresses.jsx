import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const Dresses = () => {
  const categories = [
    {
      id: 'lawn-suits', title: 'Lawn Suits', description: 'Beautiful lawn suits for everyday elegance.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2101 + i, name: `Lawn Suit ${['Floral','Printed','Embroidered','Summer','Classic','Premium','Luxury','Designer','Pastel','Bold'][i]}`,
        category: 'Lawn Suits', price: `Rs ${(2500 + i * 200).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3500 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 20 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1595777457583-95e059d581b8','1496747611176-843222e1e57c','1515886657613-9f3515b0c78f','1539008835657-9e8e9680c956','1572804013309-59a88b7e92f1','1585487000160-6ebcfceb0d03','1566174053879-31528523f8ae','1544022613-e87ca75a784a','1550639525-c97d455acf70','1571902943202-507ec2618e8f'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'silk-dresses', title: 'Silk Dresses', description: 'Luxurious silk dresses for special occasions.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2201 + i, name: `Silk Dress ${['Evening','Bridal','Party','Elegant','Classic','Modern','Luxury','Designer','Formal','Cocktail'][i]}`,
        category: 'Silk Dresses', price: `Rs ${(5000 + i * 400).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(6500 + i * 400).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 25 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1496747611176-843222e1e57c','1595777457583-95e059d581b8','1515886657613-9f3515b0c78f','1539008835657-9e8e9680c956','1572804013309-59a88b7e92f1','1585487000160-6ebcfceb0d03','1566174053879-31528523f8ae','1544022613-e87ca75a784a','1550639525-c97d455acf70','1571902943202-507ec2618e8f'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'casual-wear', title: 'Casual Wear', description: 'Comfortable and stylish casual dresses.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2301 + i, name: `Casual Dress ${['Cotton','Summer','Beach','Floral','Boho','Everyday','Relaxed','Classic','Modern','Pastel'][i]}`,
        category: 'Casual Wear', price: `Rs ${(1800 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2500 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1515886657613-9f3515b0c78f','1566174053879-31528523f8ae','1595777457583-95e059d581b8','1496747611176-843222e1e57c','1539008835657-9e8e9680c956','1572804013309-59a88b7e92f1','1585487000160-6ebcfceb0d03','1544022613-e87ca75a784a','1550639525-c97d455acf70','1571902943202-507ec2618e8f'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'formal-wear', title: 'Formal Wear', description: 'Elegant formal dresses for professional settings.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2401 + i, name: `Formal Dress ${['Office','Business','Classic','Modern','Elegant','Professional','Tailored','Sophisticated','Chic','Power'][i]}`,
        category: 'Formal Wear', price: `Rs ${(4000 + i * 250).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(5200 + i * 250).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1539008835657-9e8e9680c956','1572804013309-59a88b7e92f1','1515886657613-9f3515b0c78f','1595777457583-95e059d581b8','1496747611176-843222e1e57c','1585487000160-6ebcfceb0d03','1566174053879-31528523f8ae','1544022613-e87ca75a784a','1550639525-c97d455acf70','1571902943202-507ec2618e8f'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Women's" pageTitleHighlight="Dresses" 
      pageDescription="Explore our stunning collection of dresses for every occasion."
      categories={categories}
    />
  );
};
export default Dresses;
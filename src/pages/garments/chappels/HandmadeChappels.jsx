import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const HandmadeChappels = () => {
  const categories = [
    {
      id: 'kheri', title: 'Kheri Style', description: 'Traditional Kheri chappals, hand-stitched with premium leather.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 101 + i, name: `Premium Kheri ${['Brown','Black','Tan','Dark Brown','Olive','Maroon','Navy','Grey','Beige','Chocolate'][i]}`,
        category: 'Kheri Style', price: `Rs ${(4000 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(4800 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 5 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1595950653106-6c9ebd614d3a','1560343090-f0409e92791a','1614252369475-531eba835eb1','1525966222134-fcfa99b8ae77','1549298916-b41d501d3772','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'kaptaan', title: 'Kaptaan Style', description: 'Iconic Kaptaan chappals, a symbol of tradition.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 201 + i, name: `Classic Kaptaan ${['Brown','Black','Tan','Dark Brown','Olive','Maroon','Navy','Grey','Beige','Chocolate'][i]}`,
        category: 'Kaptaan Style', price: `Rs ${(5000 + i * 200).toLocaleString()}`, oldPrice: i % 4 === 0 ? `Rs ${(6000 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 4 === 0,
        image: `https://images.unsplash.com/photo-${['1614252369475-531eba835eb1','1525966222134-fcfa99b8ae77','1543163521-1bf539c55dd2','1595950653106-6c9ebd614d3a','1603808033192-082d6919d3e1','1560343090-f0409e92791a','1549298916-b41d501d3772','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'noroozi', title: 'Noroozi Style', description: 'Trendy Noroozi chappals, perfect for casual wear.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 301 + i, name: `Noroozi ${['Casual','Deluxe','Classic','Sport','Elite','Urban','Comfort','Royal','Sleek','Modern'][i]}`,
        category: 'Noroozi Style', price: `Rs ${(3500 + i * 100).toLocaleString()}`, oldPrice: i % 5 === 0 ? `Rs ${(4200 + i * 100).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 8 + i, isSale: i % 5 === 0,
        image: `https://images.unsplash.com/photo-${['1549298916-b41d501d3772','1603808033192-082d6919d3e1','1595950653106-6c9ebd614d3a','1560343090-f0409e92791a','1614252369475-531eba835eb1','1525966222134-fcfa99b8ae77','1543163521-1bf539c55dd2','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'quetta', title: 'Quetta Style', description: 'Authentic Quetta chappals, handcrafted for a timeless look.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 401 + i, name: `Quetta ${['Heritage','Premium','Classic','Deluxe','Royal','Elite','Traditional','Signature','Luxury','Vintage'][i]}`,
        category: 'Quetta Style', price: `Rs ${(5500 + i * 250).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(6500 + i * 250).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1595950653106-6c9ebd614d3a','1614252369475-531eba835eb1','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a','1525966222134-fcfa99b8ae77','1549298916-b41d501d3772','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Handmade" 
      pageTitleHighlight="Chappels" 
      pageDescription="Discover our exclusive range of handcrafted leather chappals. Each pair is made with premium materials and generations of skill."
      categories={categories}
    />
  );
};

export default HandmadeChappels;
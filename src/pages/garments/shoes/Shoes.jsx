import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const Shoes = () => {
  const categories = [
    {
      id: 'sneakers', title: 'Sneakers', description: 'Premium sneakers for everyday style.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 501 + i, name: `Sneaker ${['White','Black','Grey','Navy','Red','Blue','Green','Beige','Olive','Brown'][i]}`,
        category: 'Sneakers', price: `Rs ${(3000 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3800 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1549298916-b41d501d3772','1525966222134-fcfa99b8ae77','1603808033192-082d6919d3e1','1560343090-f0409e92791a','1614252369475-531eba835eb1','1543163521-1bf539c55dd2','1595950653106-6c9ebd614d3a','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'loafers', title: 'Loafers', description: 'Elegant loafers for a smart casual look.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 601 + i, name: `Loafer ${['Brown','Black','Tan','Suede','Leather','Classic','Modern','Elite','Comfort','Luxury'][i]}`,
        category: 'Loafers', price: `Rs ${(4000 + i * 200).toLocaleString()}`, oldPrice: i % 4 === 0 ? `Rs ${(5000 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 8 + i, isSale: i % 4 === 0,
        image: `https://images.unsplash.com/photo-${['1560343090-f0409e92791a','1543163521-1bf539c55dd2','1614252369475-531eba835eb1','1603808033192-082d6919d3e1','1525966222134-fcfa99b8ae77','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'oxfords', title: 'Oxfords', description: 'Formal oxfords for special occasions.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 701 + i, name: `Oxford ${['Classic','Premium','Formal','Elegant','Heritage','Signature','Elite','Royal','Timeless','Brogue'][i]}`,
        category: 'Oxfords', price: `Rs ${(5500 + i * 250).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(6500 + i * 250).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1614252369475-531eba835eb1','1576995853123-5a10305d93c0','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a','1525966222134-fcfa99b8ae77','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'sandals', title: 'Sandals', description: 'Comfortable sandals for summer days.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 801 + i, name: `Sandal ${['Leather','Casual','Sport','Comfort','Classic','Beach','Summer','Urban','Elite','Traditional'][i]}`,
        category: 'Sandals', price: `Rs ${(1500 + i * 100).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2000 + i * 100).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 6 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1603808033192-082d6919d3e1','1525966222134-fcfa99b8ae77','1560343090-f0409e92791a','1543163521-1bf539c55dd2','1614252369475-531eba835eb1','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Premium" pageTitleHighlight="Shoes" 
      pageDescription="Step into style with our wide collection of premium footwear. From sneakers to formal oxfords."
      categories={categories}
    />
  );
};
export default Shoes;
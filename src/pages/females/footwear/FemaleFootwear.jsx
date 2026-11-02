import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const FemaleFootwear = () => {
  const categories = [
    {
      id: 'heels', title: 'Heels', description: 'Elegant heels for every occasion.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2901 + i, name: `Heel ${['Stiletto','Block','Kitten','Platform','Wedge','Classic','Party','Bridal','Designer','Comfort'][i]}`,
        category: 'Heels', price: `Rs ${(2500 + i * 200).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3500 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a','1614252369475-531eba835eb1','1525966222134-fcfa99b8ae77','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'flats', title: 'Flats', description: 'Comfortable flats for everyday wear.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3001 + i, name: `Flat ${['Ballet','Pointed','Round','Classic','Modern','Comfort','Casual','Office','Designer','Everyday'][i]}`,
        category: 'Flats', price: `Rs ${(1500 + i * 120).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2200 + i * 120).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1603808033192-082d6919d3e1','1525966222134-fcfa99b8ae77','1543163521-1bf539c55dd2','1560343090-f0409e92791a','1614252369475-531eba835eb1','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'khussa', title: 'Khussa', description: 'Traditional khussa for a touch of culture.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3101 + i, name: `Khussa ${['Embroidered','Classic','Bridal','Party','Traditional','Elegant','Designer','Luxury','Gold','Silver'][i]}`,
        category: 'Khussa', price: `Rs ${(2000 + i * 180).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2800 + i * 180).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 20 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1560343090-f0409e92791a','1614252369475-531eba835eb1','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1525966222134-fcfa99b8ae77','1549298916-b41d501d3772','1595950653106-6c9ebd614d3a','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'sneakers-women', title: 'Sneakers', description: 'Trendy sneakers for women.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3201 + i, name: `Women Sneaker ${['White','Black','Pink','Grey','Navy','Beige','Pastel','Classic','Sport','Fashion'][i]}`,
        category: 'Sneakers', price: `Rs ${(2800 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3500 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1549298916-b41d501d3772','1525966222134-fcfa99b8ae77','1595950653106-6c9ebd614d3a','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a','1614252369475-531eba835eb1','1576995853123-5a10305d93c0','1553062407-98eeb64c6a62','1544816155-12df9643f363'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Women's" pageTitleHighlight="Footwear" 
      pageDescription="Step into style with our premium collection of women's footwear."
      categories={categories}
    />
  );
};
export default FemaleFootwear;
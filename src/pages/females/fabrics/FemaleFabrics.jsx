import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const FemaleFabrics = () => {
  const categories = [
    {
      id: 'chiffon', title: 'Chiffon', description: 'Light and flowy chiffon fabric.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3701 + i, name: `Chiffon ${['Printed','Plain','Embroidered','Party','Summer','Luxury','Classic','Designer','Bridal','Premium'][i]}`,
        category: 'Chiffon', price: `Rs ${(1800 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2500 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'lawn-female', title: 'Lawn', description: 'Premium lawn fabric for summer.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3801 + i, name: `Lawn ${['Printed','Embroidered','Classic','Luxury','Premium','Summer','Floral','Designer','Bridal','Chikankari'][i]}`,
        category: 'Lawn', price: `Rs ${(1500 + i * 120).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2200 + i * 120).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 20 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1556821840-3a63f95609a7','1576566588028-4147f3842f27','1521572163474-6864f9cf17ab','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'silk-female', title: 'Silk', description: 'Luxurious silk fabric for special occasions.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3901 + i, name: `Silk ${['Bridal','Party','Elegant','Royal','Designer','Luxury','Premium','Classic','Signature','Gold'][i]}`,
        category: 'Silk', price: `Rs ${(3500 + i * 200).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(4500 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 25 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1618354691373-d851c5c3a990','1582552938357-32b906df40cb','1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1596755094514-f87e32f85e2c','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'velvet', title: 'Velvet', description: 'Rich velvet fabric for winter.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 4001 + i, name: `Velvet ${['Royal','Party','Luxury','Premium','Classic','Designer','Bridal','Winter','Elegant','Signature'][i]}`,
        category: 'Velvet', price: `Rs ${(2800 + i * 250).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3800 + i * 250).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 18 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1582552938357-32b906df40cb','1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Women's" pageTitleHighlight="Fabrics" 
      pageDescription="Discover our premium range of women's fabrics for every occasion."
      categories={categories}
    />
  );
};
export default FemaleFabrics;
import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const Fabrics = () => {
  const categories = [
    {
      id: 'lawn', title: 'Unstitched Lawn', description: 'Premium unstitched lawn fabric.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1301 + i, name: `Lawn ${['Summer','Printed','Embroidered','Classic','Luxury','Premium','Floral','Chikankari','Block','Designer'][i]}`,
        category: 'Lawn', price: `Rs ${(1500 + i * 100).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2000 + i * 100).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 20 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'cotton', title: 'Cotton', description: '100% pure cotton fabric.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1401 + i, name: `Cotton ${['Plain','Printed','Stripe','Check','Luxury','Premium','Soft','Comfort','Summer','Classic'][i]}`,
        category: 'Cotton', price: `Rs ${(1200 + i * 80).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1600 + i * 80).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'khaddar', title: 'Khaddar', description: 'Traditional khaddar fabric for winter.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1501 + i, name: `Khaddar ${['Winter','Black','Brown','Plain','Luxury','Premium','Classic','Soft','Comfort','Warm'][i]}`,
        category: 'Khaddar', price: `Rs ${(1000 + i * 100).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1400 + i * 100).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1582552938357-32b906df40cb','1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'silk', title: 'Silk', description: 'Luxurious silk fabric.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1601 + i, name: `Silk ${['Luxury','Premium','Classic','Designer','Bridal','Party','Elegant','Royal','Signature','Gold'][i]}`,
        category: 'Silk', price: `Rs ${(3500 + i * 200).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(4500 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 25 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1618354691373-d851c5c3a990','1582552938357-32b906df40cb','1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1596755094514-f87e32f85e2c','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Premium" pageTitleHighlight="Fabrics" 
      pageDescription="Discover our wide range of premium fabrics. Perfect for your next project."
      categories={categories}
    />
  );
};
export default Fabrics;
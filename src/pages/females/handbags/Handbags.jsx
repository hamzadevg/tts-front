import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const Handbags = () => {
  const categories = [
    {
      id: 'tote-bags', title: 'Tote Bags', description: 'Spacious and stylish tote bags.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2501 + i, name: `Tote Bag ${['Leather','Canvas','Classic','Modern','Elegant','Premium','Designer','Luxury','Everyday','Travel'][i]}`,
        category: 'Tote Bags', price: `Rs ${(2000 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2800 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1544816155-12df9643f363','1584917865442-de89df76afd3','1590874103328-eac38a683ce7','1594223274512-ad4803739b7c','1601361905353-17f86263d921','1584917865442-de89df76afd3','1591561954557-26941169b49e','1590874103328-eac38a683ce7','1553062407-98eeb64c6a62','1548036328-c9fa89d128fa'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'clutches', title: 'Clutches', description: 'Elegant clutches for evening events.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2601 + i, name: `Clutch ${['Evening','Gold','Silver','Classic','Bridal','Party','Elegant','Luxury','Modern','Vintage'][i]}`,
        category: 'Clutches', price: `Rs ${(1500 + i * 200).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2200 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1584917865442-de89df76afd3','1591561954557-26941169b49e','1544816155-12df9643f363','1590874103328-eac38a683ce7','1594223274512-ad4803739b7c','1601361905353-17f86263d921','1553062407-98eeb64c6a62','1548036328-c9fa89d128fa','1590874103328-eac38a683ce7','1584917865442-de89df76afd3'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'shoulder-bags', title: 'Shoulder Bags', description: 'Chic shoulder bags for everyday use.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2701 + i, name: `Shoulder Bag ${['Leather','Chain','Classic','Modern','Quilted','Premium','Designer','Mini','Crossbody','Luxury'][i]}`,
        category: 'Shoulder Bags', price: `Rs ${(2500 + i * 180).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3200 + i * 180).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 18 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1590874103328-eac38a683ce7','1594223274512-ad4803739b7c','1584917865442-de89df76afd3','1591561954557-26941169b49e','1544816155-12df9643f363','1601361905353-17f86263d921','1553062407-98eeb64c6a62','1548036328-c9fa89d128fa','1590874103328-eac38a683ce7','1584917865442-de89df76afd3'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'backpacks', title: 'Backpacks', description: 'Stylish and functional backpacks.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2801 + i, name: `Backpack ${['Leather','Canvas','Travel','School','Mini','Classic','Modern','Sport','Urban','Designer'][i]}`,
        category: 'Backpacks', price: `Rs ${(2200 + i * 160).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3000 + i * 160).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1553062407-98eeb64c6a62','1548036328-c9fa89d128fa','1594223274512-ad4803739b7c','1584917865442-de89df76afd3','1590874103328-eac38a683ce7','1591561954557-26941169b49e','1544816155-12df9643f363','1601361905353-17f86263d921','1590874103328-eac38a683ce7','1584917865442-de89df76afd3'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Premium" pageTitleHighlight="Handbags" 
      pageDescription="Discover our elegant collection of handbags, clutches, and backpacks."
      categories={categories}
    />
  );
};
export default Handbags;
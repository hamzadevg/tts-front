import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const Jewelleries = () => {
  const categories = [
    {
      id: 'rings', title: 'Rings', description: 'Elegant rings for every occasion.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1701 + i, name: `Silver Ring ${['Classic','Diamond','Gold','Platinum','Rose Gold','Pearl','Emerald','Ruby','Sapphire','Opal'][i]}`,
        category: 'Rings', price: `Rs ${(1500 + i * 200).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(2000 + i * 200).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1605100804763-247f67b3557e','1611591437281-460bfbe1220a','1599643478518-a784e5dc4c8f','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1535632066927-ab7c9ab60908','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'bracelets', title: 'Bracelets', description: 'Stylish bracelets for men and women.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1801 + i, name: `Bracelet ${['Silver','Gold','Leather','Beaded','Chain','Classic','Modern','Luxury','Sport','Casual'][i]}`,
        category: 'Bracelets', price: `Rs ${(1000 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1500 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 8 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1611591437281-460bfbe1220a','1605100804763-247f67b3557e','1599643478518-a784e5dc4c8f','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1535632066927-ab7c9ab60908','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'necklaces', title: 'Necklaces', description: 'Beautiful necklaces to complete your look.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1901 + i, name: `Necklace ${['Gold','Diamond','Pearl','Silver','Rose Gold','Emerald','Ruby','Sapphire','Opal','Vintage'][i]}`,
        category: 'Necklaces', price: `Rs ${(2500 + i * 300).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3500 + i * 300).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1599643478518-a784e5dc4c8f','1611591437281-460bfbe1220a','1605100804763-247f67b3557e','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1535632066927-ab7c9ab60908','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'earrings', title: 'Earrings', description: 'Elegant earrings for any occasion.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 2001 + i, name: `Earring ${['Stud','Hoops','Drop','Chandelier','Pearl','Diamond','Gold','Silver','Rose Gold','Vintage'][i]}`,
        category: 'Earrings', price: `Rs ${(800 + i * 120).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1200 + i * 120).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 5 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1535632066927-ab7c9ab60908','1599643478518-a784e5dc4c8f','1611591437281-460bfbe1220a','1605100804763-247f67b3557e','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Premium" pageTitleHighlight="Jewellery" 
      pageDescription="Discover elegant jewellery that adds a touch of luxury to every outfit."
      categories={categories}
    />
  );
};
export default Jewelleries;
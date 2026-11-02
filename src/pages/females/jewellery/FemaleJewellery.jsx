import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const FemaleJewellery = () => {
  const categories = [
    {
      id: 'bangles', title: 'Bangles', description: 'Beautiful bangles in various styles.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3301 + i, name: `Bangle ${['Gold','Silver','Glass','Pearl','Diamond','Classic','Bridal','Designer','Traditional','Modern'][i]}`,
        category: 'Bangles', price: `Rs ${(1200 + i * 150).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1800 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1611591437281-460bfbe1220a','1605100804763-247f67b3557e','1599643478518-a784e5dc4c8f','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1535632066927-ab7c9ab60908','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'earrings-women', title: 'Earrings', description: 'Stunning earrings for every style.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3401 + i, name: `Earring ${['Stud','Hoops','Drop','Pearl','Diamond','Gold','Silver','Rose Gold','Jhumka','Chandelier'][i]}`,
        category: 'Earrings', price: `Rs ${(800 + i * 100).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1300 + i * 100).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 8 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1535632066927-ab7c9ab60908','1599643478518-a784e5dc4c8f','1611591437281-460bfbe1220a','1605100804763-247f67b3557e','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'necklaces-women', title: 'Necklaces', description: 'Elegant necklaces to enhance your beauty.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3501 + i, name: `Necklace ${['Gold','Diamond','Pearl','Silver','Rose Gold','Emerald','Ruby','Sapphire','Opal','Bridal'][i]}`,
        category: 'Necklaces', price: `Rs ${(2500 + i * 250).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3500 + i * 250).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1599643478518-a784e5dc4c8f','1611591437281-460bfbe1220a','1605100804763-247f67b3557e','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1535632066927-ab7c9ab60908','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'rings-women', title: 'Rings', description: 'Beautiful rings for every finger.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 3601 + i, name: `Ring ${['Diamond','Gold','Silver','Pearl','Emerald','Ruby','Sapphire','Rose Gold','Vintage','Modern'][i]}`,
        category: 'Rings', price: `Rs ${(1000 + i * 180).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1600 + i * 180).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 12 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1605100804763-247f67b3557e','1611591437281-460bfbe1220a','1599643478518-a784e5dc4c8f','1573408301185-9146fe634ad0','1584302179498-4d3c4b6c3e2c','1515562141207-7a88fb7ce338','1535632066927-ab7c9ab60908','1602751584552-8ba73aad10e1','1598560917505-59a3ad559071','1515377905703-c4788e51af15'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Women's" pageTitleHighlight="Jewellery" 
      pageDescription="Discover our exquisite collection of women's jewellery."
      categories={categories}
    />
  );
};
export default FemaleJewellery;
import React from 'react';
import CategoryPage from '../../../components/CategoryPage';

const Clothes = () => {
  const categories = [
    {
      id: 'tshirts', title: 'T-Shirts', description: 'Soft cotton t-shirts for everyday wear.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 901 + i, name: `Cotton T-Shirt ${['White','Black','Grey','Navy','Red','Blue','Green','Beige','Olive','Brown'][i]}`,
        category: 'T-Shirts', price: `Rs ${(1200 + i * 100).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(1500 + i * 100).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 20 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'hoodies', title: 'Hoodies', description: 'Warm and stylish hoodies for every season.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1001 + i, name: `Premium Hoodie ${['Black','Grey','Navy','White','Red','Blue','Green','Beige','Olive','Maroon'][i]}`,
        category: 'Hoodies', price: `Rs ${(3000 + i * 150).toLocaleString()}`, oldPrice: i % 4 === 0 ? `Rs ${(4000 + i * 150).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 15 + i, isSale: i % 4 === 0,
        image: `https://images.unsplash.com/photo-${['1556821840-3a63f95609a7','1576995853123-5a10305d93c0','1521572163474-6864f9cf17ab','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'shirts', title: 'Shirts', description: 'Formal and casual shirts for every occasion.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1101 + i, name: `Shirt ${['White','Blue','Checked','Striped','Black','Grey','Pink','Olive','Navy','Beige'][i]}`,
        category: 'Shirts', price: `Rs ${(2500 + i * 120).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(3200 + i * 120).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 10 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1596755094514-f87e32f85e2c','1521572163474-6864f9cf17ab','1556821840-3a63f95609a7','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1582552938357-32b906df40cb','1543163521-1bf539c55dd2','1603808033192-082d6919d3e1','1560343090-f0409e92791a'][i]}?q=80&w=800`
      }))
    },
    {
      id: 'jackets', title: 'Jackets', description: 'Stylish jackets to complete your look.',
      products: Array.from({ length: 10 }, (_, i) => ({
        id: 1201 + i, name: `Jacket ${['Denim','Leather','Bomber','Puffer','Windbreaker','Suede','Classic','Modern','Elite','Vintage'][i]}`,
        category: 'Jackets', price: `Rs ${(5000 + i * 300).toLocaleString()}`, oldPrice: i % 3 === 0 ? `Rs ${(6500 + i * 300).toLocaleString()}` : null,
        rating: 4 + (i % 2), reviews: 25 + i, isSale: i % 3 === 0,
        image: `https://images.unsplash.com/photo-${['1576995853123-5a10305d93c0','1543163521-1bf539c55dd2','1556821840-3a63f95609a7','1521572163474-6864f9cf17ab','1576566588028-4147f3842f27','1503342217505-b0a15ec3261c','1618354691373-d851c5c3a990','1596755094514-f87e32f85e2c','1582552938357-32b906df40cb','1603808033192-082d6919d3e1'][i]}?q=80&w=800`
      }))
    }
  ];

  return (
    <CategoryPage 
      pageTitle="Men's" pageTitleHighlight="Clothing" 
      pageDescription="Explore our premium clothing line. T-Shirts, hoodies, shirts, and jackets for every occasion."
      categories={categories}
    />
  );
};
export default Clothes;
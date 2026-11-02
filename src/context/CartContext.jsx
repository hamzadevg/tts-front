import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    // Koi strict ID check nahi. Jo bhi ID milegi, chalega.
    const productId = product._id || product.id;
    
    if (!productId) {
      console.error("Product ID missing!", product);
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => (item._id === productId || item.id === productId));
      
      if (existingItem) {
        return prevCart.map((item) =>
          (item._id === productId || item.id === productId) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, _id: productId, id: productId, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => (item._id !== id && item.id !== id)));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item._id === id || item.id === id) ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => {
    const priceString = String(item.price);
    const price = parseInt(priceString.replace(/[^0-9]/g, ''));
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
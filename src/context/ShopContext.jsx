import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('kero_cart');
    const savedRecent = localStorage.getItem('kero_recent');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
  }, []);

  // Salvar carrinho sempre que muda
  useEffect(() => {
    localStorage.setItem('kero_cart', JSON.stringify(cart));
  }, [cart]);

  // Salvar vistos recentemente sempre que um produto é visualizado
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove duplicado se existir, depois adiciona no início
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 6); // Máximo 6 itens
      
      localStorage.setItem('kero_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, cartCount, recentlyViewed, addToRecentlyViewed 
    }}>
      {children}
    </ShopContext.Provider>
  );
};
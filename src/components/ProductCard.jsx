import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';

const ProductCard = ({ product, onBuyNow }) => {
  const navigate = useNavigate();
  const { addToCart } = useShop();
  const { showNotification } = useNotification();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;
    const randomDelay = Math.floor(Math.random() * 3000) + 3000; 
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, randomDelay);
    return () => clearInterval(interval);
  }, [product.images?.length]);

  const handleCardClick = () => navigate(`/product/${product.id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showNotification({
      title: 'Produto adicionado',
      message: `${product.name} foi adicionado ao carrinho.`,
      type: 'success'
    });
  };

  const handleOrderNow = (e) => {
    e.stopPropagation();
    if (onBuyNow) onBuyNow(product);
    else navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-keroOrange hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
        <div className="absolute top-1 left-1 flex flex-col gap-0.5 z-10">
          {product.stock < 5 && (
             <span className="bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded shadow-sm uppercase leading-none">
               Stock Baixo
             </span>
          )}
          {product.oldPrice && (
            <span className="bg-keroOrange text-white text-[8px] font-bold px-1 py-0.5 rounded shadow-sm uppercase leading-none">
              -{Math.round(((product.oldPrice - product.price)/product.oldPrice)*100)}%
            </span>
          )}
        </div>
      </div>

      <div className="p-1.5 flex flex-col flex-grow">
        <h3 className="text-[11px] md:text-xs font-medium text-gray-800 line-clamp-2 leading-tight h-[2rem] mb-0.5 group-hover:text-keroOrange transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-sm md:text-base font-extrabold text-keroOrange leading-none">
            Kz {product.price?.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[9px] text-gray-400 line-through decoration-red-500 leading-none">
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1 mt-auto">
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-0.5 bg-gray-100 text-gray-700 text-[9px] md:text-[10px] font-bold py-1 rounded hover:bg-gray-200 transition active:scale-95 leading-none"
          >
            <ShoppingCart size={10} /> Add
          </button>
          <button 
            onClick={handleOrderNow}
            className="flex items-center justify-center gap-0.5 bg-keroOrange text-white text-[9px] md:text-[10px] font-bold py-1 rounded hover:bg-keroDarkOrange transition active:scale-95 shadow-sm leading-none"
          >
            <Zap size={10} fill="white"/> Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const CarouselSuggestions = ({ products, onViewProduct }) => {
  const { addToRecentlyViewed } = useShop();

  // Pega 8 produtos aleatórios para sugerir
  const suggestions = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <div className="py-8 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 mb-4 flex justify-between items-end">
        <h3 className="text-xl font-bold text-keroBlack">Sugestões Para Ti 🔥</h3>
        <ChevronRight className="text-keroOrange" />
      </div>
      
      <div className="flex overflow-x-auto hide-scrollbar gap-4 px-4 pb-2 snap-x">
        {suggestions.map(prod => (
          <div 
            key={prod.id}
            onClick={() => {
              addToRecentlyViewed(prod);
              onViewProduct(prod);
            }}
            className="min-w-[160px] snap-start cursor-pointer group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-keroGrayLight mb-2 relative">
               <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
            </div>
            <p className="text-sm font-medium text-keroBlack line-clamp-1">{prod.name}</p>
            <p className="text-keroOrange font-bold text-sm">Kz {prod.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSuggestions;
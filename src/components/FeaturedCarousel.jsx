import React from 'react';
import ProductCard from './ProductCard';

const FeaturedCarousel = ({ products }) => {
  // Duplicamos os produtos para criar um loop infinito visual perfeito
  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative w-full overflow-hidden py-6 bg-white border-y border-gray-100 mb-8 group">
       <div className="container mx-auto px-4 mb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-keroBlack flex items-center gap-2">
            <span className="w-1.5 h-6 bg-keroOrange rounded-full"></span>
            Destaques da Semana 🔥
          </h3>
          <div className="hidden md:block text-xs text-gray-500 italic">Passe o rato para pausar</div>
       </div>
       
      {/* Container do Carrossel */}
      <div 
        className="flex gap-4 px-4 container mx-auto"
        style={{ 
          animation: 'scroll-carousel 30s linear infinite',
          width: 'max-content' // Garante que a largura total acomode todos os itens duplicados
        }}
      >
        {duplicatedProducts.map((prod, idx) => (
          <div key={`${prod.id}-${idx}`} className="min-w-[160px] md:min-w-[200px] snap-start">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>

      {/* Estilos CSS Inline para a Animação Infinita */}
      <style>{`
        @keyframes scroll-carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Move metade da distância total (já que duplicámos) */
        }
        
        /* Pausa a animação quando o mouse está em cima */
        .group:hover > div[style*="animation"] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default FeaturedCarousel;
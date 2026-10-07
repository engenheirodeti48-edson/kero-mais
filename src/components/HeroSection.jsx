import React from 'react';
import { ArrowRight, Truck, ShieldCheck, Headphones } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      
      {/* BANNER PRINCIPAL ESTILO VENDAANGOLA */}
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-900 group">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2c4b9cd?q=80&w=2070&auto=format&fit=crop" 
          alt="Sale Background" 
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute top-1/2 left-4 md:left-12 transform -translate-y-1/2 max-w-lg">
          <span className="inline-block bg-keroOrange text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Mega Promoção
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            ATÉ 50% OFF EM <br/> <span className="text-keroOrange">ELETRÓNICOS</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-2">
            Smartphones, laptops e acessórios com garantia e entrega rápida em Luanda. Não perca!
          </p>
          <button className="bg-white text-keroBlack font-bold py-3 px-8 rounded-lg hover:bg-keroOrange hover:text-white transition-colors flex items-center gap-2 shadow-xl">
            Ver Ofertas <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* TRUST BADGES (Barra de Confiança abaixo do banner) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
          <div className="bg-green-100 p-2 rounded-full text-green-600"><Truck size={20}/></div>
          <div>
            <h4 className="font-bold text-sm text-keroBlack">Entrega Rápida</h4>
            <p className="text-xs text-gray-500">Em Luanda em 24h</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600"><ShieldCheck size={20}/></div>
          <div>
            <h4 className="font-bold text-sm text-keroBlack">Pagamento Seguro</h4>
            <p className="text-xs text-gray-500">Via WhatsApp Confirmado</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
          <div className="bg-orange-100 p-2 rounded-full text-keroOrange"><Headphones size={20}/></div>
          <div>
            <h4 className="font-bold text-sm text-keroBlack">Suporte Direto</h4>
            <p className="text-xs text-gray-500">Fale connosco agora</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
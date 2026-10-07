import React, { useState } from 'react';
import { Search, ShoppingCart, User, Home, Smartphone, Shirt, Utensils, HeartPulse, Car, Dumbbell, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onSearchChange, searchQuery, onOpenCart }) => {
  const { cartCount } = useShop();
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navItems = [
    { name: "Início", icon: Home, path: "/" },
    { name: "Tech", icon: Smartphone, path: "/category/Eletrónicos" },
    { name: "Moda", icon: Shirt, path: "/category/Moda Masculina" },
    { name: "Casa", icon: Utensils, path: "/category/Casa & Cozinha" },
    { name: "Beleza", icon: HeartPulse, path: "/category/Saúde & Beleza" },
    { name: "Auto", icon: Car, path: "/category/Automóvel" },
    { name: "Fit", icon: Dumbbell, path: "/category/Desporto" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        
        {/* LINHA PRINCIPAL: Lupa (Mobile) | Logo (Centro) | Carrinho */}
        <div className="flex items-center justify-between gap-4 relative">
          
          {/* 1. Ícone de Lupa (Apenas Mobile) */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)} 
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Pesquisar"
          >
            {showMobileSearch ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* 2. Logo Centralizado (Mobile) / Esquerda (Desktop) */}
          <div className={`flex-1 flex ${location.pathname === '/' ? 'justify-center md:justify-start' : 'justify-center md:justify-start'}`}>
            <Link to="/" className="cursor-pointer select-none group">
               <h1 className="text-xl md:text-2xl font-black italic tracking-tighter text-keroBlack uppercase leading-none flex items-center gap-1">
                 Kero<span className="text-keroOrange group-hover:scale-110 transition-transform origin-left">Mais</span>
               </h1>
            </Link>
          </div>

          {/* 3. Barra de Pesquisa (Apenas Desktop) */}
          <div className="hidden md:block flex-grow max-w-xl mx-8 relative group">
            <input 
              type="text" 
              placeholder="Pesquisar por nome, marca ou tipo..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border border-transparent focus:border-keroOrange focus:bg-white rounded-full text-sm outline-none transition-all shadow-inner"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-keroOrange hover:bg-keroDarkOrange text-white px-4 rounded-full flex items-center justify-center transition-colors shadow-sm">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* 4. Carrinho (Direita) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onOpenCart?.()}
              className="relative flex flex-col items-center cursor-pointer group text-gray-700 hover:text-keroOrange transition"
              aria-label="Abrir Carrinho"
            >
              {/* Ícone de Carrinho (ShoppingCart) em vez de Sacola */}
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" strokeWidth={2} />
              <span className="text-[10px] font-bold mt-0.5 hidden sm:block">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* BARRA DE PESQUISA MOBILE (Toggle) */}
        {showMobileSearch && (
          <div className="md:hidden mt-4 relative animate-fadeIn">
             <input 
                type="text" 
                placeholder="O que procuras? (ex: iPhone, Telefone...)" 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full pl-4 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-full text-sm outline-none focus:border-keroOrange focus:ring-1 focus:ring-keroOrange"
              />
              <button 
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-3 text-gray-400 hover:text-keroOrange"
              >
                <X size={20} />
              </button>
          </div>
        )}
      </div>
      
      {/* NAVBAR DE CATEGORIAS (APENAS MOBILE - Desktop usa Sidebar) */}
      <nav className="md:hidden bg-gray-50 border-t border-gray-200 overflow-x-auto hide-scrollbar whitespace-nowrap py-2 px-2">
         <ul className="flex justify-around text-xs font-bold text-gray-600 min-w-max">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${
                    isActive(item.path) 
                      ? 'text-keroOrange bg-orange-50' 
                      : 'hover:text-keroOrange'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="uppercase tracking-wide text-[9px]">{item.name}</span>
                </Link>
              </li>
            ))}
         </ul>
      </nav>
    </header>
  );
};

export default Header;
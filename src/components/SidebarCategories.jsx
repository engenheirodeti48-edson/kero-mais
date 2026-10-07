import React from 'react';
import { ChevronRight, Tag, Shirt, Smartphone, Home, HeartPulse, Car, Watch, BookOpen, Dumbbell } from 'lucide-react';

const categoriesData = [
  { name: "Todos", icon: Tag, slug: "Todos" },
  { name: "Eletrónicos", icon: Smartphone, slug: "Eletrónicos" },
  { name: "Moda Masculina", icon: Shirt, slug: "Moda Masculina" },
  { name: "Casa & Cozinha", icon: Home, slug: "Casa & Cozinha" },
  { name: "Saúde & Beleza", icon: HeartPulse, slug: "Saúde & Beleza" },
  { name: "Automóvel", icon: Car, slug: "Automóvel" },
  { name: "Desporto", icon: Dumbbell, slug: "Desporto" },
  { name: "Brinquedos", icon: Watch, slug: "Brinquedos" },
];

const SidebarCategories = ({ activeCategory, onSelect }) => {
  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0 pt-20 pb-8 px-4 shadow-sm">
      <h3 className="font-bold text-lg text-keroBlack mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
        <Tag size={18} className="text-keroOrange"/> Categorias
      </h3>
      <nav className="space-y-1">
        {categoriesData.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              activeCategory === cat.slug
                ? 'bg-keroOrange/10 text-keroOrange border-l-4 border-keroOrange' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-keroBlack'
            }`}
          >
            <div className="flex items-center gap-3">
              <cat.icon size={18} className={activeCategory === cat.slug ? 'text-keroOrange' : 'text-gray-400 group-hover:text-keroOrange'} />
              <span>{cat.name}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
          </button>
        ))}
      </nav>
      
      {/* Banner Promocional Pequeno na Sidebar */}
      <div className="mt-8 bg-gradient-to-br from-keroBlack to-gray-800 rounded-xl p-4 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-16 h-16 bg-keroOrange rounded-full -mr-8 -mt-8 opacity-20"></div>
         <h4 className="font-bold text-sm mb-1">Oferta Relâmpago</h4>
         <p className="text-xs text-gray-300 mb-3">Descontos até 40% hoje!</p>
         <button className="w-full bg-keroOrange text-white text-xs font-bold py-2 rounded hover:bg-keroDarkOrange transition">
           Ver Agora
         </button>
      </div>
    </aside>
  );
};

export default SidebarCategories;
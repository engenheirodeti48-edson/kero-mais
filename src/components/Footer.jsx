import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-keroBlack text-white pt-12 pb-6 mt-12 border-t-4 border-keroOrange relative overflow-hidden">
      {/* Elemento Decorativo Sutil */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-keroOrange/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          
          {/* COLUNA 1: MARCA E CONTACTO */}
          <div className="space-y-5">
            <Link to="/" className="inline-block group">
              <h2 className="text-3xl font-black italic tracking-tighter text-white flex items-center gap-1">
                Kero<span className="text-keroOrange group-hover:scale-110 transition-transform origin-left">Mais</span>
              </h2>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              A sua loja online de confiança em Angola. Entrega rápida e atendimento humanizado.
            </p>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3 group cursor-pointer hover:text-keroOrange transition-colors">
                <MapPin size={16} className="text-keroOrange flex-shrink-0"/>
                <span>Cazenga - Tala Hadi, Luanda</span>
              </div>
              
              <div className="flex items-center gap-3 group cursor-pointer hover:text-keroOrange transition-colors">
                <Phone size={16} className="text-keroOrange flex-shrink-0"/>
                <a href="tel:+244954309236" className="hover:underline decoration-keroOrange/50 underline-offset-4">
                  +244 954 309 236
                </a>
              </div>
              
              <div className="flex items-center gap-3 group cursor-pointer hover:text-green-400 transition-colors">
                <MessageCircle size={16} className="text-green-500 flex-shrink-0"/>
                <a 
                  href="https://wa.me/244954309236?text=Olá,%20vi%20na%20loja%20Kero%20Mais" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:underline decoration-green-500/50 underline-offset-4"
                >
                  WhatsApp Direto
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA 2: LEGAL & SUPORTE */}
          <div className="flex flex-col md:items-end md:text-right">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 max-w-sm w-full">
              <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2 md:justify-end">
                Legal & Suporte
              </h3>
              
              <Link 
                to="/policies" 
                className="inline-block bg-gray-800 hover:bg-keroOrange text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 shadow-sm border border-gray-700 hover:border-transparent hover:shadow-md mb-3"
              >
                Termos e Políticas
              </Link>
              
              <p className="text-xs text-gray-400 leading-relaxed">
                Leia atentamente antes de realizar qualquer compra ou devolução.
              </p>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {currentYear} Kero Mais. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por <span className="text-keroOrange font-bold">Onyx Prime</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
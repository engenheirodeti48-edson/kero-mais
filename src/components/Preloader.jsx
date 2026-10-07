import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula tempo de carregamento inicial (podes ajustar depois)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        {/* Logo Estilizado via CSS para não depender de imagem externa aqui */}
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-keroBlack uppercase">
          Kero<span className="text-keroOrange">Mais</span>
        </h1>
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-keroOrange w-1/2 animate-[slide_1s_infinite_linear]"></div>
        </div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Carregando ofertas...</p>
      </div>
      
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
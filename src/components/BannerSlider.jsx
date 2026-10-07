import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2070&auto=format&fit=crop", // Eletrónicos/Tech Setup
    title: "TECH DE PONTA",
    subtitle: "Smartphones, Laptops e Gadgets com garantia local.",
    btnText: "Ver Eletrónicos",
    gradient: "from-blue-900/90 via-black/60 to-transparent",
    link: "/category/Eletrónicos"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2076&auto=format&fit=crop", // Moda/Shopping Bags Realistas
    title: "ESTILO URBANO",
    subtitle: "As últimas tendências da moda chegaram a Luanda.",
    btnText: "Explorar Moda",
    gradient: "from-pink-900/90 via-black/60 to-transparent",
    link: "/category/Moda Masculina"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2076&auto=format&fit=crop", // Cozinha Moderna
    title: "SUA CASA IDEAL",
    subtitle: "Decoração, cozinha e utilidades domésticas.",
    btnText: "Comprar Agora",
    gradient: "from-emerald-900/90 via-black/60 to-transparent",
    link: "/category/Casa & Cozinha"
  }
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-lg mb-6 group border border-gray-200">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Imagem de Fundo */}
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" loading="lazy" />
          
          {/* Gradiente Forte para Legibilidade */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
          
          {/* Conteúdo Textual */}
          <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight drop-shadow-md uppercase tracking-tight">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-gray-200 mb-6 font-medium line-clamp-2">
              {slide.subtitle}
            </p>
            <a href={slide.link} className="inline-flex items-center gap-2 bg-keroOrange hover:bg-white hover:text-keroBlack text-white font-bold py-3 px-8 rounded-lg shadow-xl transform transition hover:scale-105">
              {slide.btnText} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      ))}

      {/* Controles Laterais */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-keroOrange transition opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronLeft size={24}/>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-keroOrange transition opacity-0 group-hover:opacity-100 z-20"
      >
        <ChevronRight size={24}/>
      </button>

      {/* Indicadores Inferiores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-keroOrange w-8' : 'bg-white/50 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
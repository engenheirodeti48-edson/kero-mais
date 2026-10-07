import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SidebarCategories from '../components/SidebarCategories';
import BannerSlider from '../components/BannerSlider';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import CheckoutModal from '../components/CheckoutModal';
import { getActiveProducts, getFeaturedProducts } from '../services/productService';
import { MessageCircle, Grid, ChevronDown } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { categories } from '../data/categories';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados UI
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(22);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);

  // Buscar Dados do Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actives, features] = await Promise.all([
          getActiveProducts(),
          getFeaturedProducts(10)
        ]);
        setAllProducts(actives);
        setFeaturedProducts(features);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrar Produtos
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "Todos" || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [allProducts, searchQuery, activeCategory]);

  // Reset Pagination on Filter Change
  useEffect(() => {
    setVisibleCount(22);
  }, [activeCategory, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => setVisibleCount(prev => prev + 22);
  
  const openCart = () => setShowCartModal(true);
  
  const handleQuickBuy = (product) => {
    setSelectedProductForModal(product);
    setShowQuickBuyModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header 
        onSearchChange={setSearchQuery} 
        searchQuery={searchQuery}
        onOpenCart={openCart} 
      />
      
      <div className="container mx-auto px-4 py-6 flex gap-6 max-w-[1400px] flex-grow">
        <SidebarCategories 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
        
        <main className="flex-grow min-w-0">
          {loading ? (
            <div className="py-20 text-center text-gray-400">Carregando ofertas incríveis...</div>
          ) : (
            <>
              <BannerSlider />
              
              {/* Destaques vindos do Firebase */}
              {featuredProducts.length > 0 && (
                <FeaturedCarousel products={featuredProducts} />
              )}

              {/* Filtros Mobile */}
              <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                {["Todos", ...categories].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                      activeCategory === cat 
                        ? 'bg-keroBlack text-white border-keroBlack' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-keroOrange'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-end mb-4 mt-6">
                <h2 className="text-xl font-bold text-keroBlack flex items-center gap-2">
                  <Grid size={20} className="text-keroOrange" />
                  {activeCategory === "Todos" ? "Todos os Produtos" : activeCategory}
                </h2>
                <span className="text-sm text-gray-500">{filteredProducts.length} itens</span>
              </div>

              {/* Grelha de Produtos */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {visibleProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onBuyNow={handleQuickBuy}
                  />
                ))}
              </div>
              
              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 col-span-full">
                  <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                </div>
              )}

              {/* Botão Load More */}
              {hasMore && (
                <div className="mt-8 text-center">
                  <button 
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 bg-keroBlack hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-1 active:scale-95"
                  >
                    Explorar Mais Produtos <ChevronDown size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />

      {/* Botão Flutuante WhatsApp */}
      <a 
        href={generateWhatsAppLink("Olá! Preciso de ajuda com um pedido na Kero Mais.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
      >
        <MessageCircle size={32} fill="white" stroke="none" />
      </a>

      {/* Modais */}
      <CartModal isOpen={showCartModal} onClose={() => setShowCartModal(false)} />
      <CheckoutModal 
        isOpen={showQuickBuyModal} 
        onClose={() => { setShowQuickBuyModal(false); setSelectedProductForModal(null); }}
        singleProduct={selectedProductForModal}
      />
    </div>
  );
};

export default Home;
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationModal from './components/NotificationModal';

import { fetchProducts } from './utils/fetchProducts';
import { generateWhatsAppLink } from './utils/whatsapp';

import Header from './components/Header';
import SidebarCategories from './components/SidebarCategories';
import BannerSlider from './components/BannerSlider';
import FeaturedCarousel from './components/FeaturedCarousel';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal'; 
import CartModal from './components/CartModal';         
import Preloader from './components/Preloader';
import ProductDetail from './pages/ProductDetail';
import Policies from './pages/Policies';
import Admin from './pages/Admin';

import { MessageCircle, Grid, ChevronDown } from 'lucide-react';

function HomePage({ setSearchQuery, searchQuery, activeCategory, setActiveCategory, onBuyNow }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(22);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setAllProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // LÓGICA DE PESQUISA INTELIGENTE
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesCat = activeCategory === "Todos" || p.category === activeCategory;
      
      let matchesSearch = true;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchText = `${p.name} ${p.description} ${p.category} ${p.brand}`.toLowerCase();
        const words = query.split(' ').filter(w => w.length > 0);
        matchesSearch = words.every(word => searchText.includes(word));
      }

      return matchesSearch && matchesCat;
    });
  }, [allProducts, searchQuery, activeCategory]);

  useEffect(() => {
    setVisibleCount(22);
  }, [activeCategory, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => setVisibleCount(prev => prev + 22);

  // FILTRAGEM ESTRITA DE DESTAQUES
  const featuredProducts = useMemo(() => {
    return allProducts.filter(p => p.isFeatured === true);
  }, [allProducts]);

  if (loading) {
    return (
      <div className="flex-grow min-w-0 flex flex-col items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-keroOrange border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-keroOrange font-bold animate-pulse">A carregar produtos...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow min-w-0">
      <BannerSlider />
      
      {/* Carrossel só aparece se houver produtos estritamente marcados como destaque */}
      {featuredProducts.length > 0 && <FeaturedCarousel products={featuredProducts} />}

      {/* Filtros Mobile */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar px-4">
        {["Todos", "Eletrónicos", "Moda Masculina", "Moda Feminina", "Casa & Cozinha", "Saúde & Beleza", "Automóvel", "Desporto", "Brinquedos"].map(cat => (
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

      <div className="flex justify-between items-end mb-4 mt-6 px-4 lg:px-0">
        <h2 className="text-xl font-bold text-keroBlack flex items-center gap-2">
          <Grid size={20} className="text-keroOrange" />
          {activeCategory === "Todos" ? "Todos os Produtos" : activeCategory}
        </h2>
        <span className="text-sm text-gray-500">{filteredProducts.length} itens</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 px-4 lg:px-0">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} onBuyNow={onBuyNow} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 col-span-full mx-4 lg:mx-0">
          <p className="text-gray-500">Nenhum produto encontrado para "{searchQuery}".</p>
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center pb-8">
          <button 
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 bg-keroBlack hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-1 active:scale-95"
          >
            Explorar Mais Produtos <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function LayoutContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProductForModal, setSelectedProductForModal] = useState(null); 
  
  const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/category/')) {
       const catName = decodeURIComponent(location.pathname.split('/category/')[1]);
       setActiveCategory(catName);
    }
  }, [location]);

  const handleQuickBuy = (product) => {
    setSelectedProductForModal(product);
    setShowQuickBuyModal(true);
  };

  const openCart = () => setShowCartModal(true);

  if (location.pathname === '/admin') {
    return <Admin />;
  }

  return (
    <>
      <Preloader />
      
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <Header onSearchChange={setSearchQuery} searchQuery={searchQuery} onOpenCart={openCart} />
        
        <div className="container mx-auto py-6 flex gap-6 max-w-[1400px] flex-grow">
          <SidebarCategories 
            activeCategory={activeCategory} 
            onSelect={(cat) => {
              setActiveCategory(cat);
              if (cat !== "Todos") {
                 navigate(`/category/${encodeURIComponent(cat)}`, { replace: true });
              } else {
                 navigate('/', { replace: true });
              }
            }} 
          />
          
          <div className="flex-grow min-w-0">
            <Routes>
              <Route path="/" element={
                <HomePage 
                  setSearchQuery={setSearchQuery} 
                  searchQuery={searchQuery}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  onBuyNow={handleQuickBuy}
                />
              } />
              <Route path="/category/:catName" element={
                 <HomePage 
                   setSearchQuery={setSearchQuery} 
                   searchQuery={searchQuery}
                   activeCategory={activeCategory}
                   setActiveCategory={setActiveCategory}
                   onBuyNow={handleQuickBuy}
                 />
              } />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

        <Footer />

        <a 
          href={generateWhatsAppLink("Olá! Preciso de ajuda com um pedido na Kero Mais.")}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
        >
          <MessageCircle size={32} fill="white" stroke="none" />
        </a>

        <CheckoutModal 
          isOpen={showQuickBuyModal} 
          onClose={() => {
            setShowQuickBuyModal(false);
            setSelectedProductForModal(null);
          }}
          singleProduct={selectedProductForModal}
        />

        <CartModal isOpen={showCartModal} onClose={() => setShowCartModal(false)} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <ToastProvider>
        <ShopProvider>
          <Router>
            <LayoutContent />
            <NotificationModal />
          </Router>
        </ShopProvider>
      </ToastProvider>
    </NotificationProvider>
  );
}
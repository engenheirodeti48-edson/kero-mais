import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProducts } from '../utils/fetchProducts';
import { ShoppingCart, Zap, ArrowLeft, Truck, ShieldCheck, Play, X, Minus, Plus, CheckCircle, Grid } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';
import CheckoutModal from '../components/CheckoutModal';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToRecentlyViewed } = useShop();
  const { showNotification } = useNotification();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Refs para swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const loadProduct = async () => {
      const allProducts = await fetchProducts();
      const found = allProducts.find(p => String(p.id) === id);
      if (found) {
        setProduct(found);
        addToRecentlyViewed(found);
        const related = allProducts
          .filter(p => p.category === found.category && p.id !== found.id)
          .slice(0, 4);
        setRelatedProducts(related);
        window.scrollTo(0, 0);
      } else {
        navigate('/');
      }
    };
    loadProduct();
  }, [id]);

  // Handlers de swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!product?.images || product.images.length <= 1) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe para esquerda → próxima imagem
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      } else {
        // Swipe para direita → imagem anterior
        setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
  };

  if (!product) return (
    <div className="container mx-auto py-20 text-center">
      <p className="text-gray-500">Produto não encontrado.</p>
      <Link to="/" className="text-keroOrange font-bold hover:underline mt-4 inline-block">Voltar à loja</Link>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification({
      title: 'Adicionado ao carrinho',
      message: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
      type: 'success',
      icon: CheckCircle
    });
  };

  const handleBuyNow = () => setShowCheckout(true);

  const specs = [
    { label: "Marca", value: product.brand || "Genérico Premium" },
    { label: "Modelo", value: product.model || "N/A" },
    { label: "Garantia", value: product.warranty || "6 Meses (Local)" },
    { label: "Disponibilidade", value: `${product.stock} unidades em stock` },
    { label: "Peso", value: product.weight || "N/A" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen bg-gray-50">
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-keroOrange flex items-center gap-1">
          <ArrowLeft size={14}/> Início
        </Link>
        <span>/</span>
        <Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:text-keroOrange">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-400 truncate max-w-[150px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="lg:col-span-5 p-4 md:p-6 bg-gray-50 flex flex-col gap-4">
          <div 
            className="relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden group select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {showVideoModal && product.video ? (
               <div className="w-full h-full bg-black flex items-center justify-center">
                 <video controls autoPlay className="max-w-full max-h-full">
                   <source src={product.video} type="video/mp4" />
                 </video>
                 <button 
                    onClick={() => setShowVideoModal(false)}
                    className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                 >
                   <X size={20} />
                 </button>
               </div>
            ) : (
              <>
                <img 
                  src={product.images?.[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-2 transition-transform duration-300"
                />
                {product.video && (
                  <button 
                     onClick={() => setShowVideoModal(true)}
                     className="absolute bottom-4 right-4 bg-keroOrange text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                  >
                    <Play size={20} fill="white"/>
                  </button>
                )}
                {/* Indicadores de swipe no mobile */}
                {product.images?.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {product.images.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === selectedImage ? 'bg-keroOrange w-4' : 'bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedImage(idx); setShowVideoModal(false); }}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImage === idx && !showVideoModal ? 'border-keroOrange ring-2 ring-keroOrange/20' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            {product.video && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-keroOrange transition-all flex-shrink-0 relative bg-black"
              >
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <Play size={24} fill="white"/>
                </div>
                <span className="absolute bottom-1 left-1 text-[8px] text-white font-bold bg-black/50 px-1 rounded">VÍDEO</span>
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col">
          <div className="mb-4">
            <span className="text-xs font-bold text-keroOrange uppercase tracking-wide bg-orange-50 px-2 py-1 rounded">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-keroBlack mt-2 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
               <div className="flex text-yellow-400">
                 {[...Array(5)].map((_, i) => <CheckCircle key={i} size={14} fill="currentColor"/>)}
               </div>
               <span className="text-xs text-gray-500">(12 avaliações)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
            <span className="text-3xl md:text-4xl font-extrabold text-keroOrange">Kz {product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through decoration-red-500">Kz {product.oldPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-bold text-gray-700">Qtd:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100 text-gray-600"><Minus size={16} /></button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 text-center border-none focus:ring-0 font-bold text-keroBlack" />
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100 text-gray-600"><Plus size={16} /></button>
            </div>
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <Truck size={12}/> Entrega em 24h Luanda
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button onClick={handleAddToCart} className="flex items-center justify-center gap-2 bg-white border-2 border-keroBlack text-keroBlack font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition active:scale-95">
              <ShoppingCart size={20} /> Adicionar ao Carrinho
            </button>
            <button onClick={handleBuyNow} className="flex items-center justify-center gap-2 bg-keroOrange text-white font-bold py-3 px-6 rounded-lg hover:bg-keroDarkOrange shadow-lg shadow-orange-200 transition active:scale-95">
              <Zap size={20} fill="white"/> Comprar Agora
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
             <h3 className="font-bold text-keroBlack mb-4 flex items-center gap-2">
               <ShieldCheck size={18} className="text-keroOrange"/> Especificações
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
               {specs.map((spec, idx) => (
                 <div key={idx} className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-500">{spec.label}:</span>
                   <span className="font-medium text-gray-800 text-right">{spec.value}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-keroBlack mb-6 flex items-center gap-2">
            <Grid size={20} className="text-keroOrange" />
            Também pode gostar destes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(relProd => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)}
        singleProduct={product}
      />
    </div>
  );
};

export default ProductDetail;
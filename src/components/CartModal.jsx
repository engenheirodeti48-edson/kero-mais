import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';
import { generateWhatsAppLink } from '../utils/whatsapp';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useShop();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '', phone: '', province: 'Luanda', municipality: '', neighborhood: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      showNotification({ title: 'Carrinho vazio', message: 'Adiciona produtos antes de finalizar.', type: 'warning' });
      return;
    }
    if (!formData.name || !formData.phone || !formData.municipality || !formData.neighborhood) {
      showNotification({ 
        title: 'Campos em falta', 
        message: 'Preenche todos os campos de entrega.', 
        type: 'warning' 
      });
      return;
    }

    let msg = `🛒 *NOVO PEDIDO - KERO MAIS*\n\n`;
    msg += `👤 *Cliente:* ${formData.name}\n`;
    msg += ` *Telefone:* ${formData.phone}\n`;
    msg += `📍 *Localização:* ${formData.province}, ${formData.municipality}, ${formData.neighborhood}\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += ` *ITENS DA ENCOMENDA:*\n`;
    
    cart.forEach(item => {
      msg += `- ${item.quantity}x ${item.name}\n`;
      msg += `  Unitário: Kz ${item.price.toLocaleString()} | Subtotal: Kz ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL GERAL:* Kz ${cartTotal.toLocaleString()}\n\n`;
    msg += `_Obs: Aguardo confirmação._`;

    window.open(generateWhatsAppLink(msg), '_blank');
    
    showNotification({
      title: 'Pedido enviado',
      message: `Encomenda de ${cart.length} produto(s) enviada com sucesso. A equipa Kero Mais entrará em contacto contigo.`,
      type: 'success',
      icon: CheckCircle,
      action: { label: 'Continuar a comprar', onClick: () => {} }
    });
    
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <div className="bg-keroBlack p-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShoppingBag size={20}/> O Meu Carrinho ({cart.length})
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
            <X size={24}/>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">O teu carrinho está vazio.</p>
              <button onClick={onClose} className="mt-4 text-keroOrange font-bold underline">Continuar a comprar</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-lg border border-gray-200 flex gap-3 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Kz {item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-keroBlack">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-extrabold text-keroOrange">
                         Kz {(item.price * item.quantity).toLocaleString()}
                       </span>
                       <button 
                         onClick={() => removeFromCart(item.id)}
                         className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="shrink-0 bg-white border-t border-gray-200 p-4 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="font-bold text-gray-700">Total Geral:</span>
              <span className="text-2xl font-extrabold text-keroOrange">Kz {cartTotal.toLocaleString()}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
               <input 
                  required type="text" name="name" placeholder="Nome Completo *" 
                  value={formData.name} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-keroOrange outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                   <input 
                    required type="tel" name="phone" placeholder="Telemóvel *" 
                    value={formData.phone} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-keroOrange outline-none"
                  />
                  <select 
                    name="province" value={formData.province} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-keroOrange outline-none bg-white"
                  >
                    <option value="Luanda">Luanda</option>
                    <option value="Benguela">Benguela</option>
                    <option value="Huambo">Huambo</option>
                    <option value="Outra">Outra Província</option>
                  </select>
                </div>
                <input 
                  required type="text" name="municipality" placeholder="Município *" 
                  value={formData.municipality} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-keroOrange outline-none"
                />
                <input 
                  required type="text" name="neighborhood" placeholder="Bairro / Referência *" 
                  value={formData.neighborhood} onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-keroOrange outline-none"
                />

                <button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={18} fill="white"/> Confirmar Pedido via WhatsApp
                </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
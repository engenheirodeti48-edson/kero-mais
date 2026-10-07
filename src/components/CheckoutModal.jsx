import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, User, ShoppingBag, Send, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNotification } from '../context/NotificationContext';
import { generateWhatsAppLink } from '../utils/whatsapp';

const CheckoutModal = ({ isOpen, onClose, singleProduct = null }) => {
  const { cart, cartTotal, clearCart } = useShop();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '', phone: '', province: 'Luanda', municipality: '', neighborhood: ''
  });

  const itemsToOrder = singleProduct ? [{ ...singleProduct, quantity: 1 }] : cart;
  const totalValue = singleProduct ? singleProduct.price : cartTotal;

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', province: 'Luanda', municipality: '', neighborhood: '' });
    }
  }, [isOpen, singleProduct]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (itemsToOrder.length === 0) {
      showNotification({ title: 'Sem itens', message: 'Não há produtos para encomendar.', type: 'warning' });
      return;
    }

    let msg = ` *NOVO PEDIDO - KERO MAIS*\n\n`;
    msg += `👤 *Cliente:* ${formData.name}\n`;
    msg += `📞 *Telefone:* ${formData.phone}\n`;
    msg += `📍 *Localização:* ${formData.province}, ${formData.municipality}, ${formData.neighborhood}\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *ITENS DA ENCOMENDA:*\n`;
    
    itemsToOrder.forEach(item => {
      msg += `- ${item.quantity}x ${item.name}\n`;
      msg += `  Valor Unitário: Kz ${item.price.toLocaleString()}\n`;
      msg += `  Subtotal: Kz ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL GERAL:* Kz ${totalValue.toLocaleString()}\n\n`;
    msg += `_Obs: Aguardo confirmação de disponibilidade._`;

    window.open(generateWhatsAppLink(msg), '_blank');
    
    showNotification({
      title: 'Pedido enviado',
      message: `Encomenda de "${singleProduct?.name || `${itemsToOrder.length} produtos`}" enviada com sucesso.`,
      type: 'success',
      icon: CheckCircle
    });
    
    if (!singleProduct) clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        
        <div className="bg-keroOrange p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShoppingBag size={20}/> Finalizar Encomenda
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
            <X size={24}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
            <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">Resumo da Compra</h4>
            
            {itemsToOrder.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <div className="flex-1 pr-2">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Qtd: {item.quantity} x Kz {item.price.toLocaleString()}</p>
                </div>
                <span className="text-sm font-bold text-keroOrange whitespace-nowrap">
                  Kz {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">Total Geral:</span>
              <span className="text-xl font-extrabold text-keroOrange">Kz {totalValue.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18}/>
              <input 
                required type="text" name="name" placeholder="Nome Completo *" 
                value={formData.name} onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-keroOrange focus:ring-1 focus:ring-keroOrange outline-none transition text-sm"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18}/>
              <input 
                required type="tel" name="phone" placeholder="Número de Telefone (WhatsApp) *" 
                value={formData.phone} onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-keroOrange focus:ring-1 focus:ring-keroOrange outline-none transition text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
               <select 
                name="province" value={formData.province} onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2.5 text-sm focus:border-keroOrange outline-none bg-white"
              >
                <option value="Luanda">Luanda</option>
                <option value="Benguela">Benguela</option>
                <option value="Huambo">Huambo</option>
                <option value="Huíla">Huíla</option>
                <option value="Cabinda">Cabinda</option>
              </select>
              
              <div className="relative col-span-1">
                 <MapPin className="absolute left-3 top-3 text-gray-400" size={18}/>
                 <input 
                  required type="text" name="municipality" placeholder="Município *" 
                  value={formData.municipality} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-keroOrange outline-none text-sm"
                />
              </div>
            </div>
            
            <input 
              required type="text" name="neighborhood" placeholder="Bairro / Ponto de Referência Específico *" 
              value={formData.neighborhood} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-keroOrange outline-none text-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={itemsToOrder.length === 0}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <Send size={18} fill="white"/> Enviar Pedido via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
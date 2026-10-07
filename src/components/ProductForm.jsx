import React, { useState, useEffect } from 'react';
import { Save, X, UploadCloud, ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { addProduct, updateProduct } from '../services/productService';
import { categories } from '../data/categories'; // Criaremos este arquivo abaixo

const ProductForm = ({ initialData, onCancel, onSuccess }) => {
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: 'Eletrónicos',
    stock: '',
    description: '',
    warranty: '6 Meses',
    brand: '',
    model: '',
    weight: '',
    images: ['', '', '', '', ''], // Máximo 5 campos de URL
    videoUrl: '',
    isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        images: initialData.images || ['', '', '', '', '']
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages.filter(img => img !== '') }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.name || !formData.price || formData.images.length === 0) {
      toast.error("Nome, Preço e Pelo Menos Uma Imagem são obrigatórios.");
      return;
    }

    try {
      const productPayload = {
        ...formData,
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        stock: parseInt(formData.stock) || 0,
        images: formData.images.filter(url => url.trim() !== '') // Remove strings vazias
      };

      if (isEditing) {
        await updateProduct(initialData.id, productPayload);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await addProduct(productPayload);
        toast.success("Produto publicado com sucesso!");
      }
      
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar produto. Verifique a conexão.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-keroBlack p-4 flex justify-between items-center text-white">
        <h3 className="font-bold text-lg">{isEditing ? 'Editar Produto' : 'Novo Produto'}</h3>
        <button onClick={onCancel} className="hover:bg-white/20 p-1 rounded-full transition">
          <X size={20}/>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Produto *</label>
            <input 
              name="name" value={formData.name} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none"
              placeholder="Ex: iPhone 14 Pro Max"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Preço (Kz) *</label>
            <input 
              type="number" name="price" value={formData.price} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Preço Antigo (Opcional)</label>
            <input 
              type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Categoria *</label>
            <select 
              name="category" value={formData.category} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Estoque Disponível *</label>
            <input 
              type="number" name="stock" value={formData.stock} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none"
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Especificações Técnicas */}
        <div className="border-t pt-4">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><UploadCloud size={16}/> Detalhes Técnicos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Marca</label>
              <input name="brand" value={formData.brand} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-keroOrange"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Modelo</label>
              <input name="model" value={formData.model} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-keroOrange"/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Peso (kg)</label>
              <input name="weight" value={formData.weight} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-keroOrange"/>
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Garantia</label>
              <input name="warranty" value={formData.warranty} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-keroOrange"/>
            </div>
          </div>
        </div>

        {/* Mídia (Imagens e Vídeo) */}
        <div className="border-t pt-4">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ImagePlus size={16}/> Fotos e Vídeo</h4>
          <p className="text-xs text-gray-500 mb-3">Cole os links diretos das suas imagens (ex: ImgBB) e vídeo.</p>
          
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-xs font-bold text-gray-400 w-6">#{idx+1}</span>
                <input 
                  type="url"
                  placeholder={`Link da imagem ${idx+1} (Obrigatório para #1)`}
                  value={formData.images[idx] || ''}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-keroOrange"
                />
              </div>
            ))}
            
            <div className="mt-3">
               <label className="block text-xs font-medium text-gray-600 mb-1">Link do Vídeo (Opcional)</label>
               <input 
                 type="url"
                 placeholder="https://..."
                 value={formData.videoUrl}
                 onChange={handleChange}
                 name="videoUrl"
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-keroOrange"
               />
            </div>
          </div>
        </div>

        {/* Descrição Longa */}
        <div className="border-t pt-4">
           <label className="block text-sm font-bold text-gray-700 mb-1">Descrição Detalhada *</label>
           <textarea 
             name="description" value={formData.description} onChange={handleChange}
             rows="4"
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none resize-none"
             placeholder="Descreva as características principais, benefícios e o que está incluído na caixa..."
             required
           ></textarea>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            type="submit"
            className="flex-1 bg-keroOrange hover:bg-keroDarkOrange text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <Save size={18} /> {isEditing ? 'Salvar Alterações' : 'Publicar Produto'}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProductForm;
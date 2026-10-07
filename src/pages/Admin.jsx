import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, Edit, Plus, LogOut, X, Package, CheckCircle, 
  Image as ImageIcon, Video, ToggleLeft, ToggleRight, Loader2,
  Search, Filter, Star
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const CATEGORIES = [
  'Eletrónicos', 'Moda Masculina', 'Moda Feminina', 'Casa & Cozinha',
  'Saúde & Beleza', 'Automóvel', 'Desporto', 'Brinquedos'
];

export default function Admin() {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  
  // Estado do formulário
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', old_price: '', category: 'Eletrónicos',
    stock: '', brand: '', model: '', weight: '', warranty: '',
    is_active: true, is_featured: false // Checkbox de Destaque
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideo, setExistingVideo] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProducts();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProducts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showNotification({
        title: 'Erro no login',
        message: error.message,
        type: 'error'
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      showNotification({
        title: 'Limite excedido',
        message: 'Máximo de 5 imagens permitidas.',
        type: 'warning'
      });
      e.target.value = '';
      return;
    }
    setImageFiles(files);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        showNotification({
          title: 'Vídeo muito grande',
          message: 'O vídeo deve ter no máximo 50MB.',
          type: 'warning'
        });
        e.target.value = '';
        return;
      }
      setVideoFile(file);
    }
  };

  const uploadFile = async (file, folder = '') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);
    
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      showNotification({
        title: 'Campos obrigatórios',
        message: 'Preenche pelo menos Nome, Preço e Categoria.',
        type: 'warning'
      });
      return;
    }

    setUploading(true);
    try {
      // Upload das imagens
      let imageUrls = [...existingImages];
      for (const file of imageFiles) {
        const url = await uploadFile(file, 'products/');
        imageUrls.push(url);
      }

      // Upload do vídeo (se houver novo)
      let videoUrl = existingVideo;
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'videos/');
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        old_price: formData.old_price ? parseInt(formData.old_price) : null,
        category: formData.category,
        images: imageUrls,
        video: videoUrl,
        stock: parseInt(formData.stock) || 0,
        brand: formData.brand || null,
        model: formData.model || null,
        weight: formData.weight || null,
        warranty: formData.warranty || null,
        is_active: formData.is_active,
        is_featured: formData.is_featured, // ENVIA O ESTADO DO DESTAQUE
      };

      let error;
      if (isEditing) {
        const res = await supabase.from('products').update(productData).eq('id', currentId);
        error = res.error;
      } else {
        const res = await supabase.from('products').insert([productData]);
        error = res.error;
      }

      if (error) throw error;

      // Modal de sucesso
      showNotification({
        title: 'Produto cadastrado com sucesso',
        message: isEditing 
          ? `"${formData.name}" foi atualizado na loja.`
          : `Novo produto adicionado! +1 produto disponível na Kero Mais.`,
        type: 'success',
        icon: CheckCircle,
        action: {
          label: 'Ver na loja',
          onClick: () => navigate('/')
        }
      });

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      showNotification({
        title: 'Erro ao salvar produto',
        message: err.message || 'Tenta novamente.',
        type: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setShowForm(false);
    setFormData({
      name: '', description: '', price: '', old_price: '', category: 'Eletrónicos',
      stock: '', brand: '', model: '', weight: '', warranty: '',
      is_active: true, is_featured: false
    });
    setImageFiles([]);
    setVideoFile(null);
    setExistingImages([]);
    setExistingVideo(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    setFormData({
      name: product.name, description: product.description || '', price: product.price, 
      old_price: product.old_price || '', category: product.category, stock: product.stock,
      brand: product.brand || '', model: product.model || '', weight: product.weight || '',
      warranty: product.warranty || '', 
      is_active: product.is_active, 
      is_featured: product.is_featured // CARREGA O ESTADO DO DESTAQUE
    });
    setExistingImages(product.images || []);
    setExistingVideo(product.video || null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, name) => {
    showNotification({
      title: 'Confirmar eliminação',
      message: `Tens a certeza que queres apagar "${name}" permanentemente?`,
      type: 'warning',
      action: {
        label: 'Sim, apagar',
        onClick: async () => {
          const { error } = await supabase.from('products').delete().eq('id', id);
          if (error) {
            showNotification({ title: 'Erro', message: error.message, type: 'error' });
          } else {
            showNotification({
              title: 'Produto eliminado',
              message: `"${name}" foi removido da loja.`,
              type: 'info'
            });
            fetchProducts();
          }
        }
      }
    });
  };

  const toggleActive = async (product) => {
    const newStatus = !product.is_active;
    const { error } = await supabase
      .from('products')
      .update({ is_active: newStatus })
      .eq('id', product.id);
    
    if (error) {
      showNotification({ title: 'Erro', message: error.message, type: 'error' });
    } else {
      showNotification({
        title: newStatus ? 'Produto ativado' : 'Produto desativado',
        message: `"${product.name}" está agora ${newStatus ? 'visível' : 'oculto'} na loja.`,
        type: 'info'
      });
      fetchProducts();
    }
  };

  // Filtrar produtos na lista
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory === 'Todos' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  // TELA DE LOGIN
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-keroOrange">
          <h2 className="text-2xl font-black text-center mb-2 text-keroBlack italic">
            Kero<span className="text-keroOrange">Mais</span>
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">Painel de Gestão</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email de Administrador" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
              required 
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-keroOrange text-white font-bold py-3 rounded-lg hover:bg-keroDarkOrange transition disabled:opacity-50"
            >
              {loading ? 'A entrar...' : 'Aceder ao Painel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // TELA DO DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-keroBlack italic">
              Kero<span className="text-keroOrange">Mais</span>
              <span className="text-sm font-normal text-gray-500 not-italic ml-2">/ Admin</span>
            </h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition border border-red-100"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Se NÃO está a mostrar formulário: mostra lista */}
        {!showForm ? (
          <>
            {/* Barra de ações */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-keroBlack">Produtos</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {products.length} produto{products.length !== 1 ? 's' : ''} no total
                </p>
              </div>
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-keroOrange text-white font-bold py-3 px-6 rounded-lg hover:bg-keroDarkOrange transition shadow-md"
              >
                <Plus size={20} /> Adicionar Produto
              </button>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar produto..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none"
                />
              </div>
              <div className="relative">
                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:border-keroOrange outline-none bg-white appearance-none"
                >
                  <option value="Todos">Todas as categorias</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lista de Produtos */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <Loader2 size={32} className="mx-auto text-keroOrange animate-spin" />
                  <p className="text-gray-500 mt-2">A carregar...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center">
                  <Package size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Nenhum produto encontrado.</p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="mt-4 text-keroOrange font-bold hover:underline"
                  >
                    Adicionar o primeiro produto
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3">Produto</th>
                        <th className="px-6 py-3">Categoria</th>
                        <th className="px-6 py-3">Preço</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Estado</th>
                        <th className="px-6 py-3">Destaque</th>
                        <th className="px-6 py-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="bg-white border-b hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {product.images?.[0] && (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover border border-gray-200"
                                />
                              )}
                              <div className="font-medium text-gray-900">{product.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{product.category}</td>
                          <td className="px-6 py-4 font-bold text-keroOrange">
                            Kz {product.price?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">{product.stock}</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => toggleActive(product)}
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                                product.is_active 
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                            >
                              {product.is_active ? <ToggleRight size={16}/> : <ToggleLeft size={16}/>}
                              {product.is_active ? 'Ativo' : 'Inativo'}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {product.is_featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                <Star size={12} fill="currentColor"/> Destaque
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => handleEdit(product)} 
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                                title="Editar"
                              >
                                <Edit size={16}/>
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id, product.name)} 
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" 
                                title="Apagar"
                              >
                                <Trash2 size={16}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          // FORMULÁRIO DE CADASTRO/EDIÇÃO
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header do formulário */}
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-keroBlack flex items-center gap-2">
                {isEditing ? <Edit size={20} className="text-keroOrange"/> : <Plus size={20} className="text-keroOrange"/>}
                {isEditing ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button 
                onClick={resetForm}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                <X size={18} /> Cancelar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Linha 1: Nome e Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Produto *</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    placeholder="Ex: iPhone 14 Pro Max" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Categoria *</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none bg-white" 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    required
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Linha 2: Preços */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Preço Atual (Kz) *</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    type="number" 
                    placeholder="850000" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Preço Antigo (Kz) - Opcional</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    type="number" 
                    placeholder="950000" 
                    value={formData.old_price} 
                    onChange={e => setFormData({...formData, old_price: e.target.value})} 
                  />
                </div>
              </div>

              {/* Linha 3: Stock e Marca */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock *</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    type="number" 
                    placeholder="10" 
                    value={formData.stock} 
                    onChange={e => setFormData({...formData, stock: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Marca</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    placeholder="Apple" 
                    value={formData.brand} 
                    onChange={e => setFormData({...formData, brand: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Modelo</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    placeholder="iPhone 14" 
                    value={formData.model} 
                    onChange={e => setFormData({...formData, model: e.target.value})} 
                  />
                </div>
              </div>

              {/* Linha 4: Peso e Garantia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Peso</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    placeholder="Ex: 240g" 
                    value={formData.weight} 
                    onChange={e => setFormData({...formData, weight: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Garantia</label>
                  <input 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                    placeholder="Ex: 12 meses" 
                    value={formData.warranty} 
                    onChange={e => setFormData({...formData, warranty: e.target.value})} 
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-keroOrange outline-none" 
                  placeholder="Descreve o produto em detalhe..." 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  rows="3" 
                />
              </div>

              {/* Upload de Imagens */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon size={18} className="text-keroOrange"/> 
                  Imagens do Produto (1 a 5) *
                </label>
                
                {existingImages.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Imagens atuais:</p>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                          >
                            <X size={12}/>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-keroOrange file:text-white hover:file:bg-keroDarkOrange cursor-pointer" 
                />
                {imageFiles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {imageFiles.map((file, idx) => (
                      <div key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                        <ImageIcon size={12}/> {file.name}
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {imageFiles.length} nova(s) imagem(ns) selecionada(s)
                  {existingImages.length > 0 && ` + ${existingImages.length} existente(s)`}
                </p>
              </div>

              {/* Upload de Vídeo */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Video size={18} className="text-keroOrange"/> 
                  Vídeo do Produto (Opcional)
                </label>
                
                {existingVideo && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Vídeo atual:</p>
                    <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-300">
                      <Video size={16} className="text-keroOrange"/>
                      <span className="text-xs text-gray-700 truncate flex-1">{existingVideo}</span>
                      <button
                        type="button"
                        onClick={() => setExistingVideo(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16}/>
                      </button>
                    </div>
                  </div>
                )}

                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleVideoChange} 
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-800 cursor-pointer" 
                />
                {videoFile && (
                  <div className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded inline-flex items-center gap-1">
                    <Video size={12}/> {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">Máximo 50MB. Formatos: MP4, MOV, AVI</p>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.is_active} 
                    onChange={e => setFormData({...formData, is_active: e.target.checked})} 
                    className="w-5 h-5 text-keroOrange rounded focus:ring-keroOrange" 
                  />
                  <span className="font-medium text-gray-800">Produto Ativo (visível na loja)</span>
                </label>
                
                {/* CHECKBOX DE DESTAQUE DA SEMANA */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.is_featured} 
                    onChange={e => setFormData({...formData, is_featured: e.target.checked})} 
                    className="w-5 h-5 text-keroOrange rounded focus:ring-keroOrange" 
                  />
                  <span className="font-medium text-gray-800 flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" fill="currentColor"/> Destaque da Semana
                  </span>
                </label>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={uploading} 
                  className="bg-keroBlack text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? <><Loader2 className="animate-spin" size={18}/> A processar...</> : <><CheckCircle size={18}/> {isEditing ? 'Guardar Alterações' : 'Salvar Produto'}</>}
                </button>
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                >
                  <X size={18} /> Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
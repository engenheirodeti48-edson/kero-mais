import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PowerOff, PowerOn, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllProductsForAdmin, toggleProductStatus, deleteProduct } from '../services/productService';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllProductsForAdmin();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleProductStatus(id, currentStatus);
      toast.success(currentStatus ? "Produto desativado." : "Produto ativado.");
      fetchProducts();
    } catch (e) {
      toast.error("Erro ao alterar status.");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Tem certeza que deseja apagar este produto permanentemente?")) return;
    try {
      await deleteProduct(id);
      toast.success("Produto apagado.");
      fetchProducts();
    } catch (e) {
      toast.error("Erro ao apagar.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <ProductForm 
          initialData={editingProduct} 
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
          onSuccess={handleSuccess}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-keroBlack">Meus Produtos ({products.length})</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-keroOrange hover:bg-keroDarkOrange text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition shadow-md"
        >
          <PlusCircle size={20} /> Adicionar Novo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Carregando produtos...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
          <button onClick={() => setShowForm(true)} className="mt-4 text-keroOrange font-bold underline">Criar o primeiro</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Produto</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Preço</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Stock</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(prod => (
                <tr key={prod.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={prod.images?.[0]} alt="" className="w-12 h-12 object-cover rounded border" onError={(e)=>{e.target.src='https://via.placeholder.com/50'}}/>
                      <div>
                        <p className="font-bold text-sm text-gray-800 line-clamp-1">{prod.name}</p>
                        <p className="text-xs text-gray-500">{prod.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-keroOrange">Kz {Number(prod.price).toLocaleString()}</td>
                  <td className="p-4 text-sm text-gray-600">{prod.stock} unids</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prod.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {prod.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(prod)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar"
                    >
                      <Edit size={16}/>
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(prod.id, prod.isActive)}
                      className={`p-2 rounded-lg transition ${prod.isActive ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                      title={prod.isActive ? "Desativar" : "Ativar"}
                    >
                      {prod.isActive ? <PowerOff size={16}/> : <PowerOn size={16}/>}
                    </button>
                    <button 
                      onClick={() => handleDelete(prod.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Apagar"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// SENHA SIMPLES PARA MVP (Em produção real, use autenticação Firebase Auth)
const ADMIN_PASSWORD = "keromais2026"; 

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdminLogged', 'true');
      toast.success("Bem-vindo, Engenheiro!");
      navigate('/admin/dashboard');
    } else {
      toast.error("Senha incorreta.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-keroOrange">
        <div className="text-center mb-6">
          <Lock size={48} className="mx-auto text-keroOrange mb-2" />
          <h2 className="text-2xl font-bold text-keroBlack">Área Restrita</h2>
          <p className="text-gray-500 text-sm">Gestão de Produtos Kero Mais</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            placeholder="Digite a senha de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-keroOrange focus:ring-2 focus:ring-keroOrange/20 outline-none transition"
            required
          />
          
          <button 
            type="submit"
            className="w-full bg-keroBlack hover:bg-gray-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <LogIn size={20} /> Entrar no Painel
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-6">
          Dica: A senha padrão é "keromais2026". Altere-a futuramente para segurança.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
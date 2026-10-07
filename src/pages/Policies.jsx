import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, RotateCcw, CreditCard, HelpCircle, Mail, Truck, Banknote } from 'lucide-react';

const Policies = () => {
  const location = useLocation();

  // Scroll automático para a secção correta quando a URL muda (ex: /policies#devolucao)
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Pequeno delay para garantir renderização
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Link to="/" className="flex items-center gap-2 text-sm text-keroOrange font-bold hover:underline mb-6">
        <ArrowLeft size={16}/> Voltar à Loja
      </Link>

      <h1 className="text-3xl md:text-4xl font-black text-keroBlack mb-8 border-b-4 border-keroOrange pb-4 inline-block">
        Políticas & Ajuda KERO MAIS
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Menu Lateral de Navegação Interna (Sticky) */}
        <aside className="lg:col-span-1 space-y-2 sticky top-24 self-start hidden lg:block">
          <h3 className="font-bold text-lg text-gray-700 mb-4">Navegar Rápido</h3>
          <ul className="space-y-1">
            <li><a href="#privacidade" className="block p-2 rounded hover:bg-white hover:text-keroOrange transition text-sm font-medium text-gray-600 flex items-center gap-2"><ShieldCheck size={16}/> Privacidade</a></li>
            <li><a href="#termos" className="block p-2 rounded hover:bg-white hover:text-keroOrange transition text-sm font-medium text-gray-600 flex items-center gap-2"><FileText size={16}/> Termos & Condições</a></li>
            <li><a href="#entrega" className="block p-2 rounded hover:bg-white hover:text-keroOrange transition text-sm font-medium text-gray-600 flex items-center gap-2"><Truck size={16}/> Entrega & Prazos</a></li>
            <li><a href="#devolucao" className="block p-2 rounded hover:bg-white hover:text-keroOrange transition text-sm font-medium text-gray-600 flex items-center gap-2"><RotateCcw size={16}/> Devoluções & Reembolsos</a></li>
            <li><a href="#pagamentos" className="block p-2 rounded hover:bg-white hover:text-keroOrange transition text-sm font-medium text-gray-600 flex items-center gap-2"><Banknote size={16}/> Métodos de Pagamento</a></li>
            <li><a href="#contato" className="block p-2 rounded hover:bg-white hover:text-keroOrange transition text-sm font-medium text-gray-600 flex items-center gap-2"><Mail size={16}/> Contato Direto</a></li>
          </ul>
        </aside>

        {/* Conteúdo Principal das Políticas */}
        <main className="lg:col-span-3 space-y-12 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100">
          
          {/* SEÇÃO: PRIVACIDADE */}
          <section id="privacidade" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-keroBlack mb-4 flex items-center gap-2">
              <ShieldCheck className="text-keroOrange"/> Política de Privacidade
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Na KERO MAIS, valorizamos a sua privacidade. Não exigimos cadastro para comprar, mas recolhemos dados mínimos essenciais para processar o seu pedido via WhatsApp (Nome, Telefone, Localização).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>Nunca vendemos os seus dados a terceiros.</li>
              <li>As informações são usadas exclusivamente para entrega e suporte pós-venda.</li>
              <li>Pode solicitar a remoção dos seus dados históricos contactando-nos pelo WhatsApp oficial.</li>
            </ul>
          </section>

          {/* SEÇÃO: TERMOS E CONDIÇÕES */}
          <section id="termos" className="scroll-mt-24 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-keroBlack mb-4 flex items-center gap-2">
              <FileText className="text-keroOrange"/> Termos e Condições
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ao realizar um pedido na nossa plataforma, o cliente concorda com os seguintes termos:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 text-sm">
              <li>**Validade dos Preços:** Os preços exibidos são válidos até esgotarem os stocks disponíveis. Alterações podem ocorrer sem aviso prévio devido à volatilidade cambial.</li>
              <li>**Confirmação de Pedido:** Todo o pedido é confirmado manualmente pela nossa equipa via WhatsApp após o envio da mensagem automática.</li>
              <li>**Estoque:** A disponibilidade final do produto é confirmada no momento do contacto telefónico/WhatsApp.</li>
              <li>**Responsabilidade:** A KERO MAIS não se responsabiliza por danos causados pelo uso indevido dos produtos adquiridos.</li>
            </ol>
          </section>

          {/* SEÇÃO: ENTREGA */}
          <section id="entrega" className="scroll-mt-24 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-keroBlack mb-4 flex items-center gap-2">
              <Truck className="text-keroOrange"/> Entrega e Prazos
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
              <p className="text-blue-800 font-semibold text-sm">🚗 Luanda Urbano: 24h - 48h úteis.</p>
              <p className="text-blue-800 font-semibold text-sm mt-1">📦 Províncias: 3 - 7 dias úteis (dependendo da transportadora).</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Após a confirmação do pagamento (ou acordo de pagamento na entrega), o seu pedido é embalado e enviado imediatamente. Receberá um código de rastreamento ou foto do entregador assim que a encomenda sair do nosso armazém no Cazenga.
            </p>
          </section>

          {/* SEÇÃO: DEVOLUÇÕES */}
          <section id="devolucao" className="scroll-mt-24 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-keroBlack mb-4 flex items-center gap-2">
              <RotateCcw className="text-keroOrange"/> Devoluções e Reembolsos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aceitamos devoluções em casos específicos para garantir a sua satisfação:
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>Prazo:</strong> Até 7 dias após a recepção do produto.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>Condição:</strong> Produto intacto, sem sinais de uso, na embalagem original.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span><strong>Exceções:</strong> Produtos de higiene pessoal (skincare, perfumes abertos) e eletrónicos danificados por mau uso NÃO são elegíveis para reembolso.</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              ⚠️ Para iniciar uma devolução, envie fotos/vídeos do problema para o nosso WhatsApp (+244 954 309 236).
            </div>
          </section>

          {/* SEÇÃO: PAGAMENTOS */}
          <section id="pagamentos" className="scroll-mt-24 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-keroBlack mb-4 flex items-center gap-2">
              <Banknote className="text-keroOrange"/> Métodos de Pagamento
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Oferecemos flexibilidade total para facilitar a sua compra:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { name: "Multicaixa Express", color: "bg-green-100 text-green-700 border-green-200" },
                 { name: "Unitel Money", color: "bg-red-100 text-red-700 border-red-200" },
                 { name: "PayPay Africa", color: "bg-blue-100 text-blue-700 border-blue-200" },
                 { name: "Dinheiro na Entrega", color: "bg-orange-100 text-orange-700 border-orange-200" }
               ].map((method, idx) => (
                 <div key={idx} className={`${method.color} p-4 rounded-lg text-center font-bold text-sm uppercase tracking-wide border shadow-sm`}>
                   {method.name}
                 </div>
               ))}
            </div>
          </section>

          {/* SEÇÃO: CONTATO */}
          <section id="contato" className="scroll-mt-24 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-keroBlack mb-4 flex items-center gap-2">
              <Mail className="text-keroOrange"/> Ainda precisa de ajuda?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Nossa equipa está disponível todos os dias das 08:00 às 20:00.
            </p>
            <a 
              href="https://wa.me/244954309236?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20uma%20d%C3%BAvida%20nas%20pol%C3%ADticas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg transform hover:scale-105"
            >
              Falar no WhatsApp Agora
            </a>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Policies;
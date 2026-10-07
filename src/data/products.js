export const categories = [
  "Todos", 
  "Eletrónicos", 
  "Moda Masculina", 
  "Moda Feminina", 
  "Casa & Cozinha", 
  "Saúde & Beleza", 
  "Automóvel", 
  "Desporto", 
  "Brinquedos"
];

export const products = [
  // ELETRÓNICOS
  { id: 1, name: "iPhone 14 Pro Max 256GB", price: 850000, oldPrice: 950000, category: "Eletrónicos", stock: 5, description: "O topo de gama da Apple. Câmera profissional, tela Super Retina XDR.", images: ["https://images.unsplash.com/photo-1678685888221-cda7d3efa0be?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1695048133002-ef8f4b736e2c?q=80&w=800&auto=format&fit=crop"] },
  { id: 2, name: "Samsung Galaxy S23 Ultra", price: 780000, oldPrice: 820000, category: "Eletrónicos", stock: 8, description: "Zoom óptico 10x e bateria de longa duração.", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop"] },
  { id: 3, name: "MacBook Air M2", price: 1200000, category: "Eletrónicos", stock: 3, description: "Leve, silencioso e potente para trabalho criativo.", images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"] },
  { id: 4, name: "Sony PlayStation 5 Slim", price: 450000, oldPrice: 500000, category: "Eletrónicos", stock: 10, description: "A nova geração de gaming chegou.", images: ["https://images.unsplash.com/photo-1606144058199-b5bd61c3df9a?q=80&w=800&auto=format&fit=crop"] },
  { id: 5, name: "AirPods Pro 2ª Geração", price: 180000, category: "Eletrónicos", stock: 25, description: "Cancelamento de ruído ativo líder em mercado.", images: ["https://images.unsplash.com/photo-1606760227090-3dd87af82098?q=80&w=800&auto=format&fit=crop"] },
  
  // MODA MASCULINA
  { id: 6, name: "Camisa Polo Ralph Lauren", price: 25000, oldPrice: 30000, category: "Moda Masculina", stock: 15, description: "Clássico elegante para eventos casuais.", images: ["https://images.unsplash.com/photo-1586790374378-4bc87135af59?q=80&w=800&auto=format&fit=crop"] },
  { id: 7, name: "Calça Jeans Levi's 501", price: 35000, category: "Moda Masculina", stock: 20, description: "O jeans original que nunca sai de moda.", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop"] },
  { id: 8, name: "Ténis Nike Air Jordan 1", price: 95000, oldPrice: 110000, category: "Moda Masculina", stock: 5, description: "Ícone do streetwear mundial.", images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop"] },
  { id: 9, name: "Relógio Citizen Eco-Drive", price: 65000, category: "Moda Masculina", stock: 12, description: "Movimento a luz, sem necessidade de baterias.", images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"] },

  // CASA & COZINHA
  { id: 10, name: "Liquidificador Oster Classic", price: 45000, oldPrice: 55000, category: "Casa & Cozinha", stock: 30, description: "Potência máxima para smoothies e sopas.", images: ["https://images.unsplash.com/photo-1570198064073-c262445726fc?q=80&w=800&auto=format&fit=crop"] },
  { id: 11, name: "Panela de Pressão Elétrica", price: 85000, category: "Casa & Cozinha", stock: 10, description: "Cozinhe feijão e carnes em minutos.", images: ["https://images.unsplash.com/photo-1585515320310-1ed121dbe6fb?q=80&w=800&auto=format&fit=crop"] },
  { id: 12, name: "Jogo de Cama King Size", price: 35000, oldPrice: 42000, category: "Casa & Cozinha", stock: 20, description: "Algodão egípcio 100% para conforto total.", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop"] },
  { id: 13, name: "Aspirador Vertical Dyson", price: 150000, category: "Casa & Cozinha", stock: 5, description: "Limpeza profunda sem fios.", images: ["https://images.unsplash.com/photo-1558317374-30eb66971475?q=80&w=800&auto=format&fit=crop"] },

  // SAÚDE & BELEZA
  { id: 14, name: "Perfume Dior Sauvage", price: 55000, oldPrice: 65000, category: "Saúde & Beleza", stock: 15, description: "Fragrância masculina fresca e intensa.", images: ["https://images.unsplash.com/photo-1523293188086-b154c1614f00?q=80&w=800&auto=format&fit=crop"] },
  { id: 15, name: "Kit Skincare La Roche-Posay", price: 40000, category: "Saúde & Beleza", stock: 25, description: "Cuidado dermatológico completo.", images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"] },
  { id: 16, name: "Secador de Cabelo Philips", price: 25000, oldPrice: 30000, category: "Saúde & Beleza", stock: 18, description: "Secagem rápida e proteção térmica.", images: ["https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop"] },

  // AUTOMÓVEL
  { id: 17, name: "Capacete Moto Integral LS2", price: 35000, category: "Automóvel", stock: 10, description: "Segurança certificada ECE 22.05.", images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"] },
  { id: 18, name: "Carregador Veicular Rápido", price: 8000, oldPrice: 10000, category: "Automóvel", stock: 50, description: "Dupla USB-C Power Delivery.", images: ["https://images.unsplash.com/photo-1620725308842-78034505c58c?q=80&w=800&auto=format&fit=crop"] },
  { id: 19, name: "Tapetes Universal Carro", price: 12000, category: "Automóvel", stock: 30, description: "Borracha resistente à água e lama.", images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop"] },

  // DESPORTO
  { id: 20, name: "Bicicleta Mountain Bike Caloi", price: 180000, oldPrice: 200000, category: "Desporto", stock: 4, description: "Quadro de alumínio leve e robusto.", images: ["https://images.unsplash.com/photo-1532298229144-0ecbf399ad27?q=80&w=800&auto=format&fit=crop"] },
  { id: 21, name: "Halteres Ajustáveis 20kg", price: 45000, category: "Desporto", stock: 12, description: "Treino doméstico eficiente.", images: ["https://images.unsplash.com/photo-1583454110551-21cb2ff3a1cc?q=80&w=800&auto=format&fit=crop"] },
  { id: 22, name: "Chuteira Adidas Predator", price: 35000, oldPrice: 40000, category: "Desporto", stock: 8, description: "Controle total na bola.", images: ["https://images.unsplash.com/photo-1511886933-a78863664448?q=80&w=800&auto=format&fit=crop"] },

  // BRINQUEDOS
  { id: 23, name: "Lego Technic Porsche", price: 120000, category: "Brinquedos", stock: 3, description: "Modelo de coleção para adultos.", images: ["https://images.unsplash.com/photo-1587654780291-39c04cf3e5ee?q=80&w=800&auto=format&fit=crop"] },
  { id: 24, name: "Boneca Barbie Dreamhouse", price: 85000, oldPrice: 95000, category: "Brinquedos", stock: 6, description: "A casa dos sonhos das crianças.", images: ["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop"] },
  { id: 25, name: "Drone DJI Mini SE", price: 250000, category: "Brinquedos", stock: 5, description: "Filmagens aéreas incríveis.", images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop"] },

  // EXTRAS PARA ENCHER A GRELHA
  { id: 26, name: "Smartwatch Apple Watch Series 9", price: 320000, oldPrice: 350000, category: "Eletrónicos", stock: 7, description: "Monitor de saúde avançado.", images: ["https://images.unsplash.com/photo-1546868871-e5d1d3f7f7f7?w=800&q=80"] },
  { id: 27, name: "Vestido Floral Verão", price: 18000, category: "Moda Feminina", stock: 22, description: "Tecido leve e fresco.", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"] },
  { id: 28, name: "Mochila Notebook Impermeável", price: 25000, oldPrice: 30000, category: "Moda Masculina", stock: 15, description: "Proteção total para o seu laptop.", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"] },
  { id: 29, name: "Microfone Condensador USB", price: 45000, category: "Eletrónicos", stock: 10, description: "Qualidade de estúdio para podcasts.", images: ["https://images.unsplash.com/photo-1590644365607-1c5a8a4d1b1b?w=800&q=80"] },
  { id: 30, name: "Cadeira Gamer Ergonómica", price: 95000, oldPrice: 110000, category: "Casa & Cozinha", stock: 4, description: "Conforto para longas horas de jogo/trabalho.", images: ["https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=800&q=80"] }
];
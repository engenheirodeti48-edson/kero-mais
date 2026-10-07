import { supabase } from '../lib/supabase';

export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.old_price,
      category: product.category,
      images: product.images || [],
      video: product.video,
      stock: product.stock,
      description: product.description || "Produto disponível na Kero Mais.",
      brand: product.brand || "Genérico",
      model: product.model || "N/A",
      weight: product.weight,
      warranty: product.warranty,
      // Conversão estrita para booleano
      isFeatured: product.is_featured === true, 
      viewsCount: product.views_count || 0,
      ordersCount: product.orders_count || 0
    }));
  } catch (error) {
    console.error("Erro ao carregar produtos do Supabase:", error);
    return [];
  }
};
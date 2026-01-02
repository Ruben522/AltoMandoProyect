import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('todos');

  // Llamada a la "Base de Datos" cuando cambian los filtros
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        // Aquí pedimos al backend los productos filtrados
        const data = await fetchProducts({ tipo: filtroTipo });
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [filtroTipo]);

  return (
    <div className="min-h-screen bg-surface"> {/* Usamos el color de fondo 'surface' */}
      
      {/* Cabecera Social */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Explorar Diseños</h1>
            <div className="flex gap-4 mt-4 text-sm font-medium text-gray-500 overflow-x-auto pb-2">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-full">Populares</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Nuevos</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Destacados</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Más valorados</button>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row gap-8">
        
        {/* Filtros Lateral (Estilo más sutil) */}
        <aside className="w-full md:w-56 flex-shrink-0">
            {/* ... lógica de filtros anterior pero con estilos más limpios ... */}
             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Categorías</h3>
                {/* Inputs de radio con accent-primary-600 */}
                {/* ... */}
             </div>
        </aside>

        {/* Grid de Modelos */}
        <div className="flex-1">
            {loading ? (
                // Skeleton Loader
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* ... skeleton code ... */}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productos.map((prod) => (
                        <ProductCard key={prod.id} producto={prod} />
                    ))}
                </div>
            )}
        </div>

      </main>
    </div>
  );
};

export default Productos;
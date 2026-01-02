import React, { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { PRODUCTOS } from '../data/productos';
import Modelo3D from '../components/Modelo3D';

const ProductoDetalle = () => {
  const { id } = useParams();
  const producto = PRODUCTOS.find(p => p.id === id);
  
  const [view3D, setView3D] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [activeTab, setActiveTab] = useState('detalles');

  // Datos simulados
  const stats = {
    likes: isLiked ? 342 : 341,
    downloads: 1205,
    views: 5400,
    creator: "JuanMaker",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`
  };

  if (!producto) return <div className="text-center py-20 text-xl">Modelo no encontrado</div>;

  return (
    <div className="min-h-screen bg-surface pb-20">
      
      {/* 1. Header Limpio (Solo Título y Autor) */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                {producto.nombre}
            </h1>
            <div className="flex items-center gap-3 text-gray-500 mt-1">
                <img src={stats.avatar} alt="autor" className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200" />
                <span className="text-base">
                    Diseñado por <span className="font-bold text-primary-600 cursor-pointer hover:underline">{stats.creator}</span>
                </span>
                {/* Eliminada la etiqueta de categoría/tipo */}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA (2/3): Visor y Pestañas */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Visor */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative aspect-video group">
            {view3D ? (
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} className="bg-gray-50">
                <Suspense fallback={null}>
                  <Stage intensity={0.5} environment="city">
                    <Modelo3D modelPath={producto.modelo} currentColor="#ffffff" />
                  </Stage>
                  <OrbitControls makeDefault />
                </Suspense>
              </Canvas>
            ) : (
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
            )}

            <div className="absolute bottom-4 right-4">
              <button 
                onClick={() => setView3D(!view3D)}
                className="bg-white/90 backdrop-blur text-gray-900 px-5 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2 border border-gray-200"
              >
                {view3D ? (
                  <>📷 Ver Fotos</>
                ) : (
                  <>
                    <div className="bg-primary-100 p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                    </div>
                    Ver en 3D
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Detalles y Comentarios */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex gap-8 border-b border-gray-100 mb-6 pb-px">
              <button 
                onClick={() => setActiveTab('detalles')}
                className={`pb-4 font-bold text-lg transition-all ${activeTab === 'detalles' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Detalles
              </button>
              <button 
                onClick={() => setActiveTab('comentarios')}
                className={`pb-4 font-bold text-lg transition-all ${activeTab === 'comentarios' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Comentarios <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs align-middle ml-1">3</span>
              </button>
            </div>

            {activeTab === 'detalles' ? (
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                <p className="text-lg">{producto.descripcion}</p>
                <div className="mt-8 bg-surface p-6 rounded-xl border border-gray-100">
                    <h3 className="text-gray-900 font-bold mb-2">Instrucciones del Creador</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Material recomendado: PLA o PETG</li>
                        <li>Relleno: 15-20%</li>
                        <li>Soportes: No requeridos para la base</li>
                    </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Coment${i}`} className="w-10 h-10 rounded-full bg-gray-100" alt="user" />
                    <div>
                      <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">Maker_{i}</h4>
                          <span className="text-xs text-gray-400">hace 2 días</span>
                      </div>
                      <p className="text-gray-600 mt-1">Gran diseño, encaja perfecto.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA (1/3): Acciones y Stats */}
        <aside className="space-y-6">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            
            {/* 🚀 BOTÓN DE DESCARGA (CTA PRINCIPAL) */}
            <button className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar Archivos
            </button>

            {/* BOTONES SOCIALES (SECUNDARIOS) */}
            <div className="grid grid-cols-3 gap-2 mb-8 border-b border-gray-100 pb-8">
                {/* Like */}
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isLiked ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs font-bold uppercase">Like</span>
                </button>

                {/* Guardar */}
                <button 
                    onClick={() => setIsFav(!isFav)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${isFav ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFav ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="text-xs font-bold uppercase">Guardar</span>
                </button>

                {/* Compartir */}
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-xs font-bold uppercase">Compartir</span>
                </button>
            </div>

            {/* Estadísticas */}
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Descargas totales</span>
                    <span className="font-mono font-bold text-gray-900">{stats.downloads}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Likes</span>
                    <span className="font-mono font-bold text-gray-900">{stats.likes}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Fecha publicación</span>
                    <span className="font-mono font-bold text-gray-900">12 Oct 2024</span>
                </div>
            </div>

          </div>

          {/* Más del creador */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Más de {stats.creator}</h4>
            <div className="grid grid-cols-2 gap-4">
               {/* Placeholders visuales */}
               <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform"></div>
               </div>
               <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform"></div>
               </div>
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
};

export default ProductoDetalle;
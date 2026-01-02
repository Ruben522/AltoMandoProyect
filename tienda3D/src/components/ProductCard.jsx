import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  const navigate = useNavigate();

  // Simulamos datos sociales si no existen en tu JSON aún
  const likes = Math.floor(Math.random() * 500) + 10;
  const creator = producto.creator || "MakerPro";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${producto.id}`; // Generador de avatares random

  return (
    <div 
      onClick={() => navigate(`/producto/${producto.id}`)}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* 1. Imagen Principal con Badge de Tipo */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Etiqueta flotante (Ej: Mando vs Genérico) */}
        <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-sm
                ${producto.tipo === 'mando' ? 'bg-primary-600' : 'bg-gray-800'}`}>
                {producto.tipo === 'mando' ? 'Mod' : 'Part'}
            </span>
        </div>

        {/* Icono Overlay al hacer hover (Indicador de "Ver 3D") */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
            <span className="bg-white text-primary-700 px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Inspeccionar
            </span>
        </div>
      </div>

      {/* 2. Información Social (Estilo Thingiverse) */}
      <div className="p-4 flex flex-col gap-3">
        
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {producto.nombre}
        </h3>

        {/* Autor */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <img src={avatarUrl} alt={creator} className="w-6 h-6 rounded-full bg-gray-200" />
            <span className="hover:underline hover:text-primary-600 truncate">by {creator}</span>
        </div>

        {/* Estadísticas (Footer de la tarjeta) */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-gray-400 text-sm">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 group/like hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{likes}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>{Math.floor(Math.random() * 20)}</span>
                </div>
            </div>
            
            {/* Botón de descarga discreto */}
            <button className="text-primary-600 hover:bg-primary-50 p-1.5 rounded-md transition-colors" title="Descargar">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
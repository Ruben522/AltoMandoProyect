import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PRODUCTOS } from '../data/productos';
import Modelo3D from '../components/Modelo3D';

const Inicio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view3D, setView3D] = useState(false);
  const navigate = useNavigate();

  // Función para avanzar
  const nextSlide = () => {
    setView3D(false); // Reseteamos vista al cambiar
    setCurrentIndex((prev) => (prev + 1) % PRODUCTOS.length);
  };

  // Función para retroceder
  const prevSlide = () => {
    setView3D(false);
    setCurrentIndex((prev) => (prev === 0 ? PRODUCTOS.length - 1 : prev - 1));
  };

  // Autoplay inteligente
  useEffect(() => {
    // Si estamos viendo el 3D, NO activamos el temporizador
    if (view3D) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PRODUCTOS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [view3D]); // Se re-ejecuta cuando view3D cambia

  const toggle3DView = (e) => {
    e.stopPropagation();
    setView3D((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="text-center px-6 pt-12 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6">Personalización 3D al Instante</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Diseña, visualiza y recibe tus piezas con acabados industriales.
        </p>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl bg-white h-[500px]">
          
          {/* --- FLECHAS DE NAVEGACIÓN --- */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/80 transition-all shadow-lg border border-white/50 text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/80 transition-all shadow-lg border border-white/50 text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* --- SLIDES --- */}
          {PRODUCTOS.map((prod, index) => (
            <div
              key={prod.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col md:flex-row
                ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
            >
              {/* Imagen / 3D */}
              <div className="relative w-full md:w-1/2 h-64 md:h-full bg-gray-50 flex-shrink-0">
                {view3D && index === currentIndex ? (
                   <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                      <color attach="background" args={['#f9fafb']} />
                      <Suspense fallback={null}>
                        <Modelo3D modelPath={prod.modelo} currentColor={"#ffffff"} />
                        <OrbitControls enableZoom={false} autoRotate={true} />
                      </Suspense>
                   </Canvas>
                ) : (
                  <img src={prod.imagen} alt={prod.nombre} className="w-full h-full object-cover" />
                )}

                <button 
                  onClick={toggle3DView}
                  className="absolute top-6 right-6 bg-white p-3 rounded-xl shadow-xl hover:scale-105 transition-transform z-20 text-indigo-600 border border-indigo-100"
                >
                  {view3D ? (
                    <span className="font-bold text-sm">Ver Foto</span>
                  ) : (
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-sm">3D</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Contenido */}
              <div className="p-12 md:w-1/2 flex flex-col justify-center bg-white">
                <div className="max-w-md">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold tracking-wider mb-4 border border-indigo-100">
                        NUEVA COLECCIÓN
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {prod.nombre}
                    </h2>
                    <p className="text-gray-500 text-lg mb-8 line-clamp-3 leading-relaxed">
                        {prod.descripcion}
                    </p>
                    <button 
                    onClick={() => navigate(`/producto/${prod.id}`)}
                    className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                    Personalizar Ahora &rarr;
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inicio;
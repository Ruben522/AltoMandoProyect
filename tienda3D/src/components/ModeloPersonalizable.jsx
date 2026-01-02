import React, { useState, Suspense } from 'react'; // Importamos Suspense
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import SelectorColores from './SelectorColores';
import Modelo3D from './Modelo3D';

export default function ModeloPersonalizable({ modelPath }) {
  const [color, setColor] = useState('#FFFFFF');

  const handleColorSelect = (newHexColor) => {
    setColor(newHexColor);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/4 p-4 bg-white border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">Personalización</h2>
        <SelectorColores currentColor={color} onColorSelect={handleColorSelect} />
      </div>

      <div className="w-full md:w-3/4 h-full bg-gray-100">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          {/* 💡 IMPORTANTE: Suspense evita el error de carga asíncrona */}
          <Suspense fallback={null}>
            <Modelo3D modelPath={modelPath} currentColor={color} />
            <Environment preset="city" />
            {/* Añadimos una sombra en el suelo para que sea más realista */}
            <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
          </Suspense>

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
}
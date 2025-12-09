import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * Componente que renderiza el modelo 3D y aplica el color.
 * @param {string} modelPath - La ruta al archivo GLTF/GLB del modelo.
 * @param {string} currentColor - El color actual en formato hexadecimal (ej: '#ff0000').
 */
function Modelo3D({ modelPath, currentColor }) {
  // Carga el modelo 3D (se asume que es un archivo GLTF/GLB)
  const gltf = useLoader(GLTFLoader, modelPath);
  
  // Clonamos el modelo para evitar modificar la geometría original de la caché.
  // Esto es opcional, pero buena práctica si el modelo se usa en varios lugares.
  const model = useMemo(() => gltf.scene.clone(), [gltf]);

  // Recorre todos los "hijos" del modelo (mallas) para aplicar el color.
  // Esto funciona bien para un modelo simple con un solo material.
  model.traverse((child) => {
    if (child.isMesh) {
      // Asegúrate de que tenga un material antes de intentar cambiar el color
      if (child.material) {
        // Establece el color. Three.js automáticamente maneja la conversión del string hexadecimal.
        child.material.color.set(currentColor);

        // Si tu modelo no tiene luces o necesitas un material más básico
        // puedes considerar usar un material simple:
        // child.material = new THREE.MeshStandardMaterial({ color: currentColor });
        // ¡Pero generalmente es mejor usar el material que viene con el modelo!
      }
    }
  });

  // El `<primitive>` renderiza un objeto de Three.js directamente.
  return <primitive object={model} scale={1} />;
}

/**
 * Componente principal que envuelve la escena y la UI de control.
 * @param {string} modelPath - La ruta al archivo GLTF/GLB del modelo.
 */
export default function ModeloPersonalizable({ modelPath }) {
  // Estado para guardar el color seleccionado por el usuario.
  const [color, setColor] = useState('#ffffff'); // Blanco por defecto

  // Función manejadora para el cambio de color del input.
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* 🎨 Panel de Control (UI) */}
      <div className="w-full md:w-1/4 p-4 bg-gray-100 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-4">Ajustar Pieza Genérica</h3>
        <label htmlFor="color-picker" className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona el Color:
        </label>
        <input
          type="color"
          id="color-picker"
          value={color}
          onChange={handleColorChange}
          className="h-16 w-16 p-1 rounded-full border-none cursor-pointer"
          title="Selector de Color"
        />
        <p className="mt-2 text-sm text-gray-500">Color Hex: **{color}**</p>
      </div>

      {/* 🌐 Visor 3D (Three.js Canvas) */}
      <div className="w-full md:w-3/4 h-full bg-gray-200">
        {/* El componente Canvas de react-three-fiber */}
        <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
          
          {/* Luz Ambiental (suave, ilumina todo) */}
          <ambientLight intensity={0.5} />
          {/* Luz Direccional (simula sol) */}
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* Entorno/Iluminación HDR (mejora mucho el aspecto) */}
          <Environment preset="city" />

          {/* El componente del modelo que usa el estado `color` */}
          <Modelo3D modelPath={modelPath} currentColor={color} />
          
          {/* Permite al usuario rotar y hacer zoom con el ratón */}
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>
    </div>
  );
}
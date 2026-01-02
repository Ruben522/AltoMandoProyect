import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Stage } from '@react-three/drei';

/**
 * Carga el modelo y lo envuelve en Stage para auto-ajuste de escala y luces.
 * Aplica el color seleccionado de forma reactiva.
 */
const Modelo3D = ({ modelPath, currentColor }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  
  const scene = useMemo(() => {
    const clone = gltf.scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(currentColor);
      }
    });
    return clone;
  }, [gltf, currentColor]);

  return (
    <Stage intensity={1} environment="city" shadows="contact" adjustCamera={1.5}>
      <primitive object={scene} />
    </Stage>
  );
};

export default Modelo3D;
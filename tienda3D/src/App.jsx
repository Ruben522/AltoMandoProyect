import { React, useState } from 'react'
import './App.css'
import ModeloPersonalizable from './components/ModeloPersonalizable';

function App() {
  // **IMPORTANTE**: Reemplaza 'ruta/a/tu/pieza_generica.glb' con la ruta real
  const modelPath = '/modelo.glb'; 

  return (
    <div className="App">
      <h1 className="text-3xl font-bold p-4 text-center">
        Tienda 3D - Pieza Genérica
      </h1>
      {/* Asumiendo que quieres que ocupe toda la altura de la ventana */}
      <div style={{ height: 'calc(100vh - 64px)' }}> 
        <ModeloPersonalizable modelPath={modelPath} />
      </div>
    </div>
  );
}

export default App

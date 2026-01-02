import React from 'react';
import { COLORES_DISPONIBLES } from '../data/ColoresDisponibles';

const SelectorColores = ({ selectedColor, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm max-w-fit mx-auto">
      {COLORES_DISPONIBLES.map((c) => (
        <button
          key={c.name}
          onClick={() => onSelect(c.hex)}
          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${
            selectedColor === c.hex ? 'border-gray-900 scale-110 ring-2 ring-gray-200' : 'border-transparent'
          }`}
          style={{ backgroundColor: c.displayHex }}
          title={c.name}
        />
      ))}
    </div>
  );
};

export default SelectorColores;
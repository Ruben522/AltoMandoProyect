// src/data/ColoresDisponibles.js

/**
 * @typedef {object} ColorOption
 * @property {string} name - Nombre descriptivo del color (ej: 'Blanco').
 * @property {string} hex - Código hexadecimal usado por Three.js (ej: '#FFFFFF').
 * @property {string} displayHex - Código hexadecimal para mostrar en la UI, si es diferente (ej: para 'Madera' podemos usar un marrón genérico).
 */

/**
 * Lista de colores disponibles para la personalización de piezas.
 * @type {ColorOption[]}
 */
const COLORES_DISPONIBLES = [
  { name: 'Blanco', hex: '#FFFFFF', displayHex: '#FFFFFF' },
  { name: 'Negro', hex: '#1C1C1C', displayHex: '#1C1C1C' },
  { name: 'Rojo', hex: '#FF3333', displayHex: '#FF3333' },
  { name: 'Gris', hex: '#A0A0A0', displayHex: '#A0A0A0' },
  { name: 'Transparente', hex: '#CCCCCC', displayHex: '#CCCCCC', isTransparent: true },
  { name: 'Azul', hex: '#3366FF', displayHex: '#3366FF' },
  { name: 'Verde', hex: '#33CC33', displayHex: '#33CC33' },
  { name: 'Madera', hex: '#7A5230', displayHex: '#7A5230' },
  { name: 'Cobre', hex: '#B87333', displayHex: '#B87333' },
];

export { COLORES_DISPONIBLES };
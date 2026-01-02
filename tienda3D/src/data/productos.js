/**
 * Fuente de datos de los productos de la tienda.
 * Incluye la ruta al modelo 3D y metadatos para el catálogo.
 */
const PRODUCTOS = [
  {
    id: "1",
    nombre: "Mando Genérico",
    descripcion: "Una pieza geométrica versátil ideal para soportes de escritorio.",
    precio: 15.99,
    imagen: "./imgs/StreetFigther-Arriba-Ryu.png",
    modelo: "/models/mi_pieza_generica.glb",
    tipo: "generico"
  },
  {
    id: "2",
    nombre: "Gromash",
    descripcion: "Mando ergonómico de alta precisión con múltiples zonas de color.",
    precio: 59.99,
    imagen: "/img/mando-pro.jpg",
    modelo: "/models/Gromash.glb",
    tipo: "mando"
  },
  {
    id: "3",
    nombre: "Mando Genérico",
    descripcion: "Una pieza geométrica versátil ideal para soportes de escritorio.",
    precio: 15.99,
    imagen: "./imgs/StreetFigther-Arriba-Ryu.png",
    modelo: "/models/mi_pieza_generica.glb",
    tipo: "generico"
  },
  {
    id: "4",
    nombre: "Gromash",
    descripcion: "Mando ergonómico de alta precisión con múltiples zonas de color.",
    precio: 59.99,
    imagen: "/img/mando-pro.jpg",
    modelo: "/models/Gromash.glb",
    tipo: "mando"
  }
];

export { PRODUCTOS };
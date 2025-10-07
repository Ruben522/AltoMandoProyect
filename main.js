import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Fondo animado con gradiente
const uniforms = {
  time: { value: 0.0 }
};

const skyGeo = new THREE.SphereGeometry(100, 32, 32);
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  uniforms: uniforms,
  vertexShader: `
    varying vec3 vUV;
    void main() {
      vUV = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec3 vUV;
    void main() {
      float y = normalize(vUV).y * 0.5 + 0.5;
      vec3 topColor = vec3(0.1, 0.3, 0.7);  // azul
      vec3 bottomColor = vec3(0.9, 0.7, 0.3); // naranja
      vec3 mixed = mix(bottomColor, topColor, y);
      mixed += 0.05 * sin(time + vUV.x * 5.0); // animación
      gl_FragColor = vec4(mixed, 1.0);
    }
  `
});
const sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Cargar el modelo
const loader = new GLTFLoader();
loader.load("./modelo.glb", (gltf) => {
  scene.add(gltf.scene);
}, undefined, (error) => {
  console.error("Error cargando el modelo:", error);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  uniforms.time.value += 0.01; // mueve el gradiente
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Ajustar si cambia el tamaño de la ventana
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

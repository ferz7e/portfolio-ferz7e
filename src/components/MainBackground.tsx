import { useRef, useEffect } from "react";
import * as THREE from "three";

// Componente principal que renderiza un fondo animado usando Three.js y shaders
export default function MainBackground() {
  // Referencia al div donde se montará el canvas de Three.js
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return; // Salimos si el div no está disponible

    const container = mountRef.current;

    // Obtenemos las dimensiones iniciales del contenedor
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    // Creamos la escena de Three.js
    const scene = new THREE.Scene();
    // Cámara ortográfica simple
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer de WebGL con transparencia y antialiasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Retina friendly
    container.appendChild(renderer.domElement); // Agregamos el canvas al div

    // --- VERTEX SHADER ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv; // Guardamos coordenadas UV para el fragment shader
        gl_Position = vec4(position, 1.0); // Posición de los vértices
      }
    `;

    // --- FRAGMENT SHADER ---
    const fragmentShader = `
      precision highp float;

      // Uniforms que controlan tiempo, resolución, interacción y ruido
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uSeed;
      uniform vec2 uMouse;
      uniform vec2 uClickPos;
      uniform float uClickTime;
      varying vec2 vUv;

      // Funciones de ruido
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ; m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        vec2 ratio = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 currentP = uv * ratio;

        // --- EFECTO ONDA (CLICK) ---
        float timeSinceClick = uTime - uClickTime;
        float waveInput = 0.0;
        if(timeSinceClick < 2.0) {
            float waveSpeed = 0.8;
            float distToClick = distance(currentP, uClickPos * ratio);
            // Crea un anillo que se expande
            float circle = abs(distToClick - timeSinceClick * waveSpeed);
            // El ripple se difumina con la distancia y el tiempo
            float ripple = smoothstep(0.15, 0.0, circle) * exp(-timeSinceClick * 1.5);
            waveInput = ripple * 0.12; 
        }

        // --- INTERACTIVIDAD MOUSE ---
        vec2 mouseP = uMouse * ratio;
        float distMouse = distance(currentP, mouseP);
        float mouseInertia = smoothstep(0.6, 0.0, distMouse);
        vec2 mouseOffset = normalize(currentP - mouseP + 0.001) * mouseInertia * 0.08;

        // --- LOOK MARMOLADO + ONDA ---
        vec2 p = (uv - 0.5) * ratio * 1.5 + uSeed + mouseOffset + waveInput;
        float d1 = snoise(p * 2.5 + uTime * 0.05);
        float d2 = snoise(p * 4.0 + d1 + uTime * 0.03);
        float n = snoise(p * 3.0 + d2 * 1.5);
        n = n * 0.5 + 0.5;

        float lines = sin(45.0 * n + uTime * 0.1);
        float edge = smoothstep(-0.2, 0.5, lines);
        float mask = (1.0 - edge) * 0.08; 

        vec3 colorBg = vec3(0.043, 0.043, 0.047);
        vec3 colorVein = vec3(0.93, 0.93, 0.93);
        vec3 finalColor = mix(colorBg, colorVein, n);
        gl_FragColor = vec4(finalColor, mask);
      }
    `;

    // Geometría del plano que cubre todo el viewport
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Vectores para el mouse y el click
    const mousePos = new THREE.Vector2(0.5, 0.5);
    const targetMousePos = new THREE.Vector2(0.5, 0.5);
    const clickPos = new THREE.Vector2(-10, -10); // Fuera de pantalla al inicio

    // Uniforms para el shader
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uSeed: { value: new THREE.Vector2(Math.random() * 100, Math.random() * 100) },
      uMouse: { value: mousePos },
      uClickPos: { value: clickPos },
      uClickTime: { value: -10.0 }, // Tiempo inicial lejano
    };

    // Material que usa nuestros shaders
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    // Mesh del plano
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- ANIMACIÓN ---
    let animationFrameId: number;
    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001; // Convertimos a segundos
      mousePos.lerp(targetMousePos, 0.04); // Suavizado del movimiento del mouse
      renderer.render(scene, camera); // Renderizamos la escena
      animationFrameId = requestAnimationFrame(animate); // Loop
    };
    animate(0);

    // --- EVENTOS ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMousePos.set((e.clientX - rect.left) / rect.width, 1.0 - (e.clientY - rect.top) / rect.height);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.uClickPos.value.set((e.clientX - rect.left) / rect.width, 1.0 - (e.clientY - rect.top) / rect.height);
      uniforms.uClickTime.value = uniforms.uTime.value;
    };

    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Div que contendrá el canvas de Three.js
  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none", // No bloquea interacciones
        overflow: "hidden",
        opacity: 0.5, // Transparencia del fondo
      }}
    />
  );
}

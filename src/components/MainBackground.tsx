import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function BeachParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- CONFIGURACIÓN INICIAL DEL ESCENARIO ---
    const container = mountRef.current;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    const scene = new THREE.Scene();
    // Cámara ortográfica para un renderizado 2D plano (ideal para fondos)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true, // Fondo transparente
      antialias: false, // Desactivado para ganar rendimiento con 1M de puntos
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- OPTIMIZACIÓN POR DISPOSITIVO ---
    // Ajuste de la densidad de partículas según el ancho de pantalla
    let count = 1000000;
    if (window.innerWidth <= 768) count = 500000;
    else if (window.innerWidth <= 1224) count = 750000;

    // --- CREACIÓN DE GEOMETRÍA DE PARTÍCULAS ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3); // x, y, z
    const uvs = new Float32Array(count * 2); // u, v para mapeo
    const particleType = new Float32Array(count); // 0 o 1 para variar colores/tamaños

    // Inicialización de datos de partículas con distribución aleatoria
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2.2 - 1.1;
      const y = Math.random() * 2.2 - 1.1;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;

      uvs[i * 2] = (x + 1.1) / 2.2;
      uvs[i * 2 + 1] = (y + 1.1) / 2.2;

      // Asigna un tipo (claro/oscuro) de forma aleatoria (30% probabilidad de tipo 1.0)
      particleType[i] = Math.random() > 0.7 ? 1.0 : 0.0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute("aType", new THREE.BufferAttribute(particleType, 1));

    // ================= VERTEX SHADER =================
    // Controla la posición y el tamaño de cada punto individualmente en la GPU
    const vertexShader = `
      precision highp float;
      varying vec2 vUv;
      varying float vBrightness;
      varying float vType;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uClickPos[5]; // Posiciones de los últimos 5 clics
      uniform float uClickTime[5];
      uniform vec2 uAutoPos[5];  // Posiciones de olas automáticas
      uniform float uAutoTime[5];
      attribute float aType;

      // Funciones matemáticas para generar ruido Simplex (Simulated Noise)
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
        vUv = uv;
        vType = aType;
        vec3 pos = position;
        float ratio = uResolution.x / uResolution.y;
        vec2 aspectUv = (uv - 0.5) * vec2(ratio, 1.0);

        // Movimiento orgánico constante usando ruido
        float n = snoise(aspectUv * 0.8 + uTime * 0.05);
        pos.x += n * 0.04;
        pos.y += snoise(aspectUv * 1.2 - uTime * 0.03) * 0.04;

        vBrightness = 0.0;
        float waveBoost = 1.2;

        // Lógica de distorsión y brillo por Clics
        for(int i = 0; i < 5; i++) {
          float tClick = max(uTime - uClickTime[i], 0.0);
          if(tClick > 0.0 && tClick < 3.0) {
            float fadeClick = smoothstep(2.5, 0.0, tClick);
            vec2 aClick = (uClickPos[i] - 0.5) * vec2(ratio, 1.0);
            float dClick = distance(aspectUv, aClick);
            float waveRadius = tClick * 0.7; // La onda se expande con el tiempo
            // Crea un anillo de impacto
            float ring = exp(-pow((dClick - waveRadius) / 0.15, 2.0));
            vBrightness += ring * fadeClick * waveBoost * 0.35;
            // Desplaza las partículas hacia afuera del centro del clic
            pos.xy += normalize(aspectUv - aClick + 0.0001) * ring * fadeClick * 0.012;
          }
        }

        // Lógica de Olas Automáticas Multidireccionales
        for(int i = 0; i < 5; i++) {
          float tAuto = max(uTime - uAutoTime[i], 0.0);
          float fadeAuto = smoothstep(5.0, 3.8, tAuto);
          vec2 aAuto = (uAutoPos[i] - 0.5) * vec2(ratio, 1.0);
          float dAuto = distance(aspectUv, aAuto);
          float impactAuto = exp(-pow((dAuto - tAuto * 0.6) / 0.35, 2.0));
          float pushAuto = exp(-pow((dAuto - tAuto * 0.6) / 0.25, 2.0));
          vBrightness += impactAuto * fadeAuto * waveBoost * 0.7;
          pos.xy += normalize(aspectUv - aAuto + 0.0001) * pushAuto * fadeAuto * 0.02;
        }

        gl_Position = vec4(pos, 1.0);
        
        // Variación de tamaño individual basada en ruido y brillo de onda
        float sizeNoise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        float typeSize = aType > 0.5 ? 0.7 : 1.0;

        gl_PointSize = (0.7 + sizeNoise * 1.5 + (vBrightness * 0.8))
          * (uResolution.y / 900.0)
          * typeSize;
      }
    `;

    // ================= FRAGMENT SHADER =================
    // Controla el color y la transparencia de cada pixel/punto
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      varying float vBrightness;
      varying float vType;

      void main() {
        // Convierte el cuadrado del punto en un círculo
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;

        // Nuevos colores basados en tu paleta: #e6e7e8
        vec3 primaryColor = vec3(0.902, 0.906, 0.910); 
        vec3 secondaryColor = vec3(0.902, 0.906, 0.910); 
        
        vec3 finalColor = mix(primaryColor, secondaryColor, vType);
        
        // Añade brillo cuando pasa una onda
        finalColor += vBrightness * 0.35;

        // DIFUMINADO DE BORDES: Viñeteado suave
        float edgeX = smoothstep(0.0, 0.4, vUv.x) * smoothstep(1.0, 0.6, vUv.x);
        float edgeY = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
        float visibility = edgeX * edgeY;
        
        // Aplicamos el alpha de 0.6 para el color secundario (vType > 0.5)
        float typeAlpha = vType > 0.5 ? 0.6 : 1.0;
        
        float alpha = (1.0 - smoothstep(0.0, 0.5, r)) // Suaviza el círculo
          * (0.15 + vBrightness * 0.85) // Más opaco si hay brillo
          * visibility
          * typeAlpha;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // --- UNIFORMS (Variables enviadas a la GPU) ---
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uClickPos: { value: Array.from({ length: 5 }, () => new THREE.Vector2(-10, -10)) },
      uClickTime: { value: new Float32Array(5).fill(-10.0) },
      uAutoPos: { value: Array.from({ length: 5 }, () => new THREE.Vector2(-10, -10)) },
      uAutoTime: { value: new Float32Array(5).fill(-10.0) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending, // Suma colores para efectos de luz
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- LOOP DE ANIMACIÓN ---
    let animationFrameId: number;
    let clickIdx = 0;
    let autoIdx = 0;

    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001; // Segundos
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    // --- EVENTOS Y DISPARADORES ---

    // Genera una ola desde uno de los 4 bordes de la pantalla
    const triggerAutoWave = () => {
      let x, y;
      const side = Math.floor(Math.random() * 4);
      const offset = 0.3;

      switch (side) {
        case 0:
          x = -offset;
          y = Math.random();
          break;
        case 1:
          x = 1.0 + offset;
          y = Math.random();
          break;
        case 2:
          x = Math.random();
          y = 1.0 + offset;
          break;
        case 3:
          x = Math.random();
          y = -offset;
          break;
        default:
          x = -offset;
          y = 0.5;
      }

      uniforms.uAutoPos.value[autoIdx].set(x, y);
      uniforms.uAutoTime.value[autoIdx] = uniforms.uTime.value;
      autoIdx = (autoIdx + 1) % 5; // Buffer circular de 5 olas
    };

    const autoWaveInterval = setInterval(triggerAutoWave, 4000);

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalización de coordenadas (0 a 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uClickPos.value[clickIdx].set(x, y);
      uniforms.uClickTime.value[clickIdx] = uniforms.uTime.value;
      clickIdx = (clickIdx + 1) % 5;
    };

    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleClick);

    // --- LIMPIEZA DE MEMORIA ---
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClick);
      clearInterval(autoWaveInterval);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="mainBackground" />;
}

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function BeachParticleBackground() {
  // Referencia al div que contendrá el canvas de Three.js
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si el ref todavía no está montado, salimos
    if (!mountRef.current) return;

    const container = mountRef.current;

    // Dimensiones del contenedor (fallback a ventana)
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    // Escena principal
    const scene = new THREE.Scene();

    // Cámara ortográfica (sin perspectiva)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer WebGL optimizado
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // fondo transparente
      antialias: false, // sin suavizado para mejorar rendimiento
      powerPreference: "high-performance", // prioriza GPU
    });

    renderer.setSize(width, height);

    // Limita pixel ratio para no sobrecargar en pantallas retina
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Inserta el canvas en el DOM
    container.appendChild(renderer.domElement);

    // Cantidad inicial de partículas
    let count = 1000000;

    // Ajuste responsivo según ancho de pantalla
    if (window.innerWidth <= 768) {
      count = 500000;
    } else if (window.innerWidth <= 1224) {
      count = 750000;
    }

    const geometry = new THREE.BufferGeometry();

    // Arrays tipados para atributos de partículas
    const positions = new Float32Array(count * 3); // x, y, z
    const uvs = new Float32Array(count * 2); // coordenadas UV
    const particleType = new Float32Array(count); // tipo visual

    // Generación inicial de partículas
    for (let i = 0; i < count; i++) {
      // Distribución sesgada en X (más densidad hacia un lado)
      const distributionX = Math.pow(Math.random(), 2.5);
      const x = distributionX * 2.2 - 1.1;
      const y = Math.random() * 2.2 - 1.1;

      // Posición
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;

      // Conversión a espacio UV (0–1)
      uvs[i * 2] = (x + 1.1) / 2.2;
      uvs[i * 2 + 1] = (y + 1.1) / 2.2;

      // 30% aprox serán tipo 1
      particleType[i] = Math.random() > 0.7 ? 1.0 : 0.0;
    }

    // Se registran atributos en la geometría
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute("aType", new THREE.BufferAttribute(particleType, 1));

    // ================= VERTEX SHADER =================
    const vertexShader = `
      precision highp float;

      // Valores enviados al fragment shader
      varying vec2 vUv;
      varying float vBrightness;
      varying float vType;

      // Uniforms dinámicos
      uniform float uTime;
      uniform vec2 uResolution;

      // Datos de clicks
      uniform vec2 uClickPos[5];
      uniform float uClickTime[5];

      // Datos de olas automáticas
      uniform vec2 uAutoPos[5];
      uniform float uAutoTime[5];

      // Atributo personalizado por partícula
      attribute float aType;

      // Funciones auxiliares para simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      // Generador de ruido procedural
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
        // Pasamos datos al fragment shader
        vUv = uv;
        vType = aType;

        vec3 pos = position;

        // Corrección de aspecto
        float ratio = uResolution.x / uResolution.y;
        vec2 aspectUv = (uv - 0.5) * vec2(ratio, 1.0);

        // Movimiento base orgánico
        float n = snoise(aspectUv * 0.8 + uTime * 0.05);
        pos.x += n * 0.04;
        pos.y += snoise(aspectUv * 1.2 - uTime * 0.03) * 0.04;

        vBrightness = 0.0;

        // Intensidad progresiva hacia la derecha
        float waveBoost = 0.5 + uv.x * 1.5;

        // --- EFECTO DE CLICK (MÁS SUTIL) ---
        for(int i = 0; i < 5; i++) {
          float tClick = max(uTime - uClickTime[i], 0.0);
          if(tClick > 0.0 && tClick < 3.0) {
            float fadeClick = smoothstep(2.5, 0.0, tClick);
            vec2 aClick = (uClickPos[i] - 0.5) * vec2(ratio, 1.0);
            float dClick = distance(aspectUv, aClick);
            
            float speed = 0.7;
            float waveRadius = tClick * speed;
            
            float ring = exp(-pow((dClick - waveRadius) / 0.15, 2.0));
            
            vBrightness += ring * fadeClick * waveBoost * 0.35;
            pos.xy += normalize(aspectUv - aClick + 0.0001) * ring * fadeClick * 0.012;
          }
        }

        // --- OLA AUTOMÁTICA (MÁS SUTIL) ---
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

        float sizeNoise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        float sizeFactor = smoothstep(0.9, 0.1, uv.x); 
        
        float typeSize = aType > 0.5 ? 0.7 : 1.0;

        gl_PointSize = (0.7 + sizeNoise * 1.5 + (vBrightness * 0.8))
          * (uResolution.y / 900.0)
          * sizeFactor
          * typeSize;
      }
    `;

    // ================= FRAGMENT SHADER =================
    const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  varying float vBrightness;
  varying float vType;

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;

    // Colores de la paleta
    vec3 primaryColor = vec3(0.8863, 0.9098, 0.9412);   // #e2e8f0
    vec3 secondaryColor = vec3(0.5804, 0.6392, 0.7216); // #94a3b8

    // Mezcla según el tipo
    vec3 finalColor = mix(primaryColor, secondaryColor, vType);

    // Ajuste de brillo
    finalColor += vBrightness * 0.35 * (1.0 - vType * 0.5);

    // Control de visibilidad y alpha
    float visibility = 1.0 - smoothstep(0.1, 0.9, vUv.x);
    float typeAlpha = vType > 0.5 ? 0.6 : 1.0;

    float alpha = (1.0 - smoothstep(0.0, 0.5, r))
      * (0.15 + vBrightness * 0.85)
      * visibility
      * typeAlpha;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

    // Uniforms compartidos entre JS y shaders
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uClickPos: { value: Array.from({ length: 5 }, () => new THREE.Vector2(-10, -10)) },
      uClickTime: { value: new Float32Array(5).fill(-10.0) },
      uAutoPos: { value: Array.from({ length: 5 }, () => new THREE.Vector2(-10, -10)) },
      uAutoTime: { value: new Float32Array(5).fill(-10.0) },
    };

    // Material con blending aditivo (efecto luminoso)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationFrameId: number;
    let clickIdx = 0;
    let autoIdx = 0;

    // Loop principal de render
    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    // Genera ola automática cada 4 segundos
    const triggerAutoWave = () => {
      const x = -0.3;
      const y = Math.random();
      uniforms.uAutoPos.value[autoIdx].set(x, y);
      uniforms.uAutoTime.value[autoIdx] = uniforms.uTime.value;
      autoIdx = (autoIdx + 1) % 5;
    };

    const autoWaveInterval = setInterval(triggerAutoWave, 8000);

    // Maneja clicks del usuario
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uClickPos.value[clickIdx].set(x, y);
      uniforms.uClickTime.value[clickIdx] = uniforms.uTime.value;
      clickIdx = (clickIdx + 1) % 5;
    };

    // Ajusta tamaño en resize
    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleClick);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClick);
      clearInterval(autoWaveInterval);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Contenedor del fondo
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
        pointerEvents: "none",
        overflow: "hidden",
        background: "transparent",
        opacity: "0.7",
        borderRadius: "20px",
      }}
    />
  );
}

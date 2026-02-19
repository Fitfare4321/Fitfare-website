import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NetworkProps {
  isDark: boolean;
}

function GlobeWireframe({ isDark }: NetworkProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  const mainColor = isDark ? "#1e40af" : "#60a5fa";
  const accentColor = isDark ? "#6d28d9" : "#a78bfa";

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x += delta * 0.03;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.12;
      innerRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Main sphere wireframe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[3.2, 2]} />
        <meshBasicMaterial
          color={mainColor}
          wireframe
          transparent
          opacity={isDark ? 0.12 : 0.18}
        />
      </mesh>

      {/* Inner rotating icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={isDark ? 0.08 : 0.12}
        />
      </mesh>

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color={mainColor}
          transparent
          opacity={isDark ? 0.08 : 0.15}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({
  radius,
  count,
  speed,
  size,
  color,
  opacity,
  tilt,
}: {
  radius: number;
  count: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  tilt: [number, number, number];
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count, radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color={color}
          size={size}
          transparent
          opacity={opacity}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function FloatingParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={isDark ? "#60a5fa" : "#3b82f6"}
        size={0.04}
        transparent
        opacity={isDark ? 0.3 : 0.5}
        sizeAttenuation
      />
    </points>
  );
}

function TrackLane({
  rx,
  rz,
  thickness,
  color,
  tilt = [0, 0, 0],
  speed = 0.06,
}: {
  rx: number;
  rz: number;
  thickness: number;
  color: string;
  tilt?: [number, number, number];
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const segments = mobile ? 160 : 280;
  const radial = 8;
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * rx, 0, Math.sin(t) * rz));
    }
    return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
  }, [rx, rz]);
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, segments, thickness, radial, true),
    [curve, segments, thickness]
  );
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed * 0.4;
    }
  });
  return (
    <mesh ref={meshRef} rotation={tilt} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

type Uniform = { value: unknown };

function EnergyRibbon({
  radius,
  thickness,
  tilt,
  colorA,
  colorB,
  amplitude = 0.12,
}: {
  radius: number;
  thickness: number;
  tilt: [number, number, number];
  colorA: string;
  colorB: string;
  amplitude?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const segments = mobile ? 120 : 220;
  const radial = mobile ? 6 : 10;

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 64;
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
    }
    return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, segments, thickness, radial, true);
  }, [curve, segments, thickness, radial]);

  const uniforms: Record<string, Uniform> = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: amplitude },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [amplitude, colorA, colorB]
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      const t = (materialRef.current.uniforms as any).uTime;
      t.value = (t.value || 0) + delta;
    }
  });

  const vertex = `
    uniform float uTime;
    uniform float uAmplitude;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position + normal * (sin(uTime*0.8 + uv.x*18.0) * uAmplitude);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  const fragment = `
    precision mediump float;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    void main() {
      vec3 col = mix(uColorA, uColorB, vUv.x);
      float alpha = 0.35;
      gl_FragColor = vec4(col, alpha);
    }
  `;

  return (
    <mesh rotation={tilt} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms as any}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function GridWave({ isDark }: { isDark: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const wSeg = mobile ? 28 : 56;
  const hSeg = mobile ? 20 : 36;
  const geo = useMemo(() => new THREE.PlaneGeometry(24, 14, wSeg, hSeg), [wSeg, hSeg]);
  const uniforms: Record<string, Uniform> = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: mobile ? 0.05 : 0.08 },
      uCol: { value: new THREE.Color(isDark ? "#1e40af" : "#60a5fa") },
    }),
    [isDark, mobile]
  );
  useFrame((_, delta) => {
    if (matRef.current) {
      const t = (matRef.current.uniforms as any).uTime;
      t.value = (t.value || 0) + delta;
    }
  });
  const vtx = `
    uniform float uTime;
    uniform float uAmp;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x*0.6 + uTime*0.6) * uAmp + cos(pos.y*0.8 + uTime*0.4) * uAmp * 0.6;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  const frag = `
    precision mediump float;
    uniform vec3 uCol;
    varying vec2 vUv;
    void main() {
      float fade = smoothstep(1.0, 0.2, vUv.y);
      gl_FragColor = vec4(uCol, 0.12 * fade);
    }
  `;
  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3.5, 0]} geometry={geo}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms as any}
        vertexShader={vtx}
        fragmentShader={frag}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function BackgroundScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const pausedRef = useRef(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.x = x;
      pointer.current.y = y;
    };
    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    const onVis = () => {
      pausedRef.current = document.hidden;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  useFrame((_, delta) => {
    if (!groupRef.current || pausedRef.current) return;
    const gx = THREE.MathUtils.lerp(groupRef.current.rotation.x, scrollRef.current * 0.25 + pointer.current.y * 0.08, 0.05);
    const gy = groupRef.current.rotation.y + delta * 0.05 + pointer.current.x * 0.02;
    groupRef.current.rotation.x = gx;
    groupRef.current.rotation.y = gy;
  });
  const mainColor = isDark ? "#1e40af" : "#60a5fa";
  const accentColor = isDark ? "#7c3aed" : "#a78bfa";
  const tertiaryColor = isDark ? "#059669" : "#34d399";
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <group ref={groupRef}>
      <TrackLane rx={5.4} rz={3.2} thickness={0.05} color={mainColor} tilt={[0.18, 0, 0]} />
      <TrackLane rx={4.6} rz={2.8} thickness={0.05} color={accentColor} tilt={[0.18, 0.2, 0]} />
      <TrackLane rx={3.8} rz={2.2} thickness={0.05} color={tertiaryColor} tilt={[0.18, -0.15, 0]} />
      <EnergyRibbon
        radius={4.2}
        thickness={0.07}
        tilt={[0.2, 0.15, 0]}
        colorA={isDark ? "#06b6d4" : "#60a5fa"}
        colorB={isDark ? "#3b82f6" : "#93c5fd"}
        amplitude={mobile ? 0.08 : 0.12}
      />
      <EnergyRibbon
        radius={3.0}
        thickness={0.06}
        tilt={[0.2, -0.1, 0.1]}
        colorA={isDark ? "#10b981" : "#34d399"}
        colorB={isDark ? "#22c55e" : "#86efac"}
        amplitude={mobile ? 0.06 : 0.1}
      />
      <GridWave isDark={isDark} />
      {!mobile && <FloatingParticles isDark={isDark} />}
    </group>
  );
}

export default function NetworkBackground3D({ isDark }: { isDark: boolean }) {
  const [webgl, setWebgl] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const ok = !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
      setWebgl(ok);
    } catch {
      setWebgl(false);
    }
  }, []);
  if (!webgl) {
    const bg = isDark
      ? "radial-gradient(circle at 0% 0%, rgba(37,99,235,0.12) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.16) 0, transparent 55%), linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)"
      : "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.18) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(147,197,253,0.22) 0, transparent 55%), linear-gradient(to right, rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)";
    return <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, backgroundImage: bg, backgroundSize: "120% 120%, 120% 120%, 80px 80px, 80px 80px" }} />;
  }
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const dprRange: [number, number] = mobile ? [1, 1.25] : [1, 1.5];
  const mainColor = isDark ? "#1e40af" : "#60a5fa";
  const accentColor = isDark ? "#7c3aed" : "#a78bfa";
  const tertiaryColor = isDark ? "#059669" : "#34d399";

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={dprRange}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <BackgroundScene isDark={isDark} />
      </Canvas>
    </div>
  );
}

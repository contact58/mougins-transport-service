import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Road() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 2;
    }
  });

  return (
    <mesh ref={ref} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60, 30, 30]} />
      <meshStandardMaterial color="#0c1015" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.8, 3]} />
        <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.3} emissive="#0ea5e9" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

function MovingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 30;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#0ea5e9" size={0.05} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

const Scene3D = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 2, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#0ea5e9" />
      <pointLight position={[-5, 3, -5]} intensity={0.4} color="#38bdf8" />
      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
      <GlowingSphere />
      <Road />
      <MovingParticles />
    </Canvas>
  </div>
);

export default Scene3D;

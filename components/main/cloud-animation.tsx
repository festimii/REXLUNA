"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

export const CloudAnimation = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <RotatingSphere />
      </Suspense>
    </Canvas>
  </div>
);

const RotatingSphere = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#61dafb" />
    </mesh>
  );
};

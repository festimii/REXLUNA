"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export const ContactAnimation = () => (
  <div className="absolute inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <RotatingKnot />
    </Canvas>
  </div>
);

const RotatingKnot = () => {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t / 2;
      ref.current.rotation.y = t / 2;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#915EFF" />
    </mesh>
  );
};

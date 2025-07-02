"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface ContactAnimationProps {
  text?: string;
}

export const ContactAnimation = ({ text }: ContactAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const morphRef = useRef<(t: string) => void>();
  const initialText = useRef(text);
  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;

    const count = 12000;
    let currentState: "sphere" | "text" = "sphere";

    if (!containerRef.current) return;
    const container = containerRef.current;

    function createParticles() {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const sphericalDistribution = (i: number) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        return {
          x: 8 * Math.cos(theta) * Math.sin(phi),
          y: 8 * Math.sin(theta) * Math.sin(phi),
          z: 8 * Math.cos(phi),
        };
      };

      for (let i = 0; i < count; i++) {
        const point = sphericalDistribution(i);

        positions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

        const color = new THREE.Color();
        const depth = Math.sqrt(
          point.x * point.x +
            point.y * point.y +
            point.z * point.z
        ) / 8;
        color.setHSL(0.5 + depth * 0.2, 0.7, 0.4 + depth * 0.3);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geometry, material);
      particles.rotation.set(0, 0, 0);
      scene.add(particles);
    }

    function createTextPoints(text: string) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const fontSize = 100;
      const padding = 20;

      ctx.font = `bold ${fontSize}px Arial`;
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;

      canvas.width = textWidth + padding * 2;
      canvas.height = textHeight + padding * 2;

      ctx.fillStyle = "white";
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const points: { x: number; y: number }[] = [];
      const threshold = 128;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > threshold) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);
          if (Math.random() < 0.3) {
            points.push({
              x: (x - canvas.width / 2) / (fontSize / 10),
              y: -(y - canvas.height / 2) / (fontSize / 10),
            });
          }
        }
      }
      return points;
    }

    function morphToText(text: string) {
      currentState = "text";
      const textPoints = createTextPoints(text);
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const targetPositions = new Float32Array(count * 3);

      gsap.to(particles.rotation, { x: 0, y: 0, z: 0, duration: 0.5 });

      for (let i = 0; i < count; i++) {
        if (i < textPoints.length) {
          targetPositions[i * 3] = textPoints[i].x;
          targetPositions[i * 3 + 1] = textPoints[i].y;
          targetPositions[i * 3 + 2] = 0;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 20 + 10;
          targetPositions[i * 3] = Math.cos(angle) * radius;
          targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
          targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }

      for (let i = 0; i < positions.length; i += 3) {
        gsap.to(positions, {
          [i]: targetPositions[i],
          [i + 1]: targetPositions[i + 1],
          [i + 2]: targetPositions[i + 2],
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            particles.geometry.attributes.position.needsUpdate = true;
          },
        });
      }

      setTimeout(() => morphToCircle(), 4000);
    }

    morphRef.current = morphToText;

    function morphToCircle() {
      currentState = "sphere";
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const targetPositions = new Float32Array(count * 3);
      const colors = particles.geometry.attributes.color.array as Float32Array;

      const sphericalDistribution = (i: number) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        return {
          x: 8 * Math.cos(theta) * Math.sin(phi),
          y: 8 * Math.sin(theta) * Math.sin(phi),
          z: 8 * Math.cos(phi),
        };
      };

      for (let i = 0; i < count; i++) {
        const point = sphericalDistribution(i);
        targetPositions[i * 3] = point.x + (Math.random() - 0.5) * 0.5;
        targetPositions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.5;
        targetPositions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.5;

        const depth = Math.sqrt(
          point.x * point.x +
            point.y * point.y +
            point.z * point.z
        ) / 8;
        const color = new THREE.Color();
        color.setHSL(0.5 + depth * 0.2, 0.7, 0.4 + depth * 0.3);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      for (let i = 0; i < positions.length; i += 3) {
        gsap.to(positions, {
          [i]: targetPositions[i],
          [i + 1]: targetPositions[i + 1],
          [i + 2]: targetPositions[i + 2],
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            particles.geometry.attributes.position.needsUpdate = true;
          },
        });
      }

      for (let i = 0; i < colors.length; i += 3) {
        gsap.to(colors, {
          [i]: colors[i],
          [i + 1]: colors[i + 1],
          [i + 2]: colors[i + 2],
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            particles.geometry.attributes.color.needsUpdate = true;
          },
        });
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      if (currentState === "sphere") {
        particles.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000);
    container.appendChild(renderer.domElement);
    camera.position.z = 25;

    createParticles();
    animate();
    if (initialText.current) morphToText(initialText.current);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const input = inputRef.current;
    const button = buttonRef.current;

    const handleClick = () => {
      const text = input?.value.trim();
      if (text) morphToText(text);
    };
    button?.addEventListener("click", handleClick);
    const handleKeypress = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleClick();
    };
    input?.addEventListener("keypress", handleKeypress);

    return () => {
      window.removeEventListener("resize", handleResize);
      button?.removeEventListener("click", handleClick);
      input?.removeEventListener("keypress", handleKeypress);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (text && morphRef.current) {
      morphRef.current(text);
    }
  }, [text]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        <input
          ref={inputRef}
          id="morphText"
          type="text"
          placeholder="Type text..."
          className="rounded-md bg-black/50 px-2 py-1 text-white outline-none"
        />
        <button
          ref={buttonRef}
          id="typeBtn"
          className="rounded-md bg-purple-600 px-3 py-1 text-white"
        >
          Morph
        </button>
      </div>
    </div>
  );
};


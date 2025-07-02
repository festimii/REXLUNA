"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface ContactAnimationProps {
  text?: string;
}

export const ContactAnimation = ({ text }: ContactAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<(t: string) => void>();
  const initialText = useRef(text);
  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
    let line: THREE.Line | null = null;

    const count = 20000;

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
        const depth =
          Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) /
          8;
        color.setHSL(0.5 + depth * 0.2, 0.7, 0.4 + depth * 0.3);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.07,
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

    function clearLine() {
      if (line) {
        scene.remove(line);
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
        line = null;
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (!particles) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const mousePos = camera.position
        .clone()
        .add(dir.multiplyScalar(distance));

      if (mousePos.length() > 12) {
        clearLine();
        return;
      }
      const positions = particles.geometry.attributes.position
        .array as Float32Array;
      const candidates: { idx: number; d: number }[] = [];
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const px = positions[idx];
        const py = positions[idx + 1];
        const pz = positions[idx + 2];
        const d = Math.hypot(px - mousePos.x, py - mousePos.y, pz - mousePos.z);
        // Record the distance for every particle so the closest
        // one can be chosen even when the pointer is far away.
        candidates.push({ idx, d });
      }
      candidates.sort((a, b) => a.d - b.d);
      clearLine();
      if (!candidates.length) return;
      const idx = candidates[0].idx;
      const start = new THREE.Vector3(
        positions[idx],
        positions[idx + 1],
        positions[idx + 2]
      );
      const end = mousePos.clone();
      const mid = start.clone().lerp(end, 0.5);
      mid.y += 2;
      const ctrl1 = start
        .clone()
        .lerp(mid, 0.5)
        .add(new THREE.Vector3(0, 1, 0));
      const ctrl2 = end.clone().lerp(mid, 0.5).add(new THREE.Vector3(0, 1, 0));
      const curve = new THREE.CubicBezierCurve3(start, ctrl1, ctrl2, end);
      const pts = curve.getPoints(20);
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: "white",
        transparent: true,
        opacity: 0.8,
        linewidth: 3,
      });
      line = new THREE.Line(geom, mat);
      // Create a subtle pulsing effect by animating the opacity
      gsap.fromTo(
        mat,
        { opacity: 0.4 },
        { opacity: 0.8, repeat: -1, yoyo: true, duration: 0.8 }
      );
      scene.add(line);
    }

    function createTextPoints(text: string) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const fontSize = 100;
      const padding = 40;

      ctx.font = `bold ${fontSize}px Arial`;
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;

      if (canvas.width > 4096) canvas.width = 4096;

      canvas.width = Math.ceil(textWidth + padding * 2);
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
      // Scale down points if the rendered text is too wide
      const scaleFactor = Math.min(1, 1000 / textWidth);
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > threshold) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);
          if (Math.random() < 0.3) {
            points.push({
              x: ((x - canvas.width / 2) / (fontSize / 6)) * scaleFactor,
              y: (-(y - canvas.height / 2) / (fontSize / 6)) * scaleFactor,
            });
          }
        }
      }
      return points;
    }

    function morphToText(text: string) {
      currentState = "text";
      const textPoints = createTextPoints(text);
      const positions = particles.geometry.attributes.position
        .array as Float32Array;
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
      const positions = particles.geometry.attributes.position
        .array as Float32Array;
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

        const depth =
          Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z) /
          8;
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
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

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
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      clearLine();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (text && morphRef.current) {
      morphRef.current(text);
    }
  }, [text]);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

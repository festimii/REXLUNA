"use client";

import { useEffect, useRef } from "react";

export const SupernovaPointer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lines = Array.from({ length: 40 }, (_, i) => ({ angle: (i / 40) * Math.PI * 2 }));
    const radius = 120;

    const handleMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    let animationFrame: number;
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 4;

      lines.forEach((line) => {
        line.angle += 0.02;
        const endX = pointer.x + Math.cos(line.angle) * radius;
        const endY = pointer.y + Math.sin(line.angle) * radius;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" />;
};

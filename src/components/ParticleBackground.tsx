"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  type: "float" | "star" | "shard";
}

interface Connection {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  alpha: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let stars: { x: number; y: number; size: number; twinkle: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.3 + Math.random() * 1.2,
          twinkle: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.05,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = () => {
      const type = Math.random() < 0.6 ? "float" : Math.random() < 0.7 ? "star" : "shard";
      const hue = 190 + Math.random() * 60;
      const size = type === "shard" ? 2 + Math.random() * 4 : 1.5 + Math.random() * 3;
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * (type === "shard" ? 1.5 : 0.6),
        vy: -(0.5 + Math.random() * (type === "shard" ? 2 : 1)),
        size,
        opacity: 0.2 + Math.random() * 0.5,
        hue,
        life: 0,
        maxLife: type === "shard" ? 80 + Math.random() * 60 : 300 + Math.random() * 400,
        type,
      });
    };

    const spawnBurst = (x: number, y: number) => {
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4;
        const hue = 180 + Math.random() * 80;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 4,
          opacity: 0.8,
          hue,
          life: 0,
          maxLife: 30 + Math.random() * 50,
          type: "shard",
        });
      }
    };

    const drawStar = (
      cx: number,
      cy: number,
      outerR: number,
      innerR: number,
      points: number,
      alpha: number,
      hue: number
    ) => {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background stars
      for (const star of stars) {
        star.twinkle += star.speed;
        const alpha = 0.2 + Math.sin(star.twinkle) * 0.3 + 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
        ctx.fill();
      }

      // Spawn more particles
      if (particles.length < 150 && Math.random() < 0.45) {
        spawnParticle();
      }

      // Draw connections between nearby float particles
      const floatParticles = particles.filter((p) => p.type === "float");
      for (let i = 0; i < floatParticles.length; i++) {
        for (let j = i + 1; j < floatParticles.length; j++) {
          const a = floatParticles[i];
          const b = floatParticles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - progress);

        if (p.type === "star") {
          drawStar(p.x, p.y, p.size * (1 - progress * 0.3), p.size * 0.4, 4, alpha, p.hue);
        } else if (p.type === "shard") {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.life * 0.1);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha})`;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha})`;
          ctx.fill();

          if (p.size > 2 && alpha > 0.1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(190, 100%, 90%, ${alpha * 0.5})`;
            ctx.fill();
          }
        }

        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#020617" }}
    />
  );
}

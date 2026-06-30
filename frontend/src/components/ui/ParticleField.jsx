import { useEffect, useRef } from "react";

/**
 * อนุภาคฝุ่นลอยเบา ๆ พื้นหลัง hero (สไตล์ React Bits "Particles")
 * วาดด้วย canvas ล้วน ไม่พึ่งไลบรารีภายนอกเพื่อความเบาและเสถียร
 */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function ParticleField({ count = 70, className = "", color }) {
  const canvasRef = useRef(null);
  const resolvedColor = color || getComputedStyle(document.documentElement).getPropertyValue('--accent-glow-hex').trim() || '#F2A65A';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    let particles = [];
    let width = 0;
    let height = 0;

    function resize() {
      width = canvas.offsetWidth * dpr;
      height = canvas.offsetHeight * dpr;
      canvas.width = width;
      canvas.height = height;
    }

    function init() {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 1.4 + 0.4) * dpr,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        a: Math.random() * 0.45 + 0.12,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(resolvedColor, p.a);
        ctx.fill();
      });
    }

    function tick() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      draw();
      raf = requestAnimationFrame(tick);
    }

    resize();
    init();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      draw();
    } else {
      tick();
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, resolvedColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

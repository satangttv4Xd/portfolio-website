import { useRef, useState } from "react";

/**
 * การ์ดที่มีแสง spotlight ไล่ตามเมาส์ (สไตล์ React Bits)
 * ใช้ห่อ project card / skill card เพื่อเพิ่มมิติเวลาเลื่อนเมาส์ผ่าน
 */
export default function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-archive-line bg-archive-panelSolid ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(380px circle at ${pos.x}% ${pos.y}%, rgba(217,119,46,0.18), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

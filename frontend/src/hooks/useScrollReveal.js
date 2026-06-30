import { useEffect, useRef } from "react";

/**
 * ติด ref นี้กับ element ใด ๆ แล้วมันจะได้คลาส "is-visible" เมื่อเลื่อนมาเห็นในจอ
 * ใช้คู่กับคลาส .reveal ใน index.css
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}

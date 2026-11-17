"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carrega o react-confetti sob demanda, fora do bundle inicial da página
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      numberOfPieces={400}
      recycle={false}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}

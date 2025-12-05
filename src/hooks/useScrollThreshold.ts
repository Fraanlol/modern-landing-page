import { useEffect, useState } from "react";

/**
 * Hook para saber si la página se ha desplazado más allá de un umbral (px).
 * - threshold: número de píxeles por encima del cual se considera "scrolled" (por defecto 20)
 */
export default function useScrollThreshold(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Ejecutar inicialmente para aplicar estado correcto al montar
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

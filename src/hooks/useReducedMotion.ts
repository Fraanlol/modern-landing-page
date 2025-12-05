import { useEffect, useState } from "react";

/**
 * Hook para detectar la preferencia de movimiento reducido del usuario
 * y dispositivos de bajo rendimiento
 *
 * @returns {boolean} true si se debe reducir las animaciones
 */
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Detectar prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    // Listener para cambios en la preferencia
    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };

    // Detectar dispositivos de bajo rendimiento (más conservador)
    const isLowEndDevice = () => {
      // Navigator.hardwareConcurrency: número de núcleos lógicos
      const cores = navigator.hardwareConcurrency || 0;

      // Navigator.deviceMemory: GB de RAM (solo en Chrome)
      const memory = (navigator as any).deviceMemory || 0;

      // Considerar low-end solo si tiene 2 cores o menos Y menos de 2GB RAM
      // Esto es más conservador - la mayoría de dispositivos modernos tienen 4+ cores
      return cores > 0 && cores <= 2 && memory > 0 && memory < 2;
    };

    // Si es dispositivo low-end Y el usuario no tiene prefers-reduced-motion configurado,
    // sugerir reducción de movimiento
    if (!mediaQuery.matches && isLowEndDevice()) {
      setShouldReduceMotion(true);
    }

    // Agregar listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return shouldReduceMotion;
}

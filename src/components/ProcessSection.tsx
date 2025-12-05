import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import BlobBackground from "@/components/ui/BlobBackground";
import { ProcessCard } from "@/components/process/ProcessCard";
import { ProcessCTA } from "@/components/process/ProcessCTA";
import type { ProcessStepData } from "@/lib/types";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/lib/constants";
gsap.registerPlugin(ScrollTrigger);

// Configuración de steps con estilos
const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: "01",
    icon: "🔍",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/50",
    title: "",
    description: "",
  },
  {
    number: "02",
    icon: "📐",
    color: "from-indigo-500 to-purple-400",
    bgColor: "bg-indigo-500/20",
    borderColor: "border-indigo-400/50",
    title: "",
    description: "",
  },
  {
    number: "03",
    icon: "🚀",
    color: "from-purple-500 to-pink-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-400/50",
    title: "",
    description: "",
  },
];

/**
 * Sección de proceso con animación scroll-triggered
 * Las cards se apilan y animan mientras se hace scroll
 * Soporta prefers-reduced-motion deshabilitando animaciones complejas
 */
export default function ProcessSection() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [ctaHeight, setCtaHeight] = useState(0);

  useEffect(() => {
    // Si hay reducción de movimiento, no inicializar animaciones GSAP
    if (shouldReduceMotion) {
      return;
    }

    // Medir altura del CTA para el overlay gradient
    const measure = () => {
      const h = ctaRef.current?.offsetHeight ?? 0;
      setCtaHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");
      const progressDots = gsap.utils.toArray<HTMLElement>(".progress-dot");

      // Pin la sección mientras scrolleamos
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Timeline principal para controlar todas las cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          scrub: 0.5,
          onUpdate: (self) => {
            // Calcular qué card está activa basado en el progreso
            const totalCards = cards.length;
            const progress = self.progress;
            const currentCardIndex =
              progress === 0
                ? 0
                : Math.min(
                    Math.floor(progress * totalCards * 1.2),
                    totalCards - 1
                  );

            // Actualizar progress dots en tiempo real
            progressDots.forEach((dot, dotIndex) => {
              if (dotIndex === currentCardIndex) {
                gsap.to(dot, {
                  width: "3rem",
                  backgroundColor: "rgb(99, 102, 241)",
                  opacity: 1,
                  duration: 0.2,
                });
              } else if (dotIndex < currentCardIndex) {
                gsap.to(dot, {
                  width: "0.5rem",
                  backgroundColor: "rgb(99, 102, 241)",
                  opacity: 0.5,
                  duration: 0.2,
                });
              } else {
                gsap.to(dot, {
                  width: "0.5rem",
                  backgroundColor: "rgb(75, 85, 99)",
                  opacity: 0.3,
                  duration: 0.2,
                });
              }
            });
          },
        },
      });

      cards.forEach((card, index) => {
        // Calcular posición inicial desde el borde del navegador
        const cardWidth = card.offsetWidth;
        const windowWidth = window.innerWidth;
        const startPosition = ((windowWidth + cardWidth) / cardWidth) * 100;

        // Calcular el offset para apilar (cada card más arriba se apila con más offset)
        const stackOffset = index * 20; // 20px de offset para cada card apilada

        // Posición inicial de cada card
        if (index === 0) {
          // La primera card empieza visible en el centro
          gsap.set(card, {
            xPercent: 0,
            y: stackOffset,
            scale: 1,
            zIndex: index + 1,
          });
        } else {
          // Las demás cards empiezan desde el borde derecho del navegador
          gsap.set(card, {
            xPercent: startPosition,
            y: 0,
            scale: 1,
            zIndex: index + 1,
          });
        }

        // Animación de entrada: desde el borde derecho hasta el centro
        if (index > 0) {
          tl.to(
            card,
            {
              xPercent: 0,
              y: stackOffset,
              duration: 1,
              ease: "power2.out",
            },
            index * 1.5 // Delay entre cada card
          );
        }

        // Actualizar progress dots basado en el momento de entrada de cada card
        tl.add(() => {
          progressDots.forEach((dot, dotIndex) => {
            if (dotIndex === index) {
              gsap.to(dot, {
                width: "3rem",
                backgroundColor: "rgb(99, 102, 241)",
                opacity: 1,
                duration: 0.3,
              });
            } else if (dotIndex < index) {
              gsap.to(dot, {
                width: "0.5rem",
                backgroundColor: "rgb(99, 102, 241)",
                opacity: 0.5,
                duration: 0.3,
              });
            } else {
              gsap.to(dot, {
                width: "0.5rem",
                backgroundColor: "rgb(75, 85, 99)",
                opacity: 0.3,
                duration: 0.3,
              });
            }
          });
        }, index * 1.5 + 0.5);
      });

      // Animar encabezado
      gsap.from(".header-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animar CTA
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", measure);
    };
  }, [shouldReduceMotion]); // Agregar dependencia de shouldReduceMotion

  return (
    <>
      <div
        className={`${colors.background.secondary} min-h-screen overflow-x-hidden relative`}
      >
        <div
          className="absolute top-0 left-0 w-full h-32 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, ${
              theme === "dark" ? "rgb(2, 6, 23)" : "rgb(243, 244, 246)"
            }, transparent)`,
          }}
        />

        <section
          ref={sectionRef}
          className={`relative w-full h-screen ${colors.background.primary} overflow-hidden`}
        >
          {/* Grid Background */}
          <div className="absolute inset-0">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                radial-gradient(ellipse at 50% 50%, ${
                  theme === "dark"
                    ? "rgba(99, 102, 241, 0.15)"
                    : "rgba(59, 130, 246, 0.08)"
                } 0%, transparent 70%),
                linear-gradient(${
                  theme === "dark"
                    ? "rgba(99, 102, 241, 0.25)"
                    : "rgba(99, 102, 241, 0.25)"
                } 1px, transparent 1px),
                linear-gradient(90deg, ${
                  theme === "dark"
                    ? "rgba(99, 102, 241, 0.25)"
                    : "rgba(99, 102, 241, 0.25)"
                } 1px, transparent 1px)
              `,
                backgroundSize: "100% 100%, 20px 20px, 20px 20px",
              }}
            />
          </div>

          {/* Elementos decorativos */}
          <BlobBackground />

          <div className="max-w-6xl mx-auto px-6 relative z-10 h-full flex flex-col justify-between py-20">
            {/* Header */}
            <div className="header-content mb-12">
              <h2
                className={`text-5xl md:text-7xl font-black ${colors.text.primary} mb-6 leading-tight`}
              >
                {t("process.header.title.line1")}
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
                  {t("process.header.title.line2")}
                </span>
              </h2>
              <div className="h-1 w-20 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full" />
              <p
                className={`${colors.text.tertiary} text-lg font-light max-w-2xl mt-6`}
              >
                {t("process.header.lead")}
              </p>
            </div>

            {/* Cards Container */}
            <div
              ref={cardsContainerRef}
              className={cn(
                "relative flex-1 max-w-4xl mx-auto w-full min-h-[300px] md:min-h-0",
                shouldReduceMotion ? "space-y-6" : "" // Layout simple si hay reducción de movimiento
              )}
            >
              {shouldReduceMotion
                ? // Layout estático para reduced motion
                  PROCESS_STEPS.map((step, idx) => (
                    <div key={idx} className="relative w-full">
                      <ProcessCard step={step} index={idx} />
                    </div>
                  ))
                : // Layout animado normal
                  PROCESS_STEPS.map((step, idx) => (
                    <ProcessCard key={idx} step={step} index={idx} />
                  ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-3 mt-18">
              {PROCESS_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className="progress-dot h-2 w-2 rounded-full bg-gray-600 opacity-30 transition-all"
                />
              ))}
            </div>
          </div>
        </section>

        <div
          className="absolute w-full h-12 pointer-events-none z-10"
          style={{
            bottom: `${ctaHeight}px`,
            background: `linear-gradient(to bottom, transparent, ${
              theme === "dark" ? "rgb(0, 0, 0)" : "rgb(243, 244, 246)"
            })`,
          }}
        />

        {/* CTA Section */}
        <div ref={ctaRef}>
          <ProcessCTA />
        </div>
      </div>
    </>
  );
}

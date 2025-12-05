import { useState, useEffect, useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlobBackground from "@/components/ui/BlobBackground";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// Configuración de animaciones
const ANIMATION_CONFIG = {
  // Desplazamientos Y
  HEADER_Y_OFFSET: 50,
  CARD_Y_OFFSET: 100,
  CTA_Y_OFFSET: 50,

  // Duraciones (en segundos)
  DURATION_SLOW: 1,
  DURATION_MEDIUM: 0.8,
  DURATION_FAST: 0.4,

  // Delays y stagger
  CARD_STAGGER_DELAY: 0.2,

  // Scales
  CARD_INITIAL_SCALE: 0.9,
  CARD_HOVER_SCALE: 1.01,
  CARD_ACTIVE_SCALE: 1.02,
  BUTTON_ACTIVE_SCALE: 0.95,

  // ScrollTrigger positions
  TRIGGER_START_TOP: "top 80%",
  TRIGGER_START_CARD: "top 85%",
  TRIGGER_START_CTA: "top 90%",
} as const;

export default function FeaturedProjects() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const projects = [
    {
      id: 1,
      title: t("featured.projects.0.title"),
      stat: "+340%",
      desc: t("featured.projects.0.desc"),
      beforeAfter: t("featured.projects.0.beforeAfter"),
      image: "🛍️",
      color: "bg-blue-500/20 border-blue-400/60",
      gradient: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/30",
    },
    {
      id: 2,
      title: t("featured.projects.1.title"),
      stat: "68%",
      desc: t("featured.projects.1.desc"),
      beforeAfter: t("featured.projects.1.beforeAfter"),
      image: "📈",
      color: "bg-indigo-500/20 border-indigo-400/60",
      gradient: "from-indigo-600 to-indigo-400",
      shadow: "shadow-indigo-500/30",
    },
    {
      id: 3,
      title: t("featured.projects.2.title"),
      stat: "180x",
      desc: t("featured.projects.2.desc"),
      beforeAfter: t("featured.projects.2.beforeAfter"),
      image: "🤖",
      color: "bg-purple-500/20 border-purple-400/60",
      gradient: "from-purple-600 to-purple-400",
      shadow: "shadow-purple-500/30",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar header
      gsap.from(headerRef.current, {
        y: ANIMATION_CONFIG.HEADER_Y_OFFSET,
        opacity: 0,
        duration: ANIMATION_CONFIG.DURATION_SLOW,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.TRIGGER_START_TOP,
        },
      });

      // Animar cards con stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: ANIMATION_CONFIG.CARD_Y_OFFSET,
            opacity: 0,
            scale: ANIMATION_CONFIG.CARD_INITIAL_SCALE,
            duration: ANIMATION_CONFIG.DURATION_MEDIUM,
            ease: "power3.out",
            delay: index * ANIMATION_CONFIG.CARD_STAGGER_DELAY,
            scrollTrigger: {
              trigger: card,
              start: ANIMATION_CONFIG.TRIGGER_START_CARD,
            },
          });
        }
      });

      // Animar CTA
      gsap.from(".cta-section", {
        y: ANIMATION_CONFIG.CTA_Y_OFFSET,
        opacity: 0,
        duration: ANIMATION_CONFIG.DURATION_SLOW,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: ANIMATION_CONFIG.TRIGGER_START_CARD,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (idx: number) => {
    setActiveProject(idx);

    // Animar el cambio
    gsap.fromTo(
      `.expand-content-${idx}`,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.DURATION_FAST,
        ease: "power2.out",
      }
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen ${colors.background.gradient.section} relative overflow-hidden py-20`}
    >
      {/* Elementos decorativos */}
      <BlobBackground />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-24">
          <div className="mb-6">
            <h2
              className={`text-5xl md:text-7xl font-black ${colors.text.primary} mb-4 leading-tight`}
            >
              {t("featured.header.line1")}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
                {t("featured.header.line2")}
              </span>
            </h2>
            <div className="h-1 w-20 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full" />
          </div>
          <p
            className={`${colors.text.secondary} text-lg max-w-2xl mt-6 font-light`}
          >
            {t("featured.header.lead")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6 mb-20">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="group"
            >
              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 cursor-pointer ${
                  project.color
                } ${
                  activeProject === idx
                    ? `${colors.background.tertiary} ${project.shadow} shadow-lg scale-[${ANIMATION_CONFIG.CARD_ACTIVE_SCALE}]`
                    : `${colors.surface.glass} hover:${colors.surface.glassStrong} hover:scale-[${ANIMATION_CONFIG.CARD_HOVER_SCALE}]`
                }`}
                onClick={() => handleProjectClick(idx)}
              >
                {/* Gradient overlay on active */}
                {activeProject === idx && (
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none active-glow" />
                )}

                {/* Content */}
                <div className="relative p-6 md:p-10">
                  {/* Top Row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6 md:mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className={`text-4xl md:text-5xl project-image transition-all duration-500 ${
                            activeProject === idx ? "scale-110" : ""
                          }`}
                        >
                          {project.image}
                        </span>
                      </div>
                      <h3
                        className={`text-2xl md:text-4xl font-black ${colors.text.primary} mb-2`}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div className="md:text-right">
                      <p
                        className={`text-4xl md:text-6xl font-black bg-linear-to-r ${
                          project.gradient
                        } bg-clip-text text-transparent transition-all duration-500 ${
                          activeProject === idx ? "scale-110" : ""
                        }`}
                      >
                        {project.stat}
                      </p>
                    </div>
                  </div>

                  {/* Middle Section - Description */}
                  <p
                    className={`${colors.text.secondary} text-base md:text-lg mb-4 md:mb-6 font-light leading-relaxed`}
                  >
                    {project.desc}
                  </p>

                  {/* Before/After Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg ${colors.surface.glass} border ${colors.border.light} backdrop-blur-sm transition-all duration-300 hover:${colors.surface.glassStrong}`}
                  >
                    <span
                      className={`text-xs md:text-sm font-bold ${colors.text.secondary}`}
                    >
                      {project.beforeAfter}
                    </span>
                  </div>

                  {/* Expandable Content */}
                  {activeProject === idx && (
                    <div
                      className={`expand-content-${idx} mt-6 md:mt-8 pt-6 md:pt-8 border-t ${colors.border.light} space-y-6`}
                    >
                      <button
                        className={`w-full flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm md:text-base font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[${ANIMATION_CONFIG.BUTTON_ACTIVE_SCALE}] group`}
                      >
                        {t("featured.cta.view")}
                        <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mb-24">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleProjectClick(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeProject === idx
                  ? "w-8 bg-linear-to-r from-cyan-600 to-purple-600 shadow-lg shadow-cyan-500/50"
                  : "w-2 bg-gray-600 hover:bg-gray-400 hover:w-4"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="cta-section relative">
          <div
            className={`relative bg-linear-to-br ${
              colors.background.tertiary === "bg-slate-900"
                ? "from-slate-950 via-slate-900 to-slate-950"
                : "from-slate-50 via-white to-slate-50"
            } rounded-2xl p-8 md:p-16 border ${colors.border.light} ${
              colors.text.primary
            } overflow-hidden`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-50 animate-blob" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p
                  className={`${colors.text.tertiary} font-bold text-xs uppercase tracking-widest mb-4`}
                >
                  Siguiente
                </p>
                <h3
                  className={`text-3xl md:text-5xl font-black mb-4 leading-tight`}
                >
                  Tu turno de
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
                    crecer
                  </span>
                </h3>
                <p
                  className={`${colors.text.tertiary} text-base md:text-lg font-light`}
                >
                  Hablemos de tu proyecto y veamos qué es posible.
                </p>
              </div>

              <div className="flex items-center md:justify-end">
                <button
                  className={`group relative w-full md:w-auto px-5 md:px-6 py-3 md:py-3.5 rounded-lg bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-sm md:text-base hover:shadow-xl hover:shadow-cyan-500/40 transition-all active:scale-[${ANIMATION_CONFIG.BUTTON_ACTIVE_SCALE}] flex items-center justify-center gap-2`}
                >
                  EMPEZAR HOY
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

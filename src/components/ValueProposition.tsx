import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";
import SectionBadge from "@/components/ui/SectionBadge";

export default function ValueProposition() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const [hoveredProp, setHoveredProp] = useState(-1);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (visibleItems.size === propositions.length) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    document.querySelectorAll(".prop-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const propositions = [
    {
      number: "01",
      title: t("value.propositions.0.title"),
      description: t("value.propositions.0.description"),
      visual: t("value.propositions.0.visual"),
      visualLabel: t("value.propositions.0.visualLabel"),
      color: "from-cyan-400 to-blue-500",
      textColor: "text-cyan-400",
    },
    {
      number: "02",
      title: t("value.propositions.1.title"),
      description: t("value.propositions.1.description"),
      visual: t("value.propositions.1.visual"),
      visualLabel: t("value.propositions.1.visualLabel"),
      color: "from-purple-400 to-pink-500",
      textColor: "text-purple-400",
    },
    {
      number: "03",
      title: t("value.propositions.2.title"),
      description: t("value.propositions.2.description"),
      visual: t("value.propositions.2.visual"),
      visualLabel: t("value.propositions.2.visualLabel"),
      color: "from-orange-400 to-red-500",
      textColor: "text-orange-400",
    },
  ];

  return (
    <section
      id="value-section"
      className={`min-h-screen ${colors.background.primary} relative overflow-hidden py-32`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>

      <div className="absolute top-1/3 right-0 w-1/3 h-96 bg-linear-to-l from-purple-600/10 to-transparent blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Headline */}
        <div className="text-center mb-20 lg:mb-32">
          <SectionBadge className="mb-6">{t("value.badge")}</SectionBadge>
          <h2
            className={`text-4xl lg:text-6xl font-black ${colors.text.primary} mb-6 leading-tight scroll-reveal is-visible`}
            style={{ animationDelay: "0.1s" }}
          >
            {t("value.headline")}
          </h2>
          <p
            className={`text-lg lg:text-xl ${colors.text.tertiary} max-w-3xl mx-auto scroll-reveal is-visible`}
            style={{ animationDelay: "0.2s" }}
          >
            {t("value.subheadline")}
          </p>
        </div>

        {/* Propositions */}
        <div className="space-y-32">
          {propositions.map((prop, idx) => (
            <article
              key={idx}
              className={`prop-item scroll-reveal ${
                visibleItems.has(idx) ? "is-visible" : ""
              }`}
              data-index={idx}
              style={{ animationDelay: `${idx * 0.15}s` }}
              onMouseEnter={() => setHoveredProp(idx)}
              onMouseLeave={() => setHoveredProp(-1)}
              aria-labelledby={`prop-title-${idx}`}
            >
              {/* Mobile Layout */}
              <div className="lg:hidden mobile-card-layout overflow-hidden">
                {/* Accent bar at top */}
                <div className="mobile-accent-bar">
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${prop.color}`}
                  ></div>
                </div>

                {/* Number in corner */}
                <div className="prop-number select-none pointer-events-none">
                  {prop.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h2
                    className={`text-3xl font-black ${colors.text.primary} mb-4 leading-tight whitespace-pre-line`}
                  >
                    {prop.title}
                  </h2>
                  <p
                    className={`text-base ${colors.text.tertiary} mb-6 leading-relaxed`}
                  >
                    {prop.description}
                  </p>

                  {/* Visual metric inline */}
                  <div
                    className={`flex items-center gap-4 pt-4 border-t ${colors.border.light}`}
                  >
                    <div
                      className={`text-4xl font-black bg-linear-to-br ${prop.color} bg-clip-text text-transparent`}
                    >
                      {prop.visual}
                    </div>
                    <div className="flex-1">
                      <p className={`${colors.text.tertiary} text-sm`}>
                        {prop.visualLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
                {/* Left: Number + Title */}
                <div className={`${idx % 2 === 0 ? "order-1" : "order-2"}`}>
                  <div className="relative mb-8">
                    <div className="prop-number text-left select-none pointer-events-none">
                      {prop.number}
                    </div>
                  </div>
                  <h2
                    id={`prop-title-${idx}`}
                    className={`text-5xl lg:text-6xl font-black ${colors.text.primary} mb-6 leading-tight whitespace-pre-line`}
                  >
                    {prop.title}
                  </h2>
                  <div
                    className={`divider-line h-1 w-24 bg-linear-to-r ${prop.color} mb-6 rounded-full`}
                  ></div>
                  <p
                    className={`text-xl ${colors.text.tertiary} mb-8 max-w-md leading-relaxed`}
                  >
                    {prop.description}
                  </p>
                </div>

                {/* Right: Visual Metric */}
                <div className={`${idx % 2 === 0 ? "order-2" : "order-1"}`}>
                  <div
                    className={`card-box p-12 rounded-3xl border ${colors.border.light} backdrop-blur-sm ${colors.surface.glass} hover:${colors.border.medium}`}
                  >
                    <div className="flex flex-col items-center justify-center h-80">
                      <div
                        className={`visual-metric bg-linear-to-br ${prop.color} bg-clip-text text-transparent mb-4`}
                      >
                        {prop.visual}
                      </div>
                      <div className="metric-label text-center">
                        <p className={`${colors.text.tertiary} text-lg`}>
                          {prop.visualLabel}
                        </p>
                        <div
                          className={`h-1 w-12 bg-linear-to-r ${prop.color} rounded-full mx-auto mt-4`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {idx < propositions.length - 1 && (
                <div className="col-span-full h-px bg-linear-to-r from-white/0 via-white/20 to-white/0 my-8"></div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

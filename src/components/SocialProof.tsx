import { useState, useEffect } from "react";
import { ArrowRight, Users, Zap, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { COLORS, GRADIENTS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function SocialProof() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const [counters, setCounters] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = [];
    const targets = { clients: 500, projects: 2500, satisfaction: 98 };
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        clients: Math.floor(targets.clients * progress),
        projects: Math.floor(targets.projects * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const stats = [
    {
      number: `${counters.clients}+`,
      label: t("social.stats.clients"),
      icon: Users,
    },
    {
      number: `${counters.projects}K+`,
      label: t("social.stats.projects"),
      icon: Zap,
    },
    {
      number: `${counters.satisfaction}%`,
      label: t("social.stats.satisfaction"),
      icon: TrendingUp,
    },
  ];

  const logos = ["Stripe", "Figma", "Notion", "Slack", "Adobe", "Shopify"];

  return (
    <section
      className={`min-h-screen ${colors.background.secondary} ${colors.background.gradient.section} relative overflow-hidden py-20`}
    >
      {/* Gradient orbs de fondo */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl orb-1"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl orb-2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 header-text">
            <div
              className={`px-4 py-2 rounded-full ${colors.surface.glass} backdrop-blur-md border ${colors.border.medium} hover:${colors.border.accent} transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30`}
            >
              <span
                className={`text-sm font-medium text-transparent bg-clip-text bg-linear-to-r ${GRADIENTS.text.accent}`}
              >
                {t("social.header.trust")}
              </span>
            </div>
          </div>
          <h2
            className={`text-5xl md:text-6xl font-bold ${colors.text.primary} mb-6 leading-tight header-text`}
            style={{ animationDelay: "0.2s" }}
          >
            {t("social.header.title.line1")} <br />
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r ${GRADIENTS.text.default}`}
            >
              {t("social.header.title.line2")}
            </span>
          </h2>
          <p
            className={`text-lg ${colors.text.secondary} max-w-2xl mx-auto header-text`}
            style={{ animationDelay: "0.3s" }}
          >
            {t("social.header.lead")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`stat-card group relative p-8 rounded-2xl backdrop-blur-xl ${colors.surface.glassStrong} border ${colors.border.medium} hover:${colors.border.accent} hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300"></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-lg group-hover:from-blue-400/40 group-hover:to-purple-400/40 transition-all stat-icon">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <p
                    className={`text-4xl font-bold ${colors.text.primary} mb-2 stat-number`}
                  >
                    {stat.number}
                  </p>
                  <p className={`${colors.text.tertiary} font-medium`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logos Section */}
        <div className="mb-20">
          <p
            className={`text-center text-sm font-semibold ${colors.text.tertiary} uppercase tracking-widest mb-12`}
          >
            {t("social.logos.title")}
          </p>

          {/* Grid de logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {logos.map((logo, idx) => (
              <div key={idx} className="logo-card group relative">
                <div
                  className={`p-6 rounded-xl backdrop-blur-md ${colors.surface.glass} border ${colors.border.light} hover:${colors.border.strong} hover:${colors.surface.glassStrong} transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 h-24 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 rounded-xl transition-all"></div>
                  <span
                    className={`${colors.text.secondary} font-semibold group-hover:${colors.text.primary} transition-all duration-300 relative z-10 text-center text-sm md:text-base group-hover:scale-110 group-hover:-rotate-1`}
                  >
                    {logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`relative p-8 md:p-12 rounded-2xl backdrop-blur-xl bg-linear-to-r from-white/10 to-white/5 border ${colors.border.medium} hover:${colors.border.accent} transition-all hover:shadow-2xl hover:shadow-purple-500/20 header-text`}
          style={{ animationDelay: "0.7s" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className={`${colors.text.primary} font-bold text-xl mb-2`}>
                {t("social.cta.title")}
              </p>
              <p className={colors.text.tertiary}>
                {t("social.cta.description")}
              </p>
            </div>
            <button
              className={`cta-button flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r ${GRADIENTS.primary} hover:${GRADIENTS.primaryHover} text-white font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/50 whitespace-nowrap active:scale-95`}
            >
              {t("social.cta.button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

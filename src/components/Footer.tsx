import { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function FooterSection() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const footerLinks = [
    {
      title: t("footer.columns.product.title"),
      links: [
        t("footer.columns.product.links.0"),
        t("footer.columns.product.links.1"),
        t("footer.columns.product.links.2"),
        t("footer.columns.product.links.3"),
      ],
    },
    {
      title: t("footer.columns.company.title"),
      links: [
        t("footer.columns.company.links.0"),
        t("footer.columns.company.links.1"),
        t("footer.columns.company.links.2"),
        t("footer.columns.company.links.3"),
      ],
    },
    {
      title: t("footer.columns.resources.title"),
      links: [
        t("footer.columns.resources.links.0"),
        t("footer.columns.resources.links.1"),
        t("footer.columns.resources.links.2"),
        t("footer.columns.resources.links.3"),
      ],
    },
    {
      title: t("footer.columns.legal.title"),
      links: [
        t("footer.columns.legal.links.0"),
        t("footer.columns.legal.links.1"),
        t("footer.columns.legal.links.2"),
        t("footer.columns.legal.links.3"),
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: t("footer.social.twitter"), href: "#" },
    { icon: Linkedin, label: t("footer.social.linkedin"), href: "#" },
    { icon: Github, label: t("footer.social.github"), href: "#" },
    {
      icon: Mail,
      label: t("footer.social.email"),
      href: "mailto:hello@example.com",
    },
  ];

  const contactInfo = [
    { icon: Mail, text: t("footer.contact.email") },
    { icon: Phone, text: t("footer.contact.phone") },
    { icon: MapPin, text: t("footer.contact.location") },
  ];

  const gridColor =
    theme === "dark" ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.25)";
  const gridOpacity =
    theme === "dark"
      ? "opacity-20"
      : colors.hero?.gridOpacity || "opacity-[0.15]";

  return (
    <footer
      className={`relative ${colors.background.secondary} ${colors.text.primary} overflow-hidden`}
    >
      {/* Fondo con cuadrícula */}
      <div className={`absolute inset-0 ${gridOpacity}`}>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Elementos decorativos - muy sutiles */}
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      {/* Contenido principal del pie de página */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Sección superior - CTA */}
        <div
          className={`footer-item grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12 lg:pb-20 border-b ${colors.border.light} mb-12 lg:mb-20`}
        >
          <div>
            <h3
              className={`text-3xl md:text-5xl lg:text-6xl font-black ${colors.text.primary} mb-3 md:mb-4 leading-tight`}
            >
              {t("footer.cta.title.line1")}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
                {t("footer.cta.title.line2")}
              </span>
            </h3>
            <p
              className={`${colors.text.tertiary} text-base md:text-lg font-light max-w-xl`}
            >
              {t("footer.cta.lead")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
            <input
              type="email"
              placeholder={t("footer.cta.placeholder")}
              className={`flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl ${colors.surface.glassStrong} border ${colors.border.medium} hover:${colors.border.strong} ${colors.text.primary} placeholder-${colors.text.tertiary} backdrop-blur-sm transition-all focus:outline-none focus:border-blue-400/60 text-sm md:text-base`}
            />
            <button className="group px-5 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-bold md:font-black text-sm md:text-base hover:shadow-xl hover:shadow-blue-500/40 transition-all active:scale-95 whitespace-nowrap flex items-center justify-center gap-2">
              {t("footer.cta.button")}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Sección media - Cuadrícula de enlaces */}
        <div
          className={`footer-item grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-12 md:pb-20 border-b ${colors.border.light} mb-12 md:mb-20`}
        >
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h4
                className={`text-xs md:text-sm font-bold uppercase tracking-widest ${colors.text.primary} mb-4 md:mb-6`}
              >
                {column.title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className={`${colors.text.tertiary} hover:${colors.text.primary} transition-colors font-light text-sm md:text-base`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sección inferior - Contacto y redes sociales */}
        <div
          className={`footer-item grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12 md:pb-20 border-b ${colors.border.light} mb-12 md:mb-20`}
        >
          {/* Información de contacto */}
          <div>
            <h4
              className={`text-xs md:text-sm font-bold uppercase tracking-widest ${colors.text.primary} mb-4 md:mb-6`}
            >
              {t("footer.contact.title")}
            </h4>
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 md:gap-3">
                    <div
                      className={`p-2 rounded-lg ${colors.surface.glass} border ${colors.border.light}`}
                    >
                      <Icon
                        className={`w-4 h-4 md:w-5 md:h-5 ${colors.text.tertiary}`}
                      />
                    </div>
                    <span
                      className={`${colors.text.tertiary} font-light text-sm md:text-base`}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enlaces de redes sociales */}
          <div>
            <h4
              className={`text-xs md:text-sm font-bold uppercase tracking-widest ${colors.text.primary} mb-4 md:mb-6`}
            >
              {t("footer.social.title")}
            </h4>
            <div className="flex gap-2 md:gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className={`p-2.5 md:p-3 rounded-lg ${colors.surface.glass} border ${colors.border.light} hover:${colors.border.medium} hover:${colors.surface.glassStrong} ${colors.text.tertiary} hover:${colors.text.primary} transition-all group`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Marca/Logo */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mb-2">
                {t("footer.brand.name")}
              </h4>
              <p
                className={`${colors.text.tertiary} font-light text-xs md:text-sm`}
              >
                {t("footer.brand.tagline")}
              </p>
            </div>
          </div>
        </div>

        {/* Pie final - Derechos de autor */}
        <div className="footer-item flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p
            className={`${colors.text.muted} text-xs md:text-sm font-light text-center md:text-left`}
          >
            {t("footer.copy")}
          </p>

          <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 text-xs md:text-sm font-light transition-colors"
            >
              {t("footer.links.privacy")}
            </a>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 text-xs md:text-sm font-light transition-colors"
            >
              {t("footer.links.terms")}
            </a>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 text-xs md:text-sm font-light transition-colors"
            >
              {t("footer.links.cookies")}
            </a>
          </div>
        </div>
      </div>

      {/* Línea de gradiente en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
    </footer>
  );
}

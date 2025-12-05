import { Link } from "@/i18n/navigation";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

type NavItem = { label: string; href: string; type: "route" | "anchor" };

export default function NavLinks({
  navItems,
  scrolled,
}: {
  navItems: NavItem[];
  scrolled: boolean;
}) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div className="hidden md:flex items-center gap-1">
      {navItems.map((item, index) => {
        const className = `px-4 py-2 text-sm font-medium ${colors.text.secondary} hover:${colors.text.primary} rounded-lg hover:${colors.surface.glass} transition-all duration-300 relative group/item`;
        const content = (
          <>
            <span className="relative z-10">{item.label}</span>
            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover/item:from-blue-500/10 group-hover/item:via-purple-500/10 group-hover/item:to-blue-500/10 transition-all duration-300" />
          </>
        );

        if (item.type === "route") {
          return (
            <Link key={index} href={item.href} className={className}>
              {content}
            </Link>
          );
        }

        return (
          <a key={index} href={item.href} className={className}>
            {content}
          </a>
        );
      })}
    </div>
  );
}

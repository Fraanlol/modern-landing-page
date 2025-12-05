export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "IT", name: "Italiano", flag: "🇮🇹" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
];

export default languages;

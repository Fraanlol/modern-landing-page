import React from "react";
import { LucideIcon } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface InputProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  icon?: LucideIcon;
  label: string;
  required?: boolean;
}

export default function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  label,
  required = false,
}: InputProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`}
          />
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? "pl-12" : "pl-4"} pr-4 py-3 rounded-lg ${
            colors.surface.glass
          } border ${
            error ? "border-red-500/50" : colors.border.medium
          } hover:${colors.border.strong} focus:border-blue-400/60 ${
            colors.text.primary
          } placeholder-gray-500 transition-all focus:outline-none`}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

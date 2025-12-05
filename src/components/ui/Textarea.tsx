import React from "react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface TextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  label: string;
  rows?: number;
  required?: boolean;
}

export default function Textarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  label,
  rows = 6,
  required = false,
}: TextareaProps) {
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
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg ${
          colors.surface.glass
        } border ${error ? "border-red-500/50" : colors.border.medium} hover:${
          colors.border.strong
        } focus:border-blue-400/60 ${
          colors.text.primary
        } placeholder-gray-500 transition-all focus:outline-none resize-none`}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

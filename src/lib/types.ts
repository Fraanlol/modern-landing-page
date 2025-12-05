/**
 * Type definitions for common component props
 */

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface StatData {
  number: string;
  label: string;
  icon?: LucideIcon;
  gradient?: string;
}

export interface LinkData {
  label: string;
  href: string;
  type?: "route" | "anchor";
}

export interface SocialLinkData {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface FormFieldData {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
}

export interface ProcessStepData {
  number: string;
  title: string;
  description: string;
  icon: string; // Emoji o componente de icono
  color: string; // Clases de color para el gradiente
  bgColor: string; // Clase de background
  borderColor: string; // Clase de borde
}

export interface ValuePropositionData {
  number: string;
  title: string;
  description: string;
  visual: string;
  visualLabel: string;
  color: string;
  textColor: string;
}

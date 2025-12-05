"use client";

import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ValueProposition from "@/components/ValueProposition";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProcessSection from "@/components/ProcessSection";
import FooterSection from "@/components/Footer";
import { useTranslations } from "next-intl";

export const runtime = "edge";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <div id="services">
        <ValueProposition />
      </div>
      <div id="projects">
        <FeaturedProjects />
      </div>
      <ProcessSection />
      <FooterSection />
    </main>
  );
}

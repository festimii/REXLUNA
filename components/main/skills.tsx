"use client";

import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";

import { useState } from "react";

const TABS = [
  { label: "All", data: SKILL_DATA },
  { label: "Frontend", data: FRONTEND_SKILL },
  { label: "Backend", data: BACKEND_SKILL },
  { label: "Fullstack", data: FULLSTACK_SKILL },
  { label: "Other", data: OTHER_SKILL },
] as const;

export const Skills = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      <div className="flex gap-4 mt-6">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-3 py-1 rounded border text-sm ${
              active === i
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent"
                : "border-[#7042f88b] text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-around flex-wrap mt-8 gap-5 items-center">
        {TABS[active].data.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};

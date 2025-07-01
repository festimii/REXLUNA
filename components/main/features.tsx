"use client";

import { slideInFromTop } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { FEATURES } from "@/constants";
import { CloudAnimation } from "./cloud-animation";

export const Features = () => {
  return (
    <section id="features" className="relative flex flex-col h-full w-full">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
        Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-5xl">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="p-6 border border-[#7042f88b] rounded-lg bg-[#030014] "
          >
            <h2 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h2>
            <p className="text-white">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 w-full max-w-md">
        <CloudAnimation />
      </div>
    </section>
  );
};

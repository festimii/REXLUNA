"use client";

import { FEATURES } from "@/constants";

export const Features = () => {
  return (
    <section
      id="features"
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 py-20 "
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-12 text-center">
        Features
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="p-6 border border-[#7042f88b] rounded-lg bg-[#030014] bg-opacity-90 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h2>
            <p className="text-white text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

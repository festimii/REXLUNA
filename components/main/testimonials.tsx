"use client";
import Image from "next/image";
import { TESTIMONIALS } from "@/constants";

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-12 text-center">
        Testimonials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="p-6 border border-[#7042f88b] rounded-lg bg-[#030014] bg-opacity-90 shadow-lg text-center"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={t.image}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <p className="text-white text-sm mb-2">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-white font-semibold">{t.name}</p>
            <p className="text-gray-400 text-sm">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

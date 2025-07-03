"use client";

import Image from "next/image";
import Link from "next/link";

import { PARTNERS } from "@/constants";

export const Partners = () => {
  return (
    <section
      id="partners"
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-12 text-center">
        Trusted Technology Partner for Your Digital Future
      </h1>
      <p className="text-white text-md mb-8 max-w-2xl text-center">
        At Dexluna, we collaborate with forward-thinking organizations to
        deliver innovative software solutions that drive growth, improve
        efficiency, and enhance user experience. Whether you're a startup,
        enterprise, or public sector partner, we bring deep technical expertise,
        agile development practices, and a commitment to excellence to every
        project. Join us in building impactful digital products that shape
        tomorrow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {PARTNERS.map((partner) => (
          <Link
            key={partner.name}
            href={partner.link}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center border border-[#7042f88b] rounded-lg p-6 bg-[#030014] bg-opacity-90"
          >
            <div className="w-[100px] h-[100px] flex items-center justify-center mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <p className="text-white text-lg text-center">{partner.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

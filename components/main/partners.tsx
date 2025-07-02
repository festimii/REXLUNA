"use client";

import Image from "next/image";
import Link from "next/link";

import { PARTNERS } from "@/constants";

export const Partners = () => {
  return (
    <section
      id="partners"
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-12 text-center">
        Partners
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {PARTNERS.map((partner) => (
          <Link
            key={partner.name}
            href={partner.link}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center border border-[#7042f88b] rounded-lg p-6 bg-[#030014] bg-opacity-90"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-white text-lg">{partner.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

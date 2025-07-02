"use client";
import { useState } from "react";
import { ContactAnimation } from "@/components/main/contact-animation";
import { ContactForm } from "@/components/main/contact-form";
import { StarsCanvas } from "@/components/main/star-background";

export default function ContactPage() {
  const [name, setName] = useState("Festim");

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <StarsCanvas />
      <div className="relative z-10 flex flex-col md:flex-row h-screen max-w-6xl mx-auto px-4">
        <div className="flex flex-1 items-center justify-center">
          <ContactForm onNameChange={setName} />
        </div>
        <div className="relative w-[450px] h-[450px] md:w-[480px] md:h-[480px] ml-6">
          <ContactAnimation text={`Hi ${name}`} />
        </div>
      </div>
    </main>
  );
}

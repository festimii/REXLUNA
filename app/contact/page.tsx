"use client";
import { useState } from "react";
import { ContactAnimation } from "@/components/main/contact-animation";
import { ContactForm } from "@/components/main/contact-form";
import { StarsCanvas } from "@/components/main/star-background";

export default function ContactPage() {
  const [name, setName] = useState("John Doe");
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <StarsCanvas />
      <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center">
        <ContactAnimation text={name} />
        <ContactForm onNameChange={setName} />
      </div>
    </main>
  );
}

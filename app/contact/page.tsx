import { ContactAnimation } from "@/components/main/contact-animation";
import { ContactForm } from "@/components/main/contact-form";
import { StarsCanvas } from "@/components/main/star-background";

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <StarsCanvas />
      <ContactAnimation />
      <ContactForm />
    </main>
  );
}

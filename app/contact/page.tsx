import { ContactAnimation } from "@/components/main/contact-animation";
import { ContactForm } from "@/components/main/contact-form";

export default function ContactPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <ContactAnimation />
      <ContactForm />
    </main>
  );
}

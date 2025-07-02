"use client";
import { useEffect, useState } from "react";

interface ContactFormProps {
  onNameChange?: (name: string) => void;
}

export const ContactForm = ({ onNameChange }: ContactFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (onNameChange) {
      onNameChange("Festim");
    }
  }, [onNameChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailFocus = () => {
    if (onNameChange) onNameChange(form.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:contact@example.com?subject=${encodeURIComponent(
      "Message from " + form.name
    )}&body=${encodeURIComponent(form.message + "\n\nfrom: " + form.email)}`;
    window.location.href = mailto;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-xl p-8 space-y-6 rounded-xl border border-white/20  bg-white/5 shadow-xl"
    >
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
        Get in touch
      </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-gray-200">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 rounded-md bg-transparent border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-gray-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          onFocus={handleEmailFocus}
          required
          className="p-3 rounded-md bg-transparent border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-gray-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Let's work together..."
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          className="p-3 rounded-md bg-transparent border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 font-medium rounded-md bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
      >
        Send Message
      </button>
    </form>
  );
};

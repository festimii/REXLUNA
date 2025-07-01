"use client";
import { useState } from "react";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      className="relative z-10 flex flex-col gap-4 bg-[#030014cc] p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h1 className="text-2xl font-semibold text-white text-center">Contact Me</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="p-2 rounded-md bg-transparent border border-gray-600 text-white"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="p-2 rounded-md bg-transparent border border-gray-600 text-white"
      />
      <textarea
        name="message"
        placeholder="Message"
        rows={4}
        value={form.message}
        onChange={handleChange}
        required
        className="p-2 rounded-md bg-transparent border border-gray-600 text-white"
      />
      <button
        type="submit"
        className="py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
      >
        Send
      </button>
    </form>
  );
};

import React, { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Reveal from "./Reveal";

// Web3Forms keys are public by design (they ship in the browser bundle)
const WEB3FORMS_ACCESS_KEY = "3ea6ba9c-c22b-4260-ba17-62302ae7e653";

const socials = [
  { href: "https://github.com/enochmakafui", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/enoch-hodo-686739237/", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/enoch_hodo", label: "X", icon: Twitter },
];

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-400";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // FormData keeps this a "simple" CORS request; a JSON body triggers a
    // preflight that Web3Forms rejects with 403.
    const body = new FormData();
    body.append("access_key", WEB3FORMS_ACCESS_KEY);
    body.append("subject", `New portfolio message from ${formData.name}`);
    body.append("from_name", "Portfolio website");
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="border-t border-zinc-200 py-24 dark:border-zinc-900">
      <div className="container-page grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Have a project in mind?</h2>
          <p className="mt-4 max-w-md leading-relaxed text-zinc-600 dark:text-zinc-400">
            I'm open to freelance and full-time work. Tell me a bit about what
            you're building and I'll get back to you within a day.
          </p>
          <a
            href="mailto:enochhodo1@gmail.com"
            className="mt-8 inline-flex items-center gap-2 text-lg font-medium underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900 dark:decoration-zinc-700 dark:hover:decoration-white"
          >
            <Mail className="h-5 w-5" />
            enochhodo1@gmail.com
          </a>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-zinc-200 p-2.5 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                aria-label="Name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                type="email"
                name="email"
                aria-label="Email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <textarea
              name="message"
              aria-label="Message"
              placeholder="Tell me about your project"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`${inputClass} resize-none`}
              required
            />
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send message"}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              {status === "sent" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Thanks — I'll be in touch soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please email me directly.</p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;

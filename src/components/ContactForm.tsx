"use client";

import { useState, type FormEvent } from "react";

const TYPY = ["Rodinný dom", "Bytový dom", "Priemyselná hala", "Infraštruktúra", "Rekonštrukcia"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      data: {
        meno: form.get("name"),
        email: form.get("email"),
        telefon: form.get("phone"),
        typStavby: form.get("type"),
        popis: form.get("msg"),
      },
    };

    try {
      // Public Strapi endpoint for the "dopyt" (lead) content type — protected by
      // a public "create" permission only, no auth token needed from the browser.
      const res = await fetch("/api/dopyt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Strapi rejected the lead");
      setStatus("done");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center bg-orange">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11l5 5L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-head text-xl font-bold">Dopyt odoslaný</h3>
        <p className="max-w-[280px] text-[15px] leading-relaxed text-steel">Ďakujeme, ozveme sa do 24 hodín.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field label="Meno a priezvisko" name="name" placeholder="Ján Stavbár" />
      <Field label="Email" name="email" type="email" placeholder="jan@stavba.sk" />
      <Field label="Telefón" name="phone" type="tel" placeholder="+421 9XX XXX XXX" />

      <div>
        <label htmlFor="type" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-steel">
          Typ stavby
        </label>
        <select id="type" name="type" className="w-full border border-charcoal bg-paper px-3.5 py-3 text-sm">
          {TYPY.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="msg" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-steel">
          Popis projektu
        </label>
        <textarea
          id="msg"
          name="msg"
          placeholder="Stručne opíšte rozsah materiálu, ktorý potrebujete, a predpokladaný termín."
          className="min-h-[110px] w-full resize-y border border-charcoal bg-paper px-3.5 py-3 text-sm"
        />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn-primary self-start disabled:opacity-60">
        {status === "sending" ? "Odosielam…" : "Odoslať dopyt"}
      </button>
      {status === "error" && <p className="text-sm text-orange">Odoslanie zlyhalo, skúste to prosím znova.</p>}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-steel">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-charcoal bg-paper px-3.5 py-3 text-sm"
      />
    </div>
  );
}

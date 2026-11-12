"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type Fields = { name: string; email: string; phone: string; type: string; date: string; guests: string; message: string };
const EMPTY: Fields = { name: "", email: "", phone: "", type: "Private dinner", date: "", guests: "", message: "" };
const TYPES = ["Private dinner", "Celebration", "Corporate dining", "Business meeting", "Exclusive restaurant hire", "Other"];

/**
 * Private dining enquiry. Validates in the browser, then hands a pre-written
 * email to the guest's mail app addressed to the reservations team.
 * PRODUCTION: point `onSubmit` at the restaurant's CRM / OpenTable private
 * dining form; this prototype does not invent a backend.
 */
export function EnquiryForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Please enter a valid email address.";
    if (f.phone && !/^[+()\d\s-]{7,}$/.test(f.phone)) e.phone = "Please enter a valid telephone number.";
    if (!f.date) e.date = "Please choose a preferred date.";
    else if (new Date(f.date) < new Date(new Date().toDateString())) e.date = "Please choose a date in the future.";
    const g = Number(f.guests);
    if (!g || g < 1) e.guests = "How many guests?";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const body = [
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      f.phone && `Telephone: ${f.phone}`,
      `Event: ${f.type}`,
      `Preferred date: ${f.date}`,
      `Guests: ${f.guests}`,
      f.message && `\n${f.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email.reservations}?subject=${encodeURIComponent(`Private dining enquiry: ${f.type}, ${f.date}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-6 text-ivory outline-none transition-colors placeholder:text-transparent focus:border-brass";
  const label = "t-label pointer-events-none absolute left-0 top-0 text-muted";

  const Input = ({ k, labelText, type = "text", ...rest }: { k: keyof Fields; labelText: string; type?: string; [x: string]: unknown }) => (
    <div className="relative">
      <input id={`f-${k}`} type={type} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} className={field} placeholder={labelText} {...rest} />
      <label htmlFor={`f-${k}`} className={label}>
        {labelText}
      </label>
      {errors[k] ? (
        <p id={`e-${k}`} className="mt-2 text-xs text-[#d99a8f]">
          {errors[k]}
        </p>
      ) : null}
    </div>
  );

  if (sent)
    return (
      <div className="border border-line p-8 lg:p-12" role="status">
        <p className="t-label text-brass">Thank you</p>
        <p className="t-title mt-4">Your email is ready to send.</p>
        <p className="mt-4 text-ivory/75">
          If your mail app did not open, write to <a className="underline" href={`mailto:${site.email.reservations}`}>{site.email.reservations}</a> or call{" "}
          <a className="underline" href={site.phone.href}>{site.phone.display}</a>.
        </p>
        <button type="button" onClick={() => setSent(false)} className="link-line t-nav mt-6">
          Edit enquiry <span className="arrow">→</span>
        </button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
      {Input({ k: "name", labelText: "Name", autoComplete: "name", required: true })}
      {Input({ k: "email", labelText: "Email", type: "email", autoComplete: "email", required: true })}
      {Input({ k: "phone", labelText: "Telephone (optional)", type: "tel", autoComplete: "tel" })}
      <div className="relative">
        <select id="f-type" value={f.type} onChange={set("type")} className={`${field} appearance-none`}>
          {TYPES.map((t) => (
            <option key={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
        <label htmlFor="f-type" className={label}>
          Event type
        </label>
      </div>
      {Input({ k: "date", labelText: "Preferred date", type: "date", required: true })}
      {Input({ k: "guests", labelText: "Number of guests", type: "number", min: 1, inputMode: "numeric", required: true })}
      <div className="relative sm:col-span-2">
        <textarea id="f-message" rows={4} value={f.message} onChange={set("message")} className={`${field} resize-none`} placeholder="Additional information" />
        <label htmlFor="f-message" className={label}>
          Additional information
        </label>
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs text-muted">
          The Peacock Room seats up to {site.privateDining.capacity}. For larger groups, ask about exclusive hire of the restaurant.
        </p>
        <button type="submit" className="btn btn-solid t-nav">
          Send enquiry <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
}

import { useEffect, useRef, useState } from "react";
import { locales, getLocale } from "./locales.js";

export default function LanguageSelector({ locale, label }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const pendingFocus = useRef(null);
  const panelId = "landing-language-menu";
  const current = getLocale(locale);

  useEffect(() => {
    if (!open) return;
    if (pendingFocus.current !== null) {
      containerRef.current.querySelectorAll("a")[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  function onKeyDown(event) {
    const links = [...containerRef.current.querySelectorAll("a")];
    const index = links.indexOf(document.activeElement);
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      const next = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1
        : event.key === "ArrowDown" ? (index + 1) % links.length
        : index < 0 ? links.length - 1 : (index - 1 + links.length) % links.length;
      if (open) links[next]?.focus();
      else pendingFocus.current = next;
    }
  }

  return (
    <div ref={containerRef} className="relative shrink-0" onKeyDown={onKeyDown}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={buttonRef} type="button" aria-label={`${label}: ${current.name}`} aria-expanded={open}
        aria-controls={panelId} onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white/80 px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/></svg>
        <span lang={current.lang} className="hidden lg:inline">{current.name}</span>
        <span className="uppercase lg:hidden">{current.lang}</span>
        <span aria-hidden="true">▾</span>
      </button>
      <nav id={panelId} aria-label={label} hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
        {locales.map((item) => (
          <a key={item.code} href={item.path} hrefLang={item.lang} lang={item.lang}
            aria-current={item.code === current.code ? "page" : undefined}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm focus-visible:outline-blue-600 ${item.code === current.code ? "bg-blue-50 font-semibold text-blue-800" : "text-slate-700 hover:bg-slate-100"}`}>
            {item.name}{item.code === current.code && <span aria-hidden="true">✓</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}

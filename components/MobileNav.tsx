"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MobileNavProps = {
  items: ReadonlyArray<{ href: string; label: string }>;
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (isOpen) firstLinkRef.current?.focus();
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <div className="flex h-[14vh] min-h-24 max-h-29.5 items-center justify-between px-[9vw]">
        <Link href="/" aria-label="Ir al inicio de NOVACAD" onClick={() => setIsOpen(false)} className="ml-2">
          <Image
            src="/images/logo-novacad.webp"
            alt="NOVACAD Laboratorios y Depósitos"
            width={300}
            height={58}
            priority
            className="h-[7vh] min-h-12.5 max-h-15 w-auto"
          />
        </Link>
        <button
          type="button"
          ref={buttonRef}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className={`flex size-15 items-center justify-center text-2xl text-white transition-colors ${
            isOpen ? "bg-brand-blue" : "bg-brand-cyan"
          }`}
        >
          <span aria-hidden="true" className="flex w-4 flex-col gap-0.75">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>
      </div>
      {isOpen ? (
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-b border-brand-blue bg-white">
          <ul className="flex h-75 flex-col items-center justify-around py-2">
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-2 text-[17px] hover:underline hover:underline-offset-4 ${
                    index === 0
                      ? "font-semibold text-brand-blue underline underline-offset-4"
                      : "text-black hover:text-brand-blue"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

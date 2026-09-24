"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type MobileNavProps = {
  items: ReadonlyArray<{ href: string; label: string }>;
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="lg:hidden">
      <div className="flex h-[14vh] min-h-24 max-h-[118px] items-center justify-between px-[9vw]">
        <Link href="#inicio" aria-label="Ir al inicio de NOVACAD" onClick={() => setIsOpen(false)} className="ml-2">
          <Image
            src="/images/n-logo-novacad.png"
            alt="NOVACAD Laboratorios y Depósitos"
            width={300}
            height={58}
            priority
            className="h-[7vh] min-h-[50px] max-h-[60px] w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className={`flex size-[60px] items-center justify-center text-2xl text-white transition-colors ${
            isOpen ? "bg-[#c8c8c8]" : "bg-brand-cyan"
          }`}
        >
          <span aria-hidden className="flex w-4 flex-col gap-[3px]">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>
      </div>
      {isOpen ? (
        <nav id="mobile-navigation" aria-label="Navegación móvil" className="border-b border-brand-blue bg-white">
          <ul className="flex h-[300px] flex-col items-center justify-around py-2">
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-2 text-[17px] ${index === 0 ? "text-[#087cff]" : "text-black"}`}
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

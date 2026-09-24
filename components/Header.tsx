import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

export const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="relative z-50 bg-white">
      <div className="hidden h-[14vh] min-h-24 max-h-30.5 items-center justify-between border-b-2 border-brand-blue px-[7vw] lg:flex">
        <Link href="#inicio" aria-label="Ir al inicio de NOVACAD">
          <Image
            src="/images/n-logo-novacad.png"
            alt="NOVACAD Laboratorios y Depósitos"
            width={300}
            height={58}
            priority
            className="h-auto w-50 2xl:w-78.5"
          />
        </Link>
        <nav aria-label="Navegación principal" className="flex items-center gap-1">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={
                index === 0
                  ? "rounded-[10px] bg-brand-cyan px-4 py-2.5 text-base font-normal text-white 2xl:text-[23px]"
                  : "rounded-[10px] px-4 py-2.5 text-base font-medium text-black transition-colors hover:text-brand-blue 2xl:text-[23px]"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <MobileNav items={navItems} />
    </header>
  );
}

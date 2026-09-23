import Link from "next/link";

const nav = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#gallery", label: "Galería" },
  { href: "#testimonials", label: "Testimonios" },
  { href: "#contact", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur dark:border-zinc-900 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#" className="text-sm font-bold tracking-[0.2em] text-zinc-900 dark:text-white">
          NOVACAD
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Cotizar
        </a>
      </div>
    </header>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white py-10 dark:border-zinc-900 dark:bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-zinc-900 dark:text-white">NOVACAD</p>
          <p className="mt-1 text-xs text-zinc-500">© {new Date().getFullYear()} NOVACAD. Arquitectura y construcción.</p>
        </div>
        <div className="flex gap-6 text-xs tracking-widest text-zinc-500">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
            INSTAGRAM
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
            BEHANCE
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}

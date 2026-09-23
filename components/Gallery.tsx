const items = [
  { id: 1, title: "Casa Patio", span: "md:col-span-2" },
  { id: 2, title: "Loft Urbano", span: "" },
  { id: 3, title: "Local Palermo", span: "" },
  { id: 4, title: "Casa Bosque", span: "md:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-zinc-50 py-20 dark:bg-zinc-950 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">GALERÍA</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Obras seleccionadas</h2>
          </div>
          <a href="#contact" className="hidden text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-white md:block">
            Solicitar portfolio completo →
          </a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white dark:bg-black ${item.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800" />
              <div className="absolute inset-0 bg-zinc-900/0 transition-colors group-hover:bg-zinc-900/5 dark:group-hover:bg-white/5" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-900 dark:bg-zinc-900 dark:text-white">
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500 md:hidden">
          Imágenes en <code className="rounded bg-white px-1 py-0.5 dark:bg-black">public/images/</code>
        </p>
      </div>
    </section>
  );
}

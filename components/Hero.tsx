export default function Hero() {
  return (
    <section id="hero" className="bg-white dark:bg-black">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">ESTUDIO · NOVACAD 2026</p>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Arquitectura que <span className="text-zinc-400">transforma</span> espacios
          </h1>
          <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Diseñamos y construimos proyectos residenciales y comerciales con foco en funcionalidad, luz y materiales nobles.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#contact"
              className="rounded-full bg-zinc-900 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black"
            >
              Iniciar proyecto
            </a>
            <a
              href="#gallery"
              className="rounded-full border border-zinc-200 px-7 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
            >
              Ver obras
            </a>
          </div>
        </div>
        <div className="relative flex items-center">
          <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 p-8 dark:bg-zinc-900">
            <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-black">
              <span className="text-xs tracking-widest text-zinc-400">PLANO · PREVIEW</span>
              <div className="space-y-3">
                <div className="h-2 w-3/4 rounded bg-zinc-900 dark:bg-white" />
                <div className="h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="aspect-square rounded bg-zinc-100 dark:bg-zinc-900" />
                  <div className="aspect-square rounded bg-zinc-900 dark:bg-white" />
                  <div className="aspect-square rounded bg-zinc-100 dark:bg-zinc-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 dark:bg-black md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">TESTIMONIOS</p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Quienes confiaron en NOVACAD
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-900 dark:bg-zinc-950">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">“{t.content}”</blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

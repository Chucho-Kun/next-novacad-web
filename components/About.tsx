export default function About() {
  return (
    <section id="about" className="border-t border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">SOBRE NOSOTROS</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Estudio con base técnica y mirada contemporánea
          </h2>
        </div>
        <div className="space-y-6 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
          <p>
            En NOVACAD acompañamos cada proyecto de principio a fin: del anteproyecto a la entrega final. Creemos en una
            arquitectura honesta, eficiente y duradera.
          </p>
          <p>
            Nuestro equipo integra arquitectos, técnicos y proveedores locales para garantizar calidad constructiva, control de
            costos y cumplimiento de plazos.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-white">120+</p>
              <p className="text-xs tracking-widest text-zinc-500">PROYECTOS</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-white">12</p>
              <p className="text-xs tracking-widest text-zinc-500">AÑOS</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-white">98%</p>
              <p className="text-xs tracking-widest text-zinc-500">SATISFACCIÓN</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

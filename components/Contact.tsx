export default function Contact() {
  return (
    <section id="contact" className="bg-zinc-900 py-20 text-white dark:bg-zinc-950 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">CONTACTO</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Hablemos de tu proyecto</h2>
          <p className="mt-4 max-w-md leading-7 text-zinc-400">
            Contanos tu idea, medidas aproximadas y presupuesto estimado. Respondemos en menos de 24 horas.
          </p>
          <div className="mt-8 space-y-3 text-sm text-zinc-300">
            <p>📍 Av. Ejemplo 1234, CABA — Buenos Aires</p>
            <p>✉️ hola@novacad.com.ar</p>
            <p>📞 +54 11 5555-0000</p>
          </div>
        </div>
        <form className="space-y-4 rounded-2xl bg-white p-6 text-zinc-900 dark:bg-zinc-900 dark:text-white">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-medium tracking-widest text-zinc-500">NOMBRE</span>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-black dark:focus:border-white"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-medium tracking-widest text-zinc-500">EMAIL</span>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-black dark:focus:border-white"
              />
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-xs font-medium tracking-widest text-zinc-500">MENSAJE</span>
            <textarea
              rows={4}
              placeholder="Contanos sobre tu proyecto..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-black dark:focus:border-white"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Enviar consulta
          </button>
          <p className="text-center text-xs text-zinc-500">Respuesta garantizada en 24h hábiles.</p>
        </form>
      </div>
    </section>
  );
}

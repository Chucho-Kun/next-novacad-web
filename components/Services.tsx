import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 dark:bg-black md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-zinc-400">SERVICIOS</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Soluciones integrales para cada etapa
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Desde la idea inicial hasta la obra terminada.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-900 dark:bg-zinc-950"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm dark:bg-zinc-900 dark:text-white">
                {service.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

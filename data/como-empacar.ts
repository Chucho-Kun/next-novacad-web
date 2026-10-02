export type ComoEmpacarStep = {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
  note?: string;
  icon: string;
  iconAlt: string;
};

export const comoEmpacarSteps: ComoEmpacarStep[] = [
  {
    id: "desinfectar",
    title: "Desinfectar todos los materiales",
    body: [
      "Incluidos en la caja y envolver cada modelo con papel burbuja o relleno espuma para evitar que estos se dañen.",
    ],
    icon: "/images/como-empacar/paso-1-icono.png",
    iconAlt: "Icono de desinfección de materiales",
  },
  {
    id: "si-se-envian",
    title: "Si se envían:",
    body: [
      "Colocarlos en bolsas por separado o en un recipiente pequeño dentro de la caja.",
    ],
    bullets: [
      "Coronas sueltas.",
      "Puentes.",
      "Implantes.",
      "Aditamentos.",
    ],
    icon: "/images/como-empacar/paso-2-icono.png",
    iconAlt: "Icono de coronas, puentes e implantes en bolsas",
  },
  {
    id: "impresiones-alginato",
    title:
      "Enviar las impresiones de alginato en corridas de yeso Tipo II antagonistas o Tipo IV modelos de trabajo.",
    body: [],
    note: "Preferentemente arcadas completas.",
    icon: "/images/como-empacar/paso-3-icono.png",
    iconAlt: "Icono de caja con impresiones dentales",
  },
  {
    id: "fotos-mapeos",
    title: "Fotografías y mapeos de color",
    body: [
      "Se recomienda que las fotografías y los mapeos de color se agreguen a nuestra plataforma en Vevi Dental.",
    ],
    icon: "/images/como-empacar/paso-4-icono.png",
    iconAlt: "Icono de fotografías y mapeos de color",
  },
  {
    id: "mas-de-un-caso",
    title: "Si se envía más de un caso,",
    body: [
      "Separar las cajas para cada uno, con sus respectivas indicaciones.",
    ],
    icon: "/images/como-empacar/paso-5-icono.png",
    iconAlt: "Icono de varias cajas para casos dentales",
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    id: "diseno",
    title: "Diseño Arquitectónico",
    description: "Proyectos a medida con enfoque funcional y estético para vivienda y comercio.",
    icon: "▦",
  },
  {
    id: "remodelacion",
    title: "Remodelación",
    description: "Transformamos espacios existentes maximizando luz, circulación y materiales.",
    icon: "⬡",
  },
  {
    id: "obra",
    title: "Dirección de Obra",
    description: "Supervisión técnica integral, control de presupuesto y tiempos de entrega.",
    icon: "⬔",
  },
  {
    id: "asesoria",
    title: "Asesoría Técnica",
    description: "Factibilidad, normativa y anteproyectos para tomar decisiones informadas.",
    icon: "◎",
  },
];

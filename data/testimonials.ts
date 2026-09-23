export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    role: "Propietaria — Vivienda unifamiliar",
    content: "NOVACAD entendió perfecto lo que queríamos. La obra se entregó en tiempo y el resultado superó nuestras expectativas.",
    rating: 5,
  },
  {
    id: "2",
    name: "Javier Ruiz",
    role: "Gerente — Local comercial",
    content: "Profesionales, claros con los costos y muy atentos a los detalles. El local quedó impecable.",
    rating: 5,
  },
  {
    id: "3",
    name: "Lucía Fernández",
    role: "Cliente — Remodelación integral",
    content: "La comunicación durante toda la remodelación fue excelente. Recomiendo totalmente al equipo.",
    rating: 5,
  },
];

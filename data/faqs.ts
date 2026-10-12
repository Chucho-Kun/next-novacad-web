export type FaqEntry = {
  question: string;
  answer: string;
};

// Fuente de la sección FAQ del home y del `FAQPage` JSON-LD en `app/page.tsx`.
// Redacción en es-MX, orientada a odontólogos (B2B). El usuario las corrige
// al revisar el diff antes del merge (compuerta SPEC 11, paso 7).
export const faqs: FaqEntry[] = [
  {
    question: "¿Qué es una corona de zirconia y cuándo conviene indicarla?",
    answer:
      "La corona de zirconia es una restauración cerámica libre de metal de alta resistencia (1400 MPa), biocompatible y de apariencia natural. Es ideal para coronas unitarias, puentes, incrustaciones y prótesis sobre implantes, sobre todo en el sector posterior donde la carga masticatoria es mayor. En NOVACAD las fabricamos con sistema CAD/CAM para lograr un ajuste marginal preciso.",
  },
  {
    question: "¿Cuál es la diferencia entre zirconia y E-max?",
    answer:
      "El E-max es una cerámica de disilicato de litio (470 MPa) con translucidez muy parecida al diente natural, por lo que brilla en el sector anterior: carillas, coronas y puentes cortos donde la estética es la prioridad. La zirconia, en cambio, ofrece mayor resistencia mecánica y es mejor opción para puentes extensos, rehabilitación posterior y casos sobre implantes. Si tienes dudas con un caso concreto, envíanoslo y te orientamos sin costo.",
  },
  {
    question: "¿Cómo envío mi caso al laboratorio NOVACAD?",
    answer:
      "Puedes enviarnos tu escaneo intraoral o tus modelos físicos junto con la orden de trabajo descargable de nuestro sitio. Coordinamos la recepción por WhatsApp al 56 6268 2487, donde también resolvemos dudas sobre el caso antes de iniciar la fabricación. Trabajamos con odontólogos de Ecatepec, CDMX y el Estado de México.",
  },
  {
    question: "¿Cuánto tarda la fabricación de una prótesis dental?",
    answer:
      "Los tiempos dependen del material, del tipo de restauración y de la carga de trabajo del laboratorio. Las provisionales de PMMA y los casos digitales suelen fluir más rápido que las rehabilitaciones extensas de zirconia o E-max. Escríbenos por WhatsApp con los detalles de tu caso y te confirmamos el tiempo estimado de entrega.",
  },
  {
    question: "¿Atienden a odontólogos fuera de Ecatepec?",
    answer:
      "Sí. Nuestro laboratorio está en Ecatepec de Morelos, Estado de México, y colaboramos a diario con odontólogos de CDMX y de todo el Estado de México. Recibimos archivos digitales por medios electrónicos y coordinamos la logística de modelos físicos y entregas por WhatsApp.",
  },
  {
    question: "¿Qué incluye el diseño de sonrisa digital y el mock-up?",
    answer:
      "El diseño de sonrisa es una planificación estética digital donde analizamos forma, proporción y color de los dientes en relación con el rostro del paciente. El mock-up lleva ese diseño a la boca con una simulación provisional, para que el paciente visualice el resultado y apruebe el plan antes de las restauraciones definitivas. Ambos servicios reducen ajustes y retrabajos en clínica.",
  },
  {
    question: "¿Fabrican guardas oclusales y alineadores?",
    answer:
      "Sí. Fabricamos guardas oclusales personalizadas para bruxismo, desgaste severo y protección de rehabilitaciones protésicas, con adaptación precisa a partir de registros digitales o modelos físicos. También elaboramos el sistema de alineadores transparentes Novaligner para correcciones de apiñamiento leve a moderado, con planificación digital aprobada por el odontólogo.",
  },
];

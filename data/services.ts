export type ServiceItem = {
  slug: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  intro: string[];
  categories: string[];
  tags: string[];
  idealForTitle: string;
  idealFor: string[];
  featuresTitle: string;
  features: string[];
  metaTitle: string;
  metaDescription: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "protesis-fija",
    title: "Prótesis fijas",
    items: [
      {
        slug: "zirconia",
        title: "Zirconia",
        href: "/servicios/zirconia",
        image: "/images/zirconia.jpg",
        alt: "Prótesis dental de zirconia",
        intro: [
          "La zirconia es un material cerámico de alta resistencia utilizado en odontología para la fabricación de restauraciones estéticas y funcionales.",
          "Se caracteriza por su excelente durabilidad, biocompatibilidad y apariencia natural.",
        ],
        categories: ["Prótesis Dental Fija", "Zirconia dental"],
        tags: ["Zirconia dental", "corona de zirconia", "Puente de zirconia", "Incrustación de zirconia"],
        idealForTitle: "Gracias a su resistencia mecánica, la zirconia es ideal para:",
        idealFor: [
          "Coronas",
          "Puentes",
          "Incrustaciones",
          "Prótesis sobre implantes",
          "Núcleos para prótesis estratificadas",
        ],
        featuresTitle: "CARACTERÍSTICAS",
        features: [
          "Resistencia de 1400 MPa (mega pascales)",
          "Sistema CAD/CAM",
          "Libre de metal. Alta estética y resistencia",
          "Excelente adaptación marginal y estabilidad a largo plazo",
        ],
        metaTitle: "Zirconia | NOVACAD Laboratorio Dental",
        metaDescription:
          "Restauraciones de zirconia de alta resistencia, biocompatibles y estéticas. Sistema CAD/CAM libre de metal para coronas, puentes e implantes.",
      },
      {
        slug: "e-max",
        title: "E-Max",
        href: "/servicios/e-max",
        image: "/images/emax.jpg",
        alt: "Restauración dental E-Max",
        intro: [
          "E-max es una cerámica de disilicato de litio altamente estética, ideal para restauraciones donde la naturalidad y la translucidez son prioritarias.",
          "Su composición permite una excelente integración con el color dental, logrando resultados altamente estéticos en el sector anterior.",
        ],
        categories: ["Prótesis Dental Fija", "E-Max"],
        tags: ["Disilicato de litio", "E-Max dental", "Laboratorio Dental E-max"],
        idealForTitle: "Se utiliza principalmente en:",
        idealFor: ["Coronas", "Carillas", "Puentes", "Incrustaciones", "Prótesis sobre implantes"],
        featuresTitle: "CARACTERÍSTICAS",
        features: [
          "Alta resistencia a la flexión biaxial de 470 MPa",
          "Alta tenacidad a la fractura de 2,5 MPa m1/2",
          "Sistema CAD/CAM. Máxima estética y naturalidad",
          "Excelente adaptación marginal y comportamiento clínico confiable a largo plazo",
        ],
        metaTitle: "E-Max | NOVACAD Laboratorio Dental",
        metaDescription:
          "Cerámica E-max de disilicato de litio para coronas, carillas y puentes con translucidez natural y alta estética en sector anterior.",
      },
    ],
  },
  {
    slug: "protesis-provisional",
    title: "Prótesis Provisional",
    items: [
      {
        slug: "pmma",
        title: "PMMA",
        href: "/servicios/pmma",
        image: "/images/pmma.jpg",
        alt: "Prótesis provisional dental de PMMA",
        intro: [
          "El PMMA (polimetilmetacrilato) es un material acrílico de alta calidad utilizado principalmente para restauraciones provisionales en odontología.",
          "Se caracteriza por su ligereza, buena estabilidad y excelente comportamiento durante el periodo de transición hacia la restauración definitiva.",
        ],
        categories: ["Prótesis Dental Provisional", "PMMA"],
        tags: ["PMMA dental", "polimetilmetacrilato", "laboratorio dental pmma"],
        idealForTitle: "Es ideal para:",
        idealFor: [
          "Coronas provisionales",
          "Puentes provisionales",
          "Prótesis provisionales sobre implantes",
          "Provisionales de larga duración",
          "Mock-ups y pruebas estéticas",
        ],
        featuresTitle: "CARACTERÍSTICAS",
        features: [
          "Buena resistencia de 84 MPa",
          "Sistema CAD/CAM",
          "Solución provisional precisa",
          "Alta estabilidad al entorno bucal",
          "Excelente estética",
        ],
        metaTitle: "PMMA | NOVACAD Laboratorio Dental",
        metaDescription:
          "Provisionales de PMMA fresado CAD/CAM: ligeros, precisos y estéticos para coronas, puentes e implantes durante la transición al definitivo.",
      },
      {
        slug: "resina-hibrida",
        title: "Resina Híbrida",
        href: "/servicios/resina-hibrida",
        image: "/images/resina-provisional.jpg",
        alt: "Prótesis provisional de resina híbrida",
        intro: [
          "La resina híbrida es un material restaurador de última generación que combina una matriz resinosa con partículas cerámicas, logrando un equilibrio ideal entre resistencia, flexibilidad y estética.",
          "Ofrece restauraciones altamente estéticas con excelente absorción de fuerzas masticatorias.",
        ],
        categories: ["Prótesis Dental Provisional", "Resina Híbrida"],
        tags: ["Resina hibrida dental", "laboratorio dental resina híbrida"],
        idealForTitle: "Se utiliza en:",
        idealFor: [
          "Coronas",
          "Coronas sobre implantes",
          "Incrustaciones",
          "Restauraciones en sectores posteriores",
          "Casos donde se requiere absorción de carga",
        ],
        featuresTitle: "CARACTERÍSTICAS",
        features: [
          "Buena resistencia de 120 MPa",
          "Sistema CAD/CAM",
          "Ideal para impresión 3D",
          "Excelente biocompatibilidad",
          "Estética natural",
          "Restauraciones duraderas",
        ],
        metaTitle: "Resina Híbrida | NOVACAD Laboratorio Dental",
        metaDescription:
          "Resina híbrida CAD/CAM con matriz resinosa y partículas cerámicas: flexibilidad, absorción de carga y estética para sectores posteriores.",
      },
    ],
  },
  {
    slug: "diseno-cad-cam",
    title: "Diseño CAD CAM",
    items: [
      {
        slug: "diseno-de-sonrisa",
        title: "Diseño de Sonrisa",
        href: "/servicios/diseno-de-sonrisa",
        image: "/images/diseno-de-sonrisa.jpg",
        alt: "Planificación digital para diseño de sonrisa",
        intro: [
          "El Diseño de Sonrisa es un proceso de planificación estética en el que se analiza, proyecta y armoniza la forma, proporción y color de los dientes en relación con el rostro del paciente.",
          "Por medio de herramientas digitales y análisis facial, se desarrolla una propuesta personalizada que permite al odontólogo visualizar el resultado antes de realizar el tratamiento definitivo.",
        ],
        categories: ["Diseño de Sonrisa"],
        tags: ["Diseño de sonrisa", "laboratorio dental"],
        idealForTitle: "¿Por qué se utiliza?",
        idealFor: [
          "Planificación para tratamientos estéticos",
          "Para mejorar la comunicación entre odontólogo y paciente",
          "Para visualizar el resultado antes de iniciar el procedimiento",
          "Para reducir ajustes y correcciones posteriores",
        ],
        featuresTitle: "BENEFICIOS",
        features: [
          "Corrección de mordida",
          "Mejorar la posición de los dientes",
          "Restauración de músculos labiales",
          "Simetría dental",
          "Sonrisa funcional, armónica y natural",
        ],
        metaTitle: "Diseño de Sonrisa | NOVACAD Laboratorio Dental",
        metaDescription:
          "Planificación digital de sonrisa: análisis facial y propuesta estética personalizada para visualizar el resultado antes del tratamiento definitivo.",
      },
      {
        slug: "mock-up",
        title: "Mock up",
        href: "/servicios/mock-up",
        image: "/images/mock-up.jpg",
        alt: "Mock up para tratamiento dental estético",
        intro: [
          "El mock-up dental es una simulación provisional que permite visualizar directamente en boca el resultado estético de un tratamiento antes de realizar las restauraciones definitivas.",
          "Se basa en el diseño previamente aprobado y se transfiere a la boca del paciente para evaluar forma, proporción y armonía facial en tiempo real.",
        ],
        categories: ["Mockup Dental"],
        tags: ["Mockup", "laboratorio dental mockup"],
        idealForTitle: "¿Cuándo se utiliza?",
        idealFor: [
          "En casos de diseño de sonrisa",
          "Antes de realizar carillas o coronas anteriores",
          "En rehabilitaciones estéticas",
          "Para validar cambios de forma o longitud dental",
          "Cuando el paciente desea visualizar el resultado antes de iniciar el tratamiento definitivo",
        ],
        featuresTitle: "VENTAJAS",
        features: [
          "Facilita la aprobación del plan de tratamiento",
          "Reduce retrabajos",
          "Mejora la comunicación laboratorio-clínica",
          "Permite ajustes antes de la fase definitiva",
        ],
        metaTitle: "Mock up | NOVACAD Laboratorio Dental",
        metaDescription:
          "Mock-up dental: simulación provisional en boca para validar forma, proporción y armonía facial antes de las restauraciones definitivas.",
      },
    ],
  },
  {
    slug: "otros",
    title: "Otros",
    items: [
      {
        slug: "alineadores",
        title: "Alineadores",
        href: "/servicios/alineadores",
        image: "/images/Otros-Alineadores.jpg",
        alt: "Alineadores dentales transparentes",
        intro: [
          "Los alineadores dentales son dispositivos transparentes removibles diseñados para corregir la posición dental de manera progresiva y controlada.",
          "A través de planificación digital y movimientos graduales, se realizan tratamientos de ortodoncia con precisión y estética. El proceso incluye el diseño digital y la fabricación de las férulas alineadoras según el proceso aprobado por el odontólogo.",
        ],
        categories: ["Alineadores Dentales"],
        tags: ["Alineador Dental", "laboratorio dental", "alineadores dentales"],
        idealForTitle: "¿Cuándo se utilizan?",
        idealFor: [
          "Corrección de apiñamiento leve a moderado",
          "Corrección de problemas menores de espacios interdentales",
          "Correcciones estéticas en adultos",
          "Casos donde se busca una alternativa más estética a la ortodoncia tradicional",
        ],
        featuresTitle: "VENTAJAS",
        features: ["Invisibles y estéticos", "Máxima comodidad", "Fáciles de usar", "Tratamiento eficaz"],
        metaTitle: "Alineadores | NOVACAD Laboratorio Dental",
        metaDescription:
          "Alineadores transparentes removibles: corrección progresiva de apiñamiento y espacios con planificación digital y máxima discreción.",
      },
      {
        slug: "guardas-oclusales",
        title: "Guardas",
        href: "/servicios/guardas-oclusales",
        image: "/images/guarda.jpg",
        alt: "Guarda oclusal dental",
        intro: [
          "Las guardas oclusales son dispositivos removibles diseñados para proteger las estructuras dentales frente al desgaste, fuerzas excesivas o hábitos como el bruxismo.",
          "Fabricadas a partir de registros digitales o modelos físicos, permiten una adaptación precisa y cómoda, ayudando a preservar la salud dental y articular del paciente.",
        ],
        categories: ["Guardas Dentales", "Guardas Oclusales"],
        tags: ["Guardas dentales", "laboratorio dental guardas"],
        idealForTitle: "¿Cuándo se utilizan?",
        idealFor: [
          "Pacientes con bruxismo",
          "Desgaste dental severo - Dolor o fatiga muscular",
          "Protección posterior a rehabilitaciones protésicas",
          "Tratamientos de estabilidad oclusal",
          "Protección de restauraciones en pacientes con alta carga masticatoria",
        ],
        featuresTitle: "VENTAJAS",
        features: [
          "Protección dental",
          "Protección de restauraciones",
          "Disminución de tensión muscular",
          "Estabilidad oclusal",
          "Ajuste personalizado",
          "Previsión a largo plazo",
        ],
        metaTitle: "Guardas Oclusales | NOVACAD Laboratorio Dental",
        metaDescription:
          "Guardas oclusales digitales para bruxismo y protección protésica: adaptación precisa, estabilidad oclusal y prevención del desgaste dental.",
      },
      {
        slug: "guias-quirurgicas",
        title: "Guías quirúrgicas",
        href: "/servicios/guias-quirurgicas",
        image: "/images/guia.jpg",
        alt: "Guía quirúrgica dental personalizada",
        intro: [
          "Las guías quirúrgicas dentales son dispositivos personalizados diseñados para dirigir con precisión la colocación de implantes dentales según una planificación digital previa.",
          "Se fabrican a partir de estudios tomográficos y escaneos intraorales, integrando información anatómica y protésica para garantizar una cirugía más precisa, segura y predecible.",
        ],
        categories: ["Guías Quirúrgicas", "Guías Quirúrgicas Dentales"],
        tags: ["guías quirúrgicas", "laboratorio dental guías"],
        idealForTitle: "¿Cuándo se utilizan?",
        idealFor: [
          "Colocación de implantes unitarios o múltiples",
          "Rehabilitaciones completas sobre implantes",
          "Casos de carga inmediata",
          "Pacientes con limitaciones anatómicas (proximidad a seno maxilar o nervio dentario)",
          "Procedimientos donde se busca cirugía mínimamente invasiva",
        ],
        featuresTitle: "VENTAJAS",
        features: ["Precisión milimétrica", "Mayor seguridad", "Mejor resultado protésico"],
        metaTitle: "Guías Quirúrgicas | NOVACAD Laboratorio Dental",
        metaDescription:
          "Guías quirúrgicas personalizadas para implantes: planificación tomográfica y precisión milimétrica en posición, angulación y profundidad.",
      },
    ],
  },
];

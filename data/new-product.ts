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

export const newProduct: ServiceCategory[] = [
  {
    slug: "protesis-fija",
    title: "Resina Híbrida - Protesis Permanente",
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
  }
];

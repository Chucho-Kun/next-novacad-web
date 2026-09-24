export type ServiceItem = {
  slug: string;
  title: string;
  href: string;
  image: string;
  alt: string;
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
      },
      {
        slug: "e-max",
        title: "E-Max",
        href: "/servicios/e-max",
        image: "/images/emax.jpg",
        alt: "Restauración dental E-Max",
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
      },
      {
        slug: "resina-hibrida",
        title: "Resina Híbrida",
        href: "/servicios/resina-hibrida",
        image: "/images/resina-provisional.jpg",
        alt: "Prótesis provisional de resina híbrida",
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
      },
      {
        slug: "mock-up",
        title: "Mock up",
        href: "/servicios/mock-up",
        image: "/images/mock-up.jpg",
        alt: "Mock up para tratamiento dental estético",
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
      },
      {
        slug: "guardas-oclusales",
        title: "Guardas",
        href: "/servicios/guardas-oclusales",
        image: "/images/guarda.jpg",
        alt: "Guarda oclusal dental",
      },
      {
        slug: "guias-quirurgicas",
        title: "Guías quirúrgicas",
        href: "/servicios/guias-quirurgicas",
        image: "/images/guia.jpg",
        alt: "Guía quirúrgica dental personalizada",
      },
    ],
  },
];

export const categories = ["camas", "comedores", "salas", "camarotes", "nocheros"] as const;

export type Category = typeof categories[number];

export interface CategoryInfo {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const categoryInfo: Record<Category, CategoryInfo> = {
  camas: {
    title: "Camas",
    subtitle: "Descansa como mereces",
    description: "Camas para todos los gustos y necesidades, con materiales de alta calidad.",
    image: "/landing/assets/categories/camas.png",
  },
  comedores: {
    title: "Comedores",
    subtitle: "El lugar donde nacen los mejores momentos",
    description: "Nuestros comedores combinan diseño y resistencia para que disfrutes cada comida con estilo y comodidad.",
    image: "/landing/assets/categories/comedores.png",
  },
  salas: {
    title: "Salas",
    subtitle: "El corazón de tu hogar",
    description: "Encuentra salas modernas y cómodas para compartir en familia.",
    image: "/landing/assets/categories/salas.png",
  },
  camarotes: {
    title: "Camarotes",
    subtitle: "Aprovecha el espacio con estilo",
    description: "Camarotes seguros y funcionales para habitaciones compartidas.",
    image: "/landing/assets/categories/camarotes.png",
  },
  nocheros: {
    title: "Nocheros",
    subtitle: "Funcionalidad junto a tu cama",
    description: "Nocheros elegantes y prácticos para mantener todo a tu alcance.",
    image: "/landing/assets/categories/nocheros.png",
  },
};

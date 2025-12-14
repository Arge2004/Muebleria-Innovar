export const categories = ["salas", "comedores", "camas", "camarotes"] as const;

export type Category = typeof categories[number];

export interface CategoryInfo {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const categoryInfo: Record<Category, CategoryInfo> = {
  salas: {
    title: "Salas",
    subtitle: "El corazón de tu hogar",
    description: "Encuentra salas modernas y cómodas para compartir en familia.",
    image: "/landing/assets/categories/salas.png",
  },
  comedores: {
    title: "Comedores",
    subtitle: "El lugar donde nacen los mejores momentos",
    description: "Nuestros comedores combinan diseño y resistencia para que disfrutes cada comida con estilo y comodidad.",
    image: "/landing/assets/categories/comedores.png",
  },
  camas: {
    title: "Camas",
    subtitle: "Descansa como mereces",
    description: "Camas para todos los gustos y necesidades, con materiales de alta calidad.",
    image: "/landing/assets/categories/camas.png",
  },
  camarotes: {
    title: "Camarotes",
    subtitle: "Aprovecha el espacio con estilo",
    description: "Camarotes seguros y funcionales para habitaciones compartidas.",
    image: "/landing/assets/categories/camarotes.png",
  },
};

export const categories = ["camas", "muebles", "comedores", "salas", "camarotes"] as const;

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
  muebles: {
    title: "Muebles",
    subtitle: "Diseño y funcionalidad para tu hogar",
    description: "Descubre nuestra colección de muebles con estilo único y calidad excepcional.",
    image: "/landing/assets/categories/muebles.png",
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
};

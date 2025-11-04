import camas from '@/app/landing/assets/categories/camas.png'
import comedores from '@/app/landing/assets/categories/comedores.png'
import salas from '@/app/landing/assets/categories/salas.png'
import camarotes from '@/app/landing/assets/categories/camarotes.png'

export interface Category {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  imageUrl: string
}

export const categories: Category[] = [
  {
    id: 'camas',
    title: 'Camas',
    subtitle: 'Descanso que transforma tus días',
    description: 'Camas diseñadas para brindarte confort y durabilidad, adaptadas a tu estilo y a tus espacios.',
    buttonText: 'Ver la categoría',
    imageUrl: camas.src // Reemplaza con tu ruta de imagen
  },
  {
    id: 'comedores',
    title: 'Comedores',
    subtitle: 'El lugar donde nacen los mejores momentos',
    description: 'Nuestros comedores combinan diseño y resistencia para que disfrutes cada comida con estilo y comodidad.',
    buttonText: 'Ver la categoría',
    imageUrl: comedores.src
  },
  {
    id: 'salas',
    title: 'Salas',
    subtitle: 'El corazón de tu hogar',
    description: 'Nuestras salas están diseñadas para combinar confort y estilo, creando espacios acogedores donde compartir, descansar y disfrutar en compañía.',
    buttonText: 'Ver la categoría',
    imageUrl: salas.src
  },
  {
    id: 'camarotes',
    title: 'Camarotes',
    subtitle: 'Más espacio, más momentos compartidos',
    description: 'Ideales para habitaciones juveniles o familiares, nuestros camarotes maximizan el espacio sin comprometer comodidad ni diseño.',
    buttonText: 'Ver la categoría',
    imageUrl: camarotes.src
  }
]

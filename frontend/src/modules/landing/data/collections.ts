import coleccion from '@/modules/landing/assets/coleccion.jpg'

export interface Collection {
  id: string
  title: string
  description: string
  buttonText: string
  imageUrl: string
}

export const collections: Collection[] = [
  {
    id: 'primavera',
    title: 'Colección Primavera',
    description: 'Renueva tus espacios con la frescura y el color de la temporada. Nuestra colección de primavera combina diseños modernos y tonos vibrantes que llenan tu hogar de vida, estilo y armonía.',
    buttonText: 'Comprar',
    imageUrl: coleccion.src
  }
]

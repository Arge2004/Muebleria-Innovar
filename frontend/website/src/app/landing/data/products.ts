import image1 from '@/app/landing/assets/muebles_mock/1.jpg'
import image2 from '@/app/landing/assets/muebles_mock/2.jpg'
import image3 from '@/app/landing/assets/muebles_mock/3.jpg'


export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  tag?: string
  category: string
  description?: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Sala Aquamarino',
    price: 2900.00,
    originalPrice: 3300.00,
    imageUrl: image1.src,
    tag: 'Oferta',
    category: 'salas',
    description: 'Elegante sala de diseño moderno con tapizado en terciopelo aquamarino. Perfecta para espacios contemporáneos.'
  },
  {
    id: '2',
    name: 'Comedor Imperial',
    price: 4500.00,
    imageUrl: image2.src,
    category: 'comedores',
    description: 'Comedor de 6 sillas con acabado en madera noble. Ideal para reuniones familiares.'
  },
  {
    id: '3',
    name: 'Cama King Size Deluxe',
    price: 5200.00,
    originalPrice: 6000.00,
    imageUrl: image3.src,   
    tag: 'Oferta',
    category: 'camas',
    description: 'Cama king size con cabecera tapizada en lino. Incluye base con almacenamiento.'
  },
  {
    id: '4',
    name: 'Camarote Juvenil Oslo',
    price: 3800.00,
    imageUrl: image1.src,   
    category: 'camarotes',
    description: 'Camarote de madera con diseño nórdico. Perfecto para habitaciones juveniles.'
  },
  {
    id: '5',
    name: 'Sala Seccional Roma',
    price: 6200.00,
    originalPrice: 7500.00,
    imageUrl: image2.src,
    tag: 'Oferta',
    category: 'salas',
    description: 'Sala seccional en forma de L con chaise lounge. Tapizado en tela premium.'
  },
  {
    id: '6',
    name: 'Comedor Minimalista Zen',
    price: 3900.00,
    imageUrl: image3.src,
    category: 'comedores',
    description: 'Comedor de líneas limpias con mesa extensible y 4 sillas de diseño minimalista.'
  },
   {
    id: '7',
    name: 'Sala Aquamarino',
    price: 2900.00,
    originalPrice: 3300.00,
    imageUrl: image1.src,   
    tag: 'Oferta',
    category: 'salas',
    description: 'Elegante sala de diseño moderno con tapizado en terciopelo aquamarino. Perfecta para espacios contemporáneos.'
  },
  {
    id: '8',
    name: 'Comedor Imperial',
    price: 4500.00,
    imageUrl: image2.src,
    category: 'comedores',
    description: 'Comedor de 6 sillas con acabado en madera noble. Ideal para reuniones familiares.'
  },
  {
    id: '9',
    name: 'Cama King Size Deluxe',
    price: 5200.00,
    originalPrice: 6000.00,
    imageUrl: image3.src,
    tag: 'Oferta',
    category: 'camas',
    description: 'Cama king size con cabecera tapizada en lino. Incluye base con almacenamiento.'
  },
  {
    id: '10',
    name: 'Camarote Juvenil Oslo',
    price: 3800.00,
    imageUrl: image1.src,
    category: 'camarotes',
    description: 'Camarote de madera con diseño nórdico. Perfecto para habitaciones juveniles.'
  },
  {
    id: '11',
    name: 'Sala Seccional Roma',
    price: 6200.00,
    originalPrice: 7500.00,
    imageUrl: image2.src,
    tag: 'Oferta',
    category: 'salas',
    description: 'Sala seccional en forma de L con chaise lounge. Tapizado en tela premium.'
  },
  {
    id: '12',
    name: 'Comedor Minimalista Zen',
    price: 3900.00,
    imageUrl: image3.src,
    category: 'comedores',
    description: 'Comedor de líneas limpias con mesa extensible y 4 sillas de diseño minimalista.'
  }
]


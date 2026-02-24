export interface Product {
  id: string
  categoria: string
  nombre: string
  descripcion: string
  price: number
  originalPrice?: number
  images: string[]
  tag?: string
  composicion: string[]
  materiales_calidad: string[]
  beneficios: string[]
  garantia: string[]
  personalizacion: string[]
}

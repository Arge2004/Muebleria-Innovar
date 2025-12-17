import React from 'react'
import CategoryCard from '@/modules/landing/components/categoryCard'
import { categories } from '@/modules/landing/data/categories'

export default function CategorySection() {
  return (
    <section className="w-full lg:py-[48px] lg:h-[calc(100vh)] mt-5 pt-6 px-2.5">
      <div className="w-full h-full flex flex-col">
        {/* Título de la sección */}
        <div className="text-center mb-4 flex-shrink-0 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold italic">
            Convierte cada espacio en tu hogar <br className="hidden sm:block" /> soñado con nuestros muebles exclusivos.
          </h2>
        </div>

        {/* Grid de categorías */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 gap-2.5 py-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              description={category.description}
              buttonText={category.buttonText}
              imageUrl={category.imageUrl}
              onButtonClick={() => {
                // Aquí puedes navegar a la página de la categoría
                console.log(`Navegar a categoría: ${category.id}`)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

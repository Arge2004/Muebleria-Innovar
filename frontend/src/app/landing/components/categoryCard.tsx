import React from 'react'
import Image from 'next/image'

interface CategoryCardProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  imageUrl: string
  onButtonClick?: () => void
}

export default function CategoryCard({
  title,
  subtitle,
  description,
  buttonText,
  imageUrl,
  onButtonClick
}: CategoryCardProps) {
  return (
    <article className="relative w-full min-h-[250px] sm:min-h-[200px] overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold tracking-tight">
              {title}
            </h2>

            {/* Barra vertical divider - solo visible en pantallas sm+ */}
            <div className="hidden sm:block w-1 h-12 bg-white mx-4"></div>

            {/* Subtitle */}
            <p className="italic text-base sm:text-base 2xl:text-lg 3xl:text-xl opacity-90 mt-1 sm:mt-0">
              &ldquo;{subtitle}&rdquo;
            </p>

          </div>
          {/* Description - solo visible en sm+ */}
          <p className="hidden sm:block text-xs sm:text-sm 2xl:text-base 3xl:text-lg leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Button */}
          <button
            onClick={onButtonClick}
            className="mt-2 sm:mt-4 bg-[#F0E9D4] 2xl:text-base 3xl:text-lg hover:cursor-pointer text-black font-medium rounded-xl hover:bg-[#E0D5C1] transition-colors duration-200 inline-block
            text-sm px-4 py-2 w-fit"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  )
}

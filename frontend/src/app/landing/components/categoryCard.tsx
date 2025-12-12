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
    <article className="relative w-full overflow-hidden group">
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
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="space-y-3">
          <div className="flex items-center">
            {/* Title */}
            <h2 className="text-3xl 2xl:text-5xl font-bold tracking-tight">
              {title}
            </h2>

            {/* Barra vertical divider */}
            <div className="w-1 h-12 bg-white mx-4"></div>

            {/* Subtitle */}
            <p className="italic 2xl:text-xl opacity-90">
              &ldquo;{subtitle}&rdquo;
            </p>

          </div>
          {/* Description */}
          <p className="text-sm 2xl:text-lg leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Button */}
          <button
            onClick={onButtonClick}
            className="mt-4 bg-[#F0E9D4] 2xl:text-lg hover:cursor-pointer text-black text-l font-medium rounded-xl hover:bg-[#E0D5C1] transition-colors duration-200 inline-block
            text-sm w-fit px-4 py-2"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  )
}

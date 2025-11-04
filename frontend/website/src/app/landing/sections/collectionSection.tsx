import React from 'react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import {collections} from '@/app/landing/data/collections'

export default function CollectionSection() {
  const { title, description, buttonText, imageUrl} = collections[0];
  return (
    <section className="relative w-full h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-bottom object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-3xl text-center space-y-6">
          {/* Title */}
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {/* Button */}
          <button
            className="inline-flex min-w-[200px] items-center justify-center gap-2 px-8 py-2 bg-[#F0E9D4] text-black font-medium rounded-lg hover:bg-[#E0D5C1] hover:cursor-pointer transition-colors duration-200 text-sm md:text-base"
          >
            <FaWhatsapp  size={20} className="inline" />
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

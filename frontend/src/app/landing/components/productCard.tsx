import React from 'react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'

interface ProductCardProps {
    name: string
    price: number
    originalPrice?: number
    imageUrl: string
    tag?: string
    onInfoClick?: () => void
    onBuyClick?: () => void
}

export default function ProductCard({
    name,
    price,
    originalPrice,
    imageUrl,
    tag,
    onInfoClick,
    onBuyClick
}: ProductCardProps) {
    return (
        <article className="w-[280px] mx-auto">
            {/* Image Container */}
            <div className="relative h-[185px] bg-white">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="space-y-1 py-[10px] w-full">

                {/* Product Header */}
                <div className='flex justify-between items-center   '>
                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 ">
                        {name}
                    </h3>
                    {/* Tag */}
                    {tag && (
                        <p className="text-sm text-white px-2 py-0.5 bg-[#000000D9] rounded-[6px]">{tag}</p>
                    )}
                </div>


                {/* Price Section */}
                <div className="flex items-center gap-2 ">
                    <span >
                        ${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })} COP
                    </span>
                    {originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            ${originalPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })} COP
                        </span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-2">
                    {/* Info Button */}
                    <button
                        onClick={onInfoClick}
                        className="px-4 py-4 w-full cursor-pointer flex-[1] h-[25px] bg-white border border-[#84603B] text-gray-800 text-sm font-medium rounded-[6px] flex items-center justify-center hover:cursor-pointer hover:bg-[#f4efe0] transition-colors duration-200"
                    >
                        Información
                    </button>

                    {/* Buy Button with WhatsApp icon */}
                    <button
                        onClick={onBuyClick}
                        className="px-4 py-4 w-full cursor-pointer flex-[3] h-[25px] bg-[#B8CDA2] text-black text-sm font-medium rounded-[6px] hover:cursor-pointer hover:bg-[#A9B997] transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <FaWhatsapp size={20} className="inline" />
                        Comprar
                    </button>
                </div>
            </div>
        </article>
    )
}

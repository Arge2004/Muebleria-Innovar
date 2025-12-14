import React from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  tag?: string;
  onInfoClick?: () => void;
  onBuyClick?: () => void;
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
      {/* Contenedor de imagen */}
      <div className="relative h-[185px] bg-white rounded-sm overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenido */}
      <div className="space-y-1 py-2.5 w-full">
        {/* Header del producto */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
            {name}
          </h3>
          {tag && (
            <span className="text-sm text-white px-2 py-0.5 bg-[#000000D9] rounded-md whitespace-nowrap">
              {tag}
            </span>
          )}
        </div>

        {/* Sección de precios */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            ${price.toLocaleString('es-CO')} COP
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toLocaleString('es-CO')} COP
            </span>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onInfoClick}
            className="px-4 py-2 flex-1 h-9 cursor-pointer bg-white border border-[#84603B] text-gray-800 text-sm font-medium rounded-md flex items-center justify-center hover:bg-[#f4efe0] transition-colors duration-200"
            aria-label={`Ver información de ${name}`}
          >
            Información
          </button>

          <button
            onClick={onBuyClick}
            className="px-4 py-2 flex-[3] cursor-pointer h-9 bg-[#B8CDA2] text-black text-sm font-medium rounded-md hover:bg-[#A9B997] transition-colors duration-200 flex items-center justify-center gap-2"
            aria-label={`Comprar ${name} por WhatsApp`}
          >
            <FaWhatsapp size={20} />
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}

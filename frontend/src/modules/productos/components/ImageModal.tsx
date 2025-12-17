'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  images: string[];
  productName: string;
  initialIndex: number; // El índice de la imagen actualmente seleccionada
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, productName, initialIndex, onClose }) => {
  const [currentModalImage, setCurrentModalImage] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar el modal al presionar ESC
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  // Manejar el clic fuera del modal para cerrarlo
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    // Fondo oscuro que ocupa toda la pantalla (Backdrop)
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" // Cambié de 'bg-white/60' a 'bg-black/80' para un mejor efecto de modal
      onClick={handleBackdropClick}
    >
      {/* Contenedor principal del modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Previene que el clic dentro cierre el modal
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          title="Cerrar"
        >
          {/* Icono de cierre (ejemplo simple con caracter x) */}
          <span className="text-xl font-bold hover:cursor-pointer">×</span>
        </button>

        {/* 🚨 Contenedor ajustado: siempre es flex-col (vertical) 🚨 */}
        <div className="flex flex-col gap-4 p-6">
        
          {/* Imagen principal con capacidad de zoom */}
          <div className="relative aspect-[4/3]  rounded overflow-hidden cursor-zoom-in">
            <Image
              src={images[currentModalImage]}
              alt={productName}
              fill
              className="object-contain"
              priority
              sizes="95vw" // Ajustamos sizes para ocupar más espacio
            />
          </div>

          <div className="flex justify-start gap-3 overflow-x-auto pb-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentModalImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden border-2 transition-all ${
                  currentModalImage === index ? 'border-blue-500 ring-2 ring-blue-500' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} - vista ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
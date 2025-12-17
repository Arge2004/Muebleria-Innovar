'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal'; 

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // Límite de miniaturas: 3 en móvil, 4 en LG y superiores.
  const MAX_THUMBNAILS_MOBILE = 3; 
  const MAX_THUMBNAILS_DESKTOP = 4;
  
  // Determinar el número de imágenes visibles para el corte
  // Usamos el límite de escritorio para el corte inicial
  const visibleImages = images.slice(0, MAX_THUMBNAILS_DESKTOP);
  const hasMoreImages = images.length > MAX_THUMBNAILS_DESKTOP;


  // Función para abrir el modal (misma lógica)
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal (misma lógica)
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar el clic en la miniatura (misma lógica)
  const handleThumbnailClick = (index: number) => {
    // Si la imagen está en el rango visible (desktop), selecciónala
    if (index < MAX_THUMBNAILS_DESKTOP) {
      setSelectedImage(index);
    } else {
      openModal();
    }
  };

  return (
    <>
      {/* Miniaturas verticales y Botón "Ver Más" */}
      <div className="order-2 lg:order-1 flex lg:flex-col justify-center gap-3 overflow-x-auto lg:overflow-visible">
        
        {/* Renderiza TODAS las miniaturas hasta el límite de escritorio (4) */}
        {visibleImages.map((img, index) => {
          
          // Lógica de visibilidad responsiva:
          // Oculta la cuarta miniatura (index === 3) si no es desktop (lg)
          const isFourthThumbnail = index === 3;
          const hideOnMobileClass = isFourthThumbnail ? 'hidden lg:block' : '';

          return (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              // Aplicamos la clase de ocultamiento condicional
              className={`relative w-20 h-20 lg:w-17 lg:h-17 flex-shrink-0 bg-gray-100 rounded overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-gray-400' : 'border-transparent hover:border-gray-300'
              } ${hideOnMobileClass}`}
            >
              <Image
                src={img}
                alt={`${productName} - vista ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          );
        })}

        {/* Botón "Ver Más" si hay más de 4 imágenes (Desktop) */}
        {hasMoreImages && (
          <button
            onClick={openModal}
            className={`w-20 h-20 lg:w-17 lg:h-17 flex-shrink-0 bg-gray-200 rounded border-2 border-transparent hover:border-gray-300 text-sm font-semibold text-gray-700 flex items-center justify-center transition-colors hover:cursor-pointer`}
            title="Ver todas las imágenes"
          >
            + {images.length - MAX_THUMBNAILS_DESKTOP} Más
          </button>
        )}
        
        {/* Botón "Ver Más" si hay 4 imágenes (Móvil) */}
        {/* Si SÓLO hay 4 imágenes, el botón "Ver Más" reemplaza a la 4ta miniatura en móvil. */}
        {/* Esta lógica es opcional, pero asegura que en móvil siempre se vea 3 + 1 botón */}
        {images.length === MAX_THUMBNAILS_DESKTOP && (
           <button
            onClick={openModal}
            // Muestra en móvil (oculta en lg), y reemplaza la posición de la 4ta imagen.
            className={`w-20 h-20 flex-shrink-0 bg-gray-200 rounded border-2 border-transparent hover:border-gray-300 text-sm font-semibold text-gray-700 items-center justify-center transition-colors hover:cursor-pointer
                        lg:hidden`} // Ocultar en desktop
            title="Ver las 4 imágenes"
          >
            Ver las 4
          </button>
        )}

      </div>

      {/* Imagen principal (sin cambios) */}
      <div className="order-1 lg:order-2 relative aspect-[4/3] bg-gray-100 rounded overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover hover:cursor-pointer"
          priority
          sizes="(max-width: 1024px) 100vw, 700px" 
          onClick={openModal}
        />
      </div>

      {/* Modal de Imágenes y Zoom (sin cambios) */}
      {isModalOpen && (
        <ImageModal
          images={images}
          productName={productName}
          initialIndex={selectedImage}
          onClose={closeModal}
        />
      )}
    </>
  );
  
};

export default ProductGallery;
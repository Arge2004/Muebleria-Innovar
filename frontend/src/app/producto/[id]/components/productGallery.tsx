'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      {/* Miniaturas verticales */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden border-2 transition-all ${
              selectedImage === index ? 'border-gray-400' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} - vista ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="order-1 lg:order-2 relative aspect-[4/3] bg-gray-100 rounded overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>
    </>
  );
};

export default ProductGallery;

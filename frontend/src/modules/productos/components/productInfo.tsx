'use client';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '@/types/product';
import Accordion from './accordion';

interface ProductInfoProps {
  product: Product;
  onBuyClick: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onBuyClick }) => {
  return (
    <div className="order-3 space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-normal text-gray-900">
          {product.nombre}
        </h1>
      </div>

      {/* Precio */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-normal text-gray-900">
            ${product.price.toLocaleString('es-CO')}.000 COP
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ${product.originalPrice.toLocaleString('es-CO')}.000 COP
            </span>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <p className="text-gray-700 text-sm leading-relaxed">
          {product.descripcion}
        </p>
      </div>

      {/* Botón de compra */}
      <button
        onClick={onBuyClick}
        className="w-full py-3 bg-[#57634A] hover:bg-[#465237] text-white cursor-pointer font-normal rounded flex items-center justify-center gap-2 transition-colors"
      >
        <FaWhatsapp size={20} />
        Comprar ahora
      </button>

      {/* Acordeones */}
      <div className="space-y-2 pt-2">
        {/* Composición */}
        {product.composicion && product.composicion.length > 0 && (
          <Accordion title="Composición">
            <ul className="space-y-2 text-gray-700 text-sm">
              {product.composicion.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Materiales y Calidad */}
        {product.materiales_calidad && product.materiales_calidad.length > 0 && (
          <Accordion title="Materiales y Calidad">
            <ul className="space-y-2 text-gray-700 text-sm">
              {product.materiales_calidad.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Beneficios */}
        {product.beneficios && product.beneficios.length > 0 && (
          <Accordion title="Beneficios">
            <ul className="space-y-2 text-gray-700 text-sm">
              {product.beneficios.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Garantía */}
        {product.garantia && product.garantia.length > 0 && (
          <Accordion title="Garantía">
            <ul className="space-y-2 text-gray-700 text-sm">
              {product.garantia.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Personalización */}
        {product.personalizacion && product.personalizacion.length > 0 && (
          <Accordion title="Personalización">
            <ul className="space-y-2 text-gray-700 text-sm">
              {product.personalizacion.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </Accordion>
        )}

        {/* Cuidados - mantener el acordeón existente */}
        <Accordion title="Cuidados">
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Limpiar con paño suave y húmedo</li>
            <li>• Evitar exposición directa al sol</li>
            <li>• No usar productos abrasivos</li>
            <li>• Mantener alejado de fuentes de calor</li>
          </ul>
        </Accordion>

        {/* Envío - mantener el acordeón existente */}
        <Accordion title="Envío">
          <div className="text-gray-700 text-sm space-y-2">
            <p>• Envío a nivel nacional</p>
            <p>• Tiempo de entrega: 5-10 días hábiles</p>
            <p>• Instalación incluida en la ciudad</p>
            <p>• Consulta por envío internacional</p>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductInfo;

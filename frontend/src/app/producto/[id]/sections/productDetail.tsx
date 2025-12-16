"use client";
import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/app/landing/data/products";
import ProductGallery from "@/app/producto/[id]/components/productGallery";
import ProductInfo from "@/app/producto/[id]/components/productInfo";
import RelatedProducts from "@/app/producto/[id]/components/relatedProducts";
import Footer from "@/app/landing/layout/footer";
import { FaWhatsapp } from "react-icons/fa";
import Accordion from "@/app/producto/[id]/components/accordion";
import TagLineBar from "@/app/landing/components/tagLineBar";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const [selectedImage, setSelectedImage] = React.useState(0);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <button
            onClick={() => router.push("/productos")}
            className="px-6 py-3 bg-[#B8CDA2] text-black rounded-md hover:bg-[#A9B997] transition-colors"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  // Mock de imágenes del producto (en producción vendrían de la data)
  const productImages = [product.imageUrl, product.imageUrl, product.imageUrl];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyClick = () => {
    const message = `Hola, estoy interesado en: ${product.name} - Ref: ${product.id}`;
    window.open(
      `https://wa.me/573001234567?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-gray-600">
              <li>
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-[#6B705C]"
                >
                  Inicio
                </button>
              </li>
              <li>/</li>
              <li>
                <button
                  onClick={() =>
                    router.push(`/productos?categoria=${product.category}`)
                  }
                  className="hover:text-[#6B705C] capitalize"
                >
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </button>
              </li>
              <li>/</li>
              <li className="text-gray-400">{product.name}</li>
            </ol>
          </nav>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-4 lg:gap-6 mb-16">
            <ProductGallery images={productImages} productName={product.name} />
            <ProductInfo product={product} onBuyClick={handleBuyClick} />
          </div>
        </div>
      </div>
      <RelatedProducts />
      <TagLineBar />
    </>
  );
};

export default ProductDetail;

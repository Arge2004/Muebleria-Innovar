"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/app/landing/data/products";
import ProductCard from "@/app/productos/components/productCard";
import TagLineBar from "@/app/landing/components/tagLineBar";
import SectionHero from "@/app/productos/components/sectionHero";
import FilterSidebar from "@/app/productos/components/filterSidebar";
import { categories, categoryInfo } from "@/app/productos/data/categories";
import { telas, tamanos, PRECIO_MIN, PRECIO_MAX } from "@/app/productos/data/filters";
import { defaultHeroData } from "@/app/productos/data/defaultHero";

const ProductSection: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estados de filtros seleccionados
  const [catSel, setCatSel] = useState<string | null>(null);
  const [telaSel, setTelaSel] = useState<string | null>(null);
  const [tamSel, setTamSel] = useState<string | null>(null);
  const [precio, setPrecio] = useState<[number, number]>([PRECIO_MIN, PRECIO_MAX]);
  
  // Estados de dropdowns
  const [openCat, setOpenCat] = useState(false);
  const [openTela, setOpenTela] = useState(false);
  const [openTam, setOpenTam] = useState(false);
  const [openPrecio, setOpenPrecio] = useState(false);

  // Sincronizar filtros con la URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (catSel) params.set("categoria", catSel);
    if (telaSel) params.set("tela", telaSel);
    if (tamSel) params.set("tamano", tamSel);
    if (precio[0] !== PRECIO_MIN || precio[1] !== PRECIO_MAX) {
      params.set("precio", `${precio[0]}-${precio[1]}`);
    }
    router.replace(`?${params.toString()}`);
  }, [catSel, telaSel, tamSel, precio, router]);

  // Leer filtros desde la URL al cargar
  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && categories.includes(cat as any)) setCatSel(cat);
  }, [searchParams]);

  // Filtrar productos según los criterios seleccionados
  const filteredProducts = products.filter((product) => {
    if (catSel && product.category !== catSel) return false;
    if (precio && (product.price < precio[0] || product.price > precio[1])) return false;
    return true;
  });

  // Obtener datos del hero según la categoría seleccionada
  const heroData = catSel && categoryInfo[catSel as keyof typeof categoryInfo]
    ? categoryInfo[catSel as keyof typeof categoryInfo]
    : defaultHeroData;

  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center bg-white">
        <SectionHero
          title={heroData.title}
          subtitle={heroData.subtitle}
          description={heroData.description}
          backgroundUrl={heroData.image}
        />
        
        <div className="flex w-full max-w-7xl px-4 py-8 gap-8">
          {/* Sidebar de filtros */}
          <FilterSidebar
            categories={categories}
            telas={telas}
            tamanos={tamanos}
            catSel={catSel}
            setCatSel={setCatSel}
            telaSel={telaSel}
            setTelaSel={setTelaSel}
            tamSel={tamSel}
            setTamSel={setTamSel}
            precio={precio}
            setPrecio={setPrecio}
            precioMin={PRECIO_MIN}
            precioMax={PRECIO_MAX}
            openCat={openCat}
            setOpenCat={setOpenCat}
            openTela={openTela}
            setOpenTela={setOpenTela}
            openTam={openTam}
            setOpenTam={setOpenTam}
            openPrecio={openPrecio}
            setOpenPrecio={setOpenPrecio}
          />
          
          {/* Grid de productos */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  imageUrl={product.imageUrl}
                  tag={product.tag}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <TagLineBar />
    </>
  );
};

export default ProductSection;

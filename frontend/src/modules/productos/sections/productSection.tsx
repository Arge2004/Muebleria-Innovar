"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AOS from "aos";
import { products } from "@/modules/landing/data/products";
import ProductCard from "@/modules/general/componentes/productCard";
import TagLineBar from "@/modules/landing/components/tagLineBar";
import SectionHero from "@/modules/productos/components/sectionHero";
import FilterSidebar from "@/modules/productos/components/filterSidebar";
import { categories, categoryInfo, Category } from "@/modules/productos/data/categories";
import { telas, tamanos, PRECIO_MIN, PRECIO_MAX } from "@/modules/productos/data/filters";
import { defaultHeroData } from "@/modules/productos/data/defaultHero";

const ProductSection: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Categoría viene directamente de la URL (única fuente de verdad)
  const urlCat = searchParams.get("categoria");
  const catSel = urlCat && categories.includes(urlCat as Category) ? urlCat : null;
  
  // Función para cambiar categoría (actualiza URL)
  const setCatSel = (cat: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set("categoria", cat);
    } else {
      params.delete("categoria");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const [telaSel, setTelaSel] = useState<string | null>(null);
  const [tamSel, setTamSel] = useState<string | null>(null);
  const [precio, setPrecio] = useState<[number, number]>([PRECIO_MIN, PRECIO_MAX]);
  
  // Estados de dropdowns
  const [openCat, setOpenCat] = useState(false);
  const [openTela, setOpenTela] = useState(false);
  const [openTam, setOpenTam] = useState(false);
  const [openPrecio, setOpenPrecio] = useState(false);

  const [cols, setCols] = useState(3); // Columnas según breakpoint
  
  // Detectar columnas según viewport
  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 640) setCols(1);       // sm: 1 columna
      else if (width < 1024) setCols(2); // md: 2 columnas  
      else setCols(3);                   // lg+: 3 columnas
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // Refrescar AOS cuando cambian los productos filtrados
  useEffect(() => {
    AOS.refresh();
  }, [catSel, telaSel, tamSel, precio]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredProducts.map((product, index) => {
                // Calcular fila según las columnas actuales del viewport
                const row = Math.floor(index / cols);
                const delay = row * 100; // 100ms de delay por cada fila
                
                return (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/producto/${product.id}`)}
                    className="cursor-pointer flex justify-center"
                    data-aos="fade-up"
                    data-aos-delay={delay}
                  >
                    <ProductCard
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      imageUrl={product.images[0]}
                      tag={product.tag}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      <TagLineBar />
    </>
  );
};

export default ProductSection;

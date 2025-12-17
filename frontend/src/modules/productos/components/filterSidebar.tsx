'use client';
import React, { useState } from 'react';
import { HiAdjustments, HiX } from 'react-icons/hi';
import Dropdown from './dropdown';
import PriceRange from './priceRange';

interface FilterSidebarProps {
  categories: readonly string[];
  telas: readonly string[];
  tamanos: readonly string[];
  catSel: string | null;
  setCatSel: (v: string | null) => void;
  telaSel: string | null;
  setTelaSel: (v: string | null) => void;
  tamSel: string | null;
  setTamSel: (v: string | null) => void;
  precio: [number, number];
  setPrecio: (v: [number, number]) => void;
  precioMin: number;
  precioMax: number;
  openCat: boolean;
  setOpenCat: (v: boolean) => void;
  openTela: boolean;
  setOpenTela: (v: boolean) => void;
  openTam: boolean;
  setOpenTam: (v: boolean) => void;
  openPrecio: boolean;
  setOpenPrecio: (v: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  telas,
  tamanos,
  catSel,
  setCatSel,
  telaSel,
  setTelaSel,
  tamSel,
  setTamSel,
  precio,
  setPrecio,
  precioMin,
  precioMax,
  openCat,
  setOpenCat,
  openTela,
  setOpenTela,
  openTam,
  setOpenTam,
  openPrecio,
  setOpenPrecio
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const formatLabel = (text: string) => 
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  // Contar filtros activos
  const activeFilters = [catSel, telaSel, tamSel].filter(Boolean).length + 
    (precio[0] !== precioMin || precio[1] !== precioMax ? 1 : 0);

  const FilterContent = () => (
    <>
      <h2 className="text-lg font-normal mb-7 text-black">
        Filtrado por
      </h2>
      
      <Dropdown label="Categoría" open={openCat} setOpen={setOpenCat}>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-2 py-1 rounded-none hover:bg-[#B8CDA2] mb-1 text-base transition-colors ${
                  catSel === cat ? 'bg-[#97a885ff]' : ''
                }`}
                onClick={() => setCatSel(catSel === cat ? null : cat)}
              >
                {formatLabel(cat)}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
      
      <Dropdown label="Tela" open={openTela} setOpen={setOpenTela}>
        <ul>
          {telas.map((tela) => (
            <li key={tela}>
              <button
                className={`w-full text-left px-2 py-1 rounded-none hover:bg-[#B8CDA2] text-base transition-colors ${
                  telaSel === tela ? 'bg-[#97a885ff]' : ''
                }`}
                onClick={() => setTelaSel(telaSel === tela ? null : tela)}
              >
                {formatLabel(tela)}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
      
      <Dropdown label="Tamaño" open={openTam} setOpen={setOpenTam}>
        <ul>
          {tamanos.map((tam) => (
            <li key={tam}>
              <button
                className={`w-full text-left px-2 py-1 rounded-none hover:bg-[#B8CDA2] text-base transition-colors ${
                  tamSel === tam ? 'bg-[#97a885ff]' : ''
                }`}
                onClick={() => setTamSel(tamSel === tam ? null : tam)}
              >
                {formatLabel(tam)}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
      
      <Dropdown label="Precio" open={openPrecio} setOpen={setOpenPrecio}>
        <PriceRange 
          min={precioMin} 
          max={precioMax} 
          value={precio} 
          onChange={setPrecio} 
        />
      </Dropdown>
    </>
  );

  return (
    <>
      {/* Botón móvil para abrir filtros */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#57634A] text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#4a5640] transition-colors"
      >
        <HiAdjustments size={24} />
        {activeFilters > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#B8CDA2] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {activeFilters}
          </span>
        )}
      </button>

      {/* Overlay móvil */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Drawer móvil */}
      <aside 
        className={`
          lg:hidden fixed top-0 left-0 h-full w-[300px] bg-white z-50 p-7 shadow-xl
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX size={24} />
          </button>
        </div>
        <FilterContent />
      </aside>

      {/* Sidebar desktop */}
      <aside className="hidden lg:block w-full max-w-[270px] bg-white rounded-none p-7 shadow-none h-fit sticky top-24 border-none">
        <FilterContent />
      </aside>
    </>
  );
};

export default FilterSidebar;

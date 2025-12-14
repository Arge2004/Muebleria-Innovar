import React from 'react';
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
  const formatLabel = (text: string) => 
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <aside className="w-full max-w-[270px] bg-white rounded-none p-7 shadow-none h-fit sticky top-24 border-none">
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
    </aside>
  );
};

export default FilterSidebar;

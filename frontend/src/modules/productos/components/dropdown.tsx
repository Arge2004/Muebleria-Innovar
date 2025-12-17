import React from 'react';

interface DropdownProps {
  label: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, open, setOpen, children }) => (
  <div className="mb-2">
    <button
      className="w-full flex justify-between items-center px-0 py-2 bg-transparent text-lg text-black border-none focus:outline-none hover:text-[#6B705C] transition-colors"
      onClick={() => setOpen(!open)}
      type="button"
      aria-expanded={open}
      aria-label={`${open ? 'Cerrar' : 'Abrir'} filtro de ${label}`}
    >
      <span className="font-normal">{label}</span>
      <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="m19.5 8.25-7.5 7.5-7.5-7.5" 
          />
        </svg>
      </span>
    </button>
    
    <div
      className={`overflow-hidden transition-all duration-300 ${
        open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      {open && <div className="py-2">{children}</div>}
    </div>
    
    <div className="border-b border-gray-300 my-2" />
  </div>
);

export default Dropdown;

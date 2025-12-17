import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface PriceRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ min, max, value, onChange }) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sincronizar valor local cuando el valor externo cambia
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Memoizar onChange para evitar dependencias cambiantes
  const stableOnChange = useCallback(onChange, [onChange]);

  // Debouncing: actualizar el valor real después de 500ms sin cambios
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (localValue[0] !== value[0] || localValue[1] !== value[1]) {
        stableOnChange(localValue);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [localValue, value, stableOnChange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), localValue[1]);
    setLocalValue([val, localValue[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), localValue[0]);
    setLocalValue([localValue[0], val]);
  };

  const handleSliderChange = (vals: number | number[]) => {
    const values = Array.isArray(vals) ? vals : [vals, vals];
    setLocalValue([values[0], values[1]]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full mt-2 mb-3 px-4">
        <Slider
          range
          min={min}
          max={max}
          value={localValue}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: '#97a885ff', height: 8 }]}
          handleStyle={[
            { 
              backgroundColor: '#97a885ff', 
              borderColor: '#fff', 
              height: 24, 
              width: 24, 
              marginTop: -8, 
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)' 
            },
            { 
              backgroundColor: '#97a885ff', 
              borderColor: '#fff', 
              height: 24, 
              width: 24, 
              marginTop: -8, 
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)' 
            }
          ]}
          railStyle={{ backgroundColor: '#e5e7eb', height: 8 }}
          allowCross={false}
        />
      </div>
      
      <div className="flex w-full justify-between gap-2">
        <input
          type="number"
          min={min}
          max={localValue[1]}
          value={localValue[0]}
          onChange={handleMinChange}
          className="w-full text-right border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#97a885ff] focus:border-transparent"
          aria-label="Precio mínimo"
        />
        <input
          type="number"
          min={localValue[0]}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="w-full text-right border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#97a885ff] focus:border-transparent"
          aria-label="Precio máximo"
        />
      </div>
      
      <div className="flex justify-end text-sm text-gray-500 mt-1">
        ${localValue[0].toLocaleString('es-CO')} - ${localValue[1].toLocaleString('es-CO')}
      </div>
    </div>
  );
};

export default PriceRange;

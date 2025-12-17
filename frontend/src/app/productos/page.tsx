import React, { Suspense } from 'react';
import ProductSection from '../../modules/productos/sections/productSection';

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductSection />
    </Suspense>
  );
}

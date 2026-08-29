import React from 'react';
import ProductDetail from '@/modules/productos/sections/productDetail';
import products from '@/muebles.json';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductoPage() {
  return <ProductDetail />;
}


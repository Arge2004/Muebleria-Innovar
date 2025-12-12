"use client";
import TagLineBar from "@/app/landing/components/tagLineBar";
import CategorySection from "@/app/landing/sections/categorySection";
import HeroSection from "@/app/landing/sections/heroSection";
import MainMueblesSection from "@/app/landing/sections/mainMueblesSection";
import CollectionSection from "@/app/landing/sections/collectionSection";
import { collections } from "@/app/landing/data/collections";
import ProductSection from "@/app/landing/sections/productSection";
import TestimonialsSection from "@/app/landing/sections/testimonialsSection";
import FeaturesSection from "@/app/landing/sections/featuresSection";


export default function Home() {
  

  return (
    <main>
      <HeroSection />
      <TagLineBar />
      <MainMueblesSection />
      <TagLineBar />
      <CategorySection />
      <TagLineBar />
      <CollectionSection/>
      <ProductSection />
      <TestimonialsSection />
      <FeaturesSection />
    </main>
  );
}

"use client";
import HeroSection from "@/modules/landing/sections/heroSection";
import TagLineBar from "@/modules/landing/components/tagLineBar";
import MainMueblesSection from "@/modules/landing/sections/mainMueblesSection";
import CategorySection from "@/modules/landing/sections/categorySection";
import CollectionSection from "@/modules/landing/sections/collectionSection";
import ProductSection from "@/modules/landing/sections/productSection";
import TestimonialsSection from "@/modules/landing/sections/testimonialsSection";
import FeaturesSection from "@/modules/landing/sections/featuresSection";


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

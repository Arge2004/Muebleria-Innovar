import React from 'react';

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundUrl?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({ 
  title, 
  subtitle, 
  description, 
  backgroundUrl 
}) => (
  <div
    data-sectionhero="true"
    className="w-full h-64 md:h-72 flex flex-col justify-center px-8 md:px-16 text-white relative mb-8 overflow-hidden"
    style={{
      backgroundImage: backgroundUrl 
        ? `linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(${backgroundUrl})` 
        : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="z-10 relative max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
        {title}
      </h1>
      {subtitle && (
        <p className="italic text-lg mb-1 drop-shadow">
          &quot;{subtitle}&quot;
        </p>
      )}
      {description && (
        <p className="text-base md:text-lg drop-shadow-lg">
          {description}
        </p>
      )}
    </div>
    <div className="absolute inset-0 bg-black/30" style={{ zIndex: 0 }} />
  </div>
);

export default SectionHero;

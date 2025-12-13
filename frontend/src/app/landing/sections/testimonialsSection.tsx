import testimoniosBackground from '@/app/landing/assets/testimonios.png'
import { IoLocationOutline } from "react-icons/io5";
import Image from 'next/image';

export default function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            name: "Laura G.",
            location: "Medellín, Colombia",
            rating: 5,
            text: "Compré una sala para mi apartamento y quedé encantada. Llegó rápido, la calidad es excelente y el diseño le dio un aire completamente nuevo a mi espacio. ¡Definitivamente volvería a comprar!",
            avatar: "/avatars/laura.jpg", // Placeholder - puedes reemplazar con tu imagen
        },
        {
            id: 2,
            name: "Andrés P.",
            location: "Ibagué, Colombia",
            rating: 5,
            text: "Pedí un comedor y superó mis expectativas. Es muy resistente y elegante y fácil de armar. Además, la atención al cliente fue increíble, siempre atentos a cada detalle.",
            avatar: "/avatars/andres.jpg", // Placeholder - puedes reemplazar con tu imagen
        },
    ];

    return (
        <section className="relative w-full">
            {/* Imagen de fondo - la agregarás después */}
            <div className="absolute inset-0 z-0">
                {<Image
                    src={testimoniosBackground}
                    alt="Background"
                    fill
                    className="object-cover object-[30%_70%] hidden md:block"
                />}
            </div>

            {/* Contenido */}
            <div className="relative z-10">
                {/* Título móvil */}
                <h2 className="md:hidden text-3xl italic font-serif font-bold text-center pt-10 bg-[#57634A] text-white">
                    Lo que dicen nuestros clientes.
                </h2>
                
                {/* Layout móvil: Stack vertical | Desktop: Grid 2x2 */}
                <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2">
                    {/* Testimonio 1 */}
                    <div className="bg-[#57634A] w-full flex flex-col justify-center items-center min-h-[280px] sm:min-h-[300px] text-white p-4 sm:p-6 md:p-8">
                        {/*Content*/}
                        <div className="w-full max-w-md md:max-w-2/3">
                            {/* Header con avatar y nombre */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {/* Avatar placeholder */}
                                    <div className="w-full h-full bg-white/30 flex items-center justify-center">
                                        <span className="text-2xl sm:text-2xl font-bold text-white">
                                            {testimonials[0].name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    <h3 className="font-semibold text-base sm:text-lg">{testimonials[0].name}</h3>
                                    {/*Barra vertical*/}
                                    <div className="w-0.5 h-5 sm:h-7 bg-[#836B62]" />
                                    {/* Rating stars */}
                                    <div className="flex gap-0.5 sm:gap-1">
                                        {[...Array(testimonials[0].rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-sm sm:text-base">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonio */}
                            <p className="text-white leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base 2xl:text-xl italic">
                                &ldquo;{testimonials[0].text}&rdquo;
                            </p>

                            {/* Ubicación */}
                            <div className="flex items-center gap-2 text-white text-xs sm:text-sm 2xl:text-lg">
                                <IoLocationOutline className="text-white/70" />
                                <span>{testimonials[0].location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Espacio superior derecho - oculto en móvil */}
                    <div className="hidden md:block w-full min-h-[300px]"></div>

                    {/* Espacio inferior izquierdo - oculto en móvil */}
                    <div className="hidden md:block w-full min-h-[300px]"></div>

                    {/* Testimonio 2 */}
                    <div className="bg-[#57634A] w-full flex flex-col justify-center items-center min-h-[280px] sm:min-h-[300px] text-white p-4 sm:p-6 md:p-8">
                        {/*Content*/}
                        <div className="w-full max-w-md md:max-w-2/3">
                            {/* Header con avatar y nombre */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {/* Avatar placeholder */}
                                    <div className="w-full h-full bg-white/30 flex items-center justify-center">
                                        <span className="text-xl sm:text-2xl font-bold text-white">
                                            {testimonials[1].name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    <h3 className="font-semibold text-base sm:text-lg">{testimonials[1].name}</h3>
                                    {/*Barra vertical*/}
                                    <div className="w-0.5 h-5 sm:h-7 bg-[#836B62]" />
                                    {/* Rating stars */}
                                    <div className="flex gap-0.5 sm:gap-1">
                                        {[...Array(testimonials[1].rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-sm sm:text-base">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonio */}
                            <p className="text-white leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base italic 2xl:text-xl">
                                &ldquo;{testimonials[1].text}&rdquo;
                            </p>

                            {/* Ubicación */}
                            <div className="flex items-center gap-2 text-white text-xs sm:text-sm 2xl:text-lg">
                                <IoLocationOutline className="text-white/70" />
                                <span>{testimonials[1].location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

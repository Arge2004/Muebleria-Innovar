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
                    className="object-cover object-[30%_70%]"
                />}
            </div>

            {/* Contenido */}
            <div className="relative z-10">
                <div className="grid grid-cols-2 grid-rows-2">
                    {/* Testimonio 1 - Esquina superior izquierda */}
                    <div className="bg-[#57634A] w-full flex flex-col justify-center items-center min-h-[300px] text-white p-8">
                        {/*Content*/}
                        <div className="max-w-2/3">
                            {/* Header con avatar y nombre */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                    {/* Avatar placeholder */}
                                    <div className="w-full h-full bg-white/30 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">
                                            {testimonials[0].name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <h3 className="font-semibold text-lg">{testimonials[0].name}</h3>
                                    {/*Barra vertical*/}
                                    <div className="w-0.5 h-7 bg-[#836B62]" />
                                    {/* Rating stars */}
                                    <div className="flex gap-1">
                                        {[...Array(testimonials[0].rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonio */}
                            <p className="text-white leading-relaxed mb-4 2xl:text-xl italic">
                                &ldquo;{testimonials[0].text}&rdquo;
                            </p>

                            {/* Ubicación */}
                            <div className="flex items-center gap-2 text-white text-sm 2xl:text-lg">
                                <IoLocationOutline className="text-white/70" />
                                <span>{testimonials[0].location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Espacio superior derecho - vacío */}
                    <div className="w-full min-h-[300px]"></div>

                    {/* Espacio inferior izquierdo - vacío */}
                    <div className="w-full min-h-[300px]"></div>

                    {/* Testimonio 2 - Esquina inferior derecha */}
                    <div className="bg-[#57634A] w-full flex flex-col justify-center items-center min-h-[300px] text-white p-8">
                        {/*Content*/}
                        <div className="max-w-2/3">
                            {/* Header con avatar y nombre */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                    {/* Avatar placeholder */}
                                    <div className="w-full h-full bg-white/30 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">
                                            {testimonials[1].name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <h3 className="font-semibold text-lg">{testimonials[1].name}</h3>
                                    {/*Barra vertical*/}
                                    <div className="w-0.5 h-7 bg-[#836B62]" />
                                    {/* Rating stars */}
                                    <div className="flex gap-1">
                                        {[...Array(testimonials[1].rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonio */}
                            <p className="text-white leading-relaxed mb-4 italic 2xl:text-xl">
                                &ldquo;{testimonials[1].text}&rdquo;
                            </p>

                            {/* Ubicación */}
                            <div className="flex items-center gap-2 text-white text-sm 2xl:text-lg">
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

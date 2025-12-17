'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { muebles } from "@/modules/landing/data/main_muebles";

export default function CustomSwiper() {
    const realSlidesCount = 3;
    const [activeIndex, setActiveIndex] = useState(1);
    
    // Solo mostrar los primeros 3 muebles únicos para móvil
    const uniqueMuebles = muebles.slice(0, 3);

    return (
        <>
            {/* Vista móvil - Cards apiladas */}
            <div className="sm:hidden w-full px-4 flex flex-col gap-4">
                {uniqueMuebles.map((mueble, index) => (
                    <div key={index} className="relative w-full aspect-[4/3] bg-[#D1CCC0] rounded-lg overflow-hidden">
                        <Image src={mueble.imagen} alt={mueble.nombre} fill className="object-cover" />
                        <div className="absolute top-3 left-0 right-0 text-center">
                            <h3 className="text-xl font-semibold">{mueble.nombre}</h3>
                            <p className="text-gray-600 text-base">{mueble.precio}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vista desktop - Swiper */}
            <div className="hidden sm:block !w-full relative bg-[#D1CCC0]">
                <Swiper
                    modules={[EffectCoverflow, Navigation]}
                    centeredSlides
                    speed={1500}
                    initialSlide={1}
                    effect="coverflow"
                    loop={true}
                    allowTouchMove={true}
                    simulateTouch={true}
                    touchRatio={1}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                            spaceBetween: 50,
                        },
                        1200: {
                            spaceBetween: 30,
                            allowTouchMove: false,
                            simulateTouch: false,
                            touchRatio: 0,
                        },
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % realSlidesCount)}
                    className='main-muebles-swiper'
                >
                    {muebles.map((mueble, index) => (
                        <SwiperSlide key={index} className="relative overflow-visible">
                            <Image src={mueble.imagen} alt={mueble.nombre} fill className="object-cover overflow-visible" />
                            <div className={`absolute flex flex-col w-full gap-1 sm:gap-3 top-2 sm:top-5 left-1/2 transform -translate-x-1/2 bg-transparent bg-opacity-75 px-2 sm:px-4 py-2 transition-opacity duration-500 ${(index % realSlidesCount) === (activeIndex % realSlidesCount) ? 'opacity-100' : 'opacity-0'}`}>
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-4xl 3xl:text-5xl font-semibold">{mueble.nombre}</h3>
                                <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl 3xl:text-3xl">{mueble.precio}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Botones de navegación personalizados */}
                <button className="custom-prev absolute left-1 sm:left-2 xl:left-5 top-1/2 text-3xl sm:text-4xl xl:text-5xl font-light hover:scale-110 transition-transform z-30 cursor-pointer">
                    <BsChevronLeft />
                </button>
                <button className="custom-next absolute right-1 sm:right-2 xl:right-5 top-1/2 text-3xl sm:text-4xl xl:text-5xl font-light hover:scale-110 transition-transform z-30 cursor-pointer">
                    <BsChevronRight />
                </button>

                <div className='hidden sm:flex w-full text-xs sm:text-sm 2xl:text-sm 3xl:text-base absolute bottom-3 sm:bottom-5 z-20 justify-between px-4 sm:px-10 lg:px-25'>
                    <button className='bg-[#836B6233] border-[#75635C] hover:bg-[#75635C] hover:text-white hover:cursor-pointer transition-all border-2 text-[#20203C] px-2 sm:px-3 2xl:px-4 3xl:px-5 py-1.5 sm:py-2 2xl:py-2 3xl:py-3 rounded-xl'>Ver más información</button>
                    <button className='bg-[#75635C] border-[#75635C] text-white hover:bg-[#5a4f48] hover:cursor-pointer transition-all px-2 sm:px-3 2xl:px-4 3xl:px-5 py-1.5 sm:py-2 2xl:py-2 3xl:py-3 rounded-xl'>Ver todos los productos</button>
                </div>
            </div>
        </>
    )
}

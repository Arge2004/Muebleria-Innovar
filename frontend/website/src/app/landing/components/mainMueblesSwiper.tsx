import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { muebles } from "@/app/landing/data/main_muebles";

export default function CustomSwiper() {
    const realSlidesCount = 3;
    const [activeIndex, setActiveIndex] = useState(1);
    return (
        <div className="!w-full relative bg-[#D1CCC0]">
            <Swiper
                modules={[EffectCoverflow, Navigation]}
                centeredSlides
                speed={1500}
                initialSlide={1}
                effect="coverflow"
                loop={true}
                allowTouchMove={false}
                simulateTouch={false}
                touchRatio={0}
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
                spaceBetween={100}
                breakpoints={{
                    1200: {
                        spaceBetween: 30,
                    },
                 

                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % realSlidesCount)}
                className='main-muebles-swiper'
            >
                {muebles.map((mueble, index) => (
                    <SwiperSlide key={index} className="relative overflow-visible">
                        <Image src={mueble.imagen} alt={mueble.nombre} fill className="object-cover overflow-visible" />
                        <div className={`absolute flex flex-col w-full gap-3 top-5 left-1/2 transform -translate-x-1/2 bg-transparent bg-opacity-75 px-4 py-2 transition-opacity duration-500 ${(index % realSlidesCount) === (activeIndex % realSlidesCount) ? 'opacity-100' : 'opacity-0'}`}>
                            <h3 className="text-4xl 2xl:text-5xl font-semibold">{mueble.nombre}</h3>
                            <p className="text-gray-600 text-2xl 2xl:text-3xl">{mueble.precio}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Botones de navegación personalizados */}
            <button className="custom-prev absolute left-2 xl:left-5 top-1/2  text-5xl xl:text-5xl font-light hover:scale-110 transition-transform z-30 cursor-pointer">
                <BsChevronLeft />
            </button>
            <button className="custom-next absolute right-2 xl:right-5 top-1/2  text-5xl xl:text-5xl font-light hover:scale-110 transition-transform z-30 cursor-pointer">
                <BsChevronRight />
            </button>

            <div className='flex w-full text-sm 2xl:text-base absolute bottom-5 z-20 justify-between px-25'>
                <button className='bg-[#836B6233] border-[#20203C] hover:bg-[#20203C] hover:text-white hover:cursor-pointer transition-all border-2 text-[#20203C] px-2 2xl:px-5 py-2 2xl:py-3 rounded-xl'>Ver más información</button>
                <button className='bg-[#20203C] text-white hover:bg-[#353557] hover:cursor-pointer transition-all px-2 2xl:px-5 py-2 2xl:py-3 rounded-xl'>Ver todos los productos</button>
            </div>
        </div>
    )
}

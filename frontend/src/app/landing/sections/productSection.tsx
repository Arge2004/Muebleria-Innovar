import React from 'react'
import ProductCard from '@/app/landing/components/productCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { products } from '@/app/landing/data/products'

export default function ProductSection() {
    return (
        <section className="px-4 py-11 relative">
            <div className="mx-auto max-w-7xl">
                {/* Título de la sección */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl italic md:text-5xl font-bold mb-2">
                        Descubre lo que tenemos para ti
                    </h2>
                </div>

                {/* Swiper Container */}
                <div className="relative min-h-72">
                    <Swiper
                        modules={[Navigation]}
                        centeredSlides={false}
                        loop={true}
                        allowTouchMove={false}
                        simulateTouch={false}
                        touchRatio={0}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        slidesPerView={3}
                        breakpoints={{
                            1800: { slidesPerView: 4 },
                        }}
                        spaceBetween={10}
                        className='h-full !pl-7 xl:!pl-25 2xl:!pl-0'
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard
                                    name={product.name}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    imageUrl={product.imageUrl}
                                    tag={product.tag}
                                    onInfoClick={() => console.log(`Ver info: ${product.id}`)}
                                    onBuyClick={() => console.log(`Comprar: ${product.id}`)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Botones de navegación personalizados */}
                <button className="custom-prev absolute left-2 xl:left-10 2xl:left-40 top-1/2 -translate-y-1/2 text-4xl xl:text-5xl font-light hover:scale-110 transition-transform z-30 cursor-pointer text-gray-700 hover:text-gray-900">
                    <BsChevronLeft />
                </button>
                <button className="custom-next absolute right-2 xl:right-10 2xl:right-40 top-1/2 -translate-y-1/2 text-4xl xl:text-5xl font-light hover:scale-110 transition-transform z-30 cursor-pointer text-gray-700 hover:text-gray-900">
                    <BsChevronRight />
                </button>

                {/*Ver todos los productos button*/}
                <div className="text-center mt-8">
                    <button className="px-4 py-2 bg-[#20203C] text-white font-medium rounded-lg hover:cursor-pointer hover:bg-[#272744] transition-colors duration-200">
                        Ver todos los productos
                    </button>
                </div>
            </div>
        </section>
    )
}

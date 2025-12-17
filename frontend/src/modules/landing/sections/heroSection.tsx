import React from 'react'
import bg from "@/modules/landing/assets/bg-hero.jpg"
import { FaWhatsapp } from 'react-icons/fa'
import { RxChevronDown } from 'react-icons/rx'

export default function HeroSection() {
    return (
        <section id='hero' className="w-full relative h-dvh min-h-[600px] flex flex-col items-center justify-center bg-cover bg-center px-4 pb-safe" style={{ backgroundImage: `url(${bg.src})` }}>
            <div className="absolute inset-0 z-0 bg-black/60"></div>
            <div className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl text-white flex flex-col justify-between gap-8 sm:gap-4 font-bold z-10 text-center">
                <h2 className='leading-snug'>
                    Más que muebles,
                    <br />
                    <span className='text-[#F0E9D4]'>creamos experiencias de vida.</span>
                </h2>
                 <h1 className='text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl 3xl:text-9xl italic font-serif text-white font-bold z-10 text-center my-4 sm:my-10'>
                Galería Innovar
                </h1>
                <p className='text-sm sm:text-base lg:text-lg italic text-center px-2'>
                    Diseños únicos, materiales duraderos y envío a todo el país.
                </p>
            </div>
            <div className='mt-8 sm:mt-12 z-10 flex flex-col sm:flex-row gap-3 font-light w-auto px-4 sm:px-0'>
                <button className='hero-button w-56 sm:w-48 py-3 sm:py-2'>Descubrir Colección</button>
                <button className='hero-button w-56 sm:w-48 py-3 sm:py-2 bg-[#B8CDA2D9] flex justify-center items-center'><FaWhatsapp size={24} className='inline mr-2' />WhatsApp</button>
            </div>
            <a href="#main-muebles" className='flex justify-center items-center'>
                <RxChevronDown 
                    size={54} 
                    color='white' 
                    className='absolute hover:cursor-pointer bottom-10 sm:bottom-8 animate-bounce z-10' 
                />
            </a>
        </section>
    )
}

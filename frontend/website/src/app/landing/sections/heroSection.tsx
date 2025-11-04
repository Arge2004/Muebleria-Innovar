import React from 'react'
import bg from "@/app/landing/assets/bg-hero.jpg"
import { FaWhatsapp } from 'react-icons/fa'
import { RxChevronDown } from 'react-icons/rx'

export default function HeroSection() {
    return (
        <section id='hero' className="w-full relative h-screen flex flex-col items-center justify-center bg-cover" style={{ backgroundImage: `url(${bg.src})` }}>
            <div className="absolute inset-0 z-0 bg-black/60"></div>
            <div className="text-3xl xl:text-4xl 2xl:text-5xl text-white flex flex-col justify-between min-h-32 xl:min-h-36 2xl:min-h-44 font-bold z-10 text-center">
                <h2 className='leading-snug'>
                    Más que muebles,
                    <br />
                    <span className='text-[#F0E9D4]'>creamos experiencias de vida.</span>
                </h2>
                 <h1 className='text-7xl xl:text-8xl 2xl:text-9xl italic font-serif text-white font-bold z-10 text-center my-10'>
                Galería Innovar
                </h1>
                <p className='text-lg italic text-center'>
                    Diseños únicos, materiales duraderos y envío a todo el país.
                </p>
            </div>
            <div className='mt-12 z-10 flex gap-3 font-light'>
                <button className='hero-button'>Descubrir Colección</button>
                <button className='hero-button bg-[#B8CDA2D9] flex justify-center items-center'><FaWhatsapp size={24} className='inline mr-2' />WhatsApp</button>
            </div>
            <a href="#main-muebles" className='flex justify-center items-center'>
                <RxChevronDown 
                    size={54} 
                    color='white' 
                    className='absolute hover:cursor-pointer bottom-8 animate-bounce z-10' 
                />
            </a>
        </section>
    )
}

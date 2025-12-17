import React from 'react'
import CustomSwiper from '@/modules/landing/components/mainMueblesSwiper'
import { FaWhatsapp } from 'react-icons/fa'
import FadeIn from '@/modules/landing/effects/fadeIn'

export default function MainMueblesSection() {
  return (
    <section id='main-muebles' className='w-full h-auto py-10 lg:pt-[60px] lg:h-[calc(100vh)] lg:py-0 flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-0'>
      <FadeIn>
        <h2 className='text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center pb-3 xl:pb-10 2xl:pb-5 3xl:pb-10 pt-6 sm:pt-10 xl:pt-0 px-4'>Descubre lo mejor de nosotros</h2>
        <CustomSwiper />
        <div className='flex w-full mt-3 justify-center px-4'>
          <button className='bg-[#75635C] hover:bg-[#5a4f48] hover:cursor-pointer text-lg sm:text-xl lg:text-2xl min-w-40 sm:min-w-48 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2'><FaWhatsapp size={24} />Comprar</button>
        </div>
      </FadeIn>
    </section>
  )
}

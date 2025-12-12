import React from 'react'
import CustomSwiper from '@/app/landing/components/mainMueblesSwiper'
import { FaWhatsapp } from 'react-icons/fa'
import FadeIn from '@/app/landing/effects/fadeIn'

export default function MainMueblesSection() {
  return (
    <section id='main-muebles' className='w-full h-screen flex flex-col items-center justify-center'>
      <FadeIn>
        <h2 className='text-4xl  xl:text-5xl text-center pb-3 xl:pb-10 2xl:pb-15 pt-10 xl:pt-0'>Descubre lo mejor de nosotros</h2>
        <CustomSwiper />
        <div className='flex w-full mt-3 justify-center'>
          <button className='bg-[#20203C] hover:bg-[#353557] hover:cursor-pointer text-2xl min-w-48 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2'><FaWhatsapp size={24} />Comprar</button>
        </div>
      </FadeIn>
    </section>
  )
}

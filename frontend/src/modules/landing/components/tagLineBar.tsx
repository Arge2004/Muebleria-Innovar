'use client'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { messages } from '@/modules/landing/data/messages'

export default function TagLineBar() {
  return (
    <div className='bg-[#927C73] text-white italic py-2 sm:py-3'>
      <Marquee speed={40} pauseOnHover>
        {messages.map((message, index) => (
          <span key={index} className='flex items-center text-xs md:text-sm xl:text-base 2xl:text-lg'>
            <span className='px-4 sm:px-6 md:px-8'>{message}</span>
            <span className='text-white/60'>✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}

import React from 'react'
import { messages } from '@/app/landing/data/messages'

export default function TagLineBar() {
  return (
    <div className='flex justify-center text-[8px] xl:text-[12px] 2xl:text-lg bg-[#927C73] text-white italic py-3'>
      {messages.map((message, index) => (
        <div key={index}>
          <span>{message}</span>
          {index < messages.length - 1 && <span className='px-3'> — </span>}
        </div>
      ))}
    </div>
  )
}

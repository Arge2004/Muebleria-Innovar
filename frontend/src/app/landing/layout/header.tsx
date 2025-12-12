'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import logo from  "@/app/landing/assets/logo.png"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full text-white fixed top-0 h-15 z-50 flex justify-between items-center px-14 py-5 transition-all duration-300 ${isScrolled ? 'bg-[#6B705C] shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className='flex xl:min-w-56 items-center gap-3'>
        <Link href="/"><Image src={logo} alt="Logo" width={42} height={42} /></Link>
      </div>
      <nav>
        <ul className='flex gap-3  xl:text-xl font-light'>
          <li className='nav-buttons'><Link href="/">Camas</Link></li>
          <li className='nav-buttons'><Link href="/about">Muebles</Link></li>
          <li className='nav-buttons'><Link href="/services">Comedores</Link></li>
          <li className='nav-buttons'><Link href="/contact">Salas</Link></li>
          <li className='nav-buttons'><Link href="/bunk-beds">Camarotes</Link></li>
          <li className='nav-buttons'><Link href="/contact">Contacto</Link></li>
        </ul>
      </nav>
      <div className='flex xl:min-w-56 justify-end gap-4'>
            <Link href="/instagram" className='contact-button'><FaInstagram size={28} color='white' /></Link>
            <Link href="/whatsapp" className='contact-button'><FaWhatsapp size={28} color='white' /></Link>
      </div>
    </header> 
  )
}

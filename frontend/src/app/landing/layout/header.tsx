'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import Image from 'next/image'
import logo from  "@/app/landing/assets/logo.png"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Cerrar menú móvil al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Camas" },
    { href: "/about", label: "Muebles" },
    { href: "/services", label: "Comedores" },
    { href: "/contact", label: "Salas" },
    { href: "/bunk-beds", label: "Camarotes" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <>
      <header className={`w-full text-white fixed top-0 h-15 z-50 flex justify-between items-center px-4 md:px-8 lg:px-14 py-5 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#57634A] shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className='flex xl:min-w-56 items-center gap-3'>
          <Link href="/"><Image src={logo} alt="Logo" width={42} height={42} /></Link>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden lg:block'>
          <ul className='flex gap-3 xl:text-xl font-light'>
            {navLinks.map((link) => (
              <li key={link.label} className='nav-buttons'>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Social Icons */}
        <div className='hidden lg:flex xl:min-w-56 justify-end gap-4'>
          <Link href="/instagram" className='contact-button'><FaInstagram size={28} color='white' /></Link>
          <Link href="/whatsapp" className='contact-button'><FaWhatsapp size={28} color='white' /></Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className='lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <nav 
        className={`fixed top-[60px] right-0 h-[calc(100vh-60px)] w-64 bg-[#6B705C] z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className='flex flex-col p-4'>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link 
                href={link.href} 
                className='block py-3 px-4 text-white text-lg hover:bg-white/10 rounded-lg transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile Social Icons */}
        <div className='flex justify-center gap-6 mt-6 pt-6 border-t border-white/20 mx-4'>
          <Link href="/instagram" className='contact-button' onClick={() => setIsMobileMenuOpen(false)}>
            <FaInstagram size={32} color='white' />
          </Link>
          <Link href="/whatsapp" className='contact-button' onClick={() => setIsMobileMenuOpen(false)}>
            <FaWhatsapp size={32} color='white' />
          </Link>
        </div>
      </nav>
    </>
  )
}

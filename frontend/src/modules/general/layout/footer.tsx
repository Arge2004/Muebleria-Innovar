import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import logo from '@/modules/landing/assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-[#F5F3ED] text-gray-800 py-8 sm:py-12 px-4 sm:px-8 md:px-14">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] 2xl:grid-cols-[300px_1fr] place-content-center place-items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
                    {/* Logo and Contact Info */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src={logo} alt="Logo Galería Innovar" width={50} height={50} />
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Galeria Innovar</h2>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700 text-center lg:text-left">
                            <p>
                                <span className="font-medium">Llamar Ahora:</span> (123) 456-7891
                            </p>
                            <p>
                                <span className="font-medium">Escribirnos:</span> atencion@muebleria.com
                            </p>
                            <p className="flex items-start justify-center lg:justify-start gap-2">
                                <span className="text-gray-600">
                                    <IoLocationOutline />
                                </span>
                                <span>Santuario, calle 32 con 15ava</span>
                            </p>
                        </div>
                    </div>

                    {/* Information Links */}
                    <div className="text-center w-full">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Información</h3>
                            <nav>
                                {/* Desktop: horizontal | Mobile: vertical */}
                                <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-4 text-sm text-gray-700">
                                    <li>
                                        <Link href="/politica-privacidad" className="hover:text-[#6B705C] transition-colors">
                                            Política de privacidad
                                        </Link>
                                    </li>
                                    <li className="hidden sm:block">
                                        <span className="border-r border-2 border-gray-500 mx-2" />
                                    </li>
                                    <li>
                                        <Link href="/politica-reembolso" className="hover:text-[#6B705C] transition-colors">
                                            Política de Reembolso
                                        </Link>
                                    </li>
                                    <li className="hidden sm:block">
                                        <span className="border-r border-2 border-gray-500 mx-2" />
                                    </li>
                                    <li>
                                        <Link href="/terminos-servicio" className="hover:text-[#6B705C] transition-colors">
                                            Términos de servicio
                                        </Link>
                                    </li>
                                    <li className="hidden sm:block">
                                        <span className="border-r border-2 border-gray-500 mx-2" />
                                    </li>
                                    <li>
                                        <Link href="/politica-envio" className="hover:text-[#6B705C] transition-colors">
                                            Política de envío
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-300 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
                        @ 2025 Galeria Innovar. Todos los derechos reservados
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex gap-4">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#6B705C] transition-colors"
                            aria-label="Facebook"
                        >
                            <FaFacebook size={22} />
                        </Link>
                        <Link
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#6B705C] transition-colors"
                            aria-label="YouTube"
                        >
                            <FaYoutube size={22} />
                        </Link>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#6B705C] transition-colors"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={22} />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#6B705C] transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter size={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

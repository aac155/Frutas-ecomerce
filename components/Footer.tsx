import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { tiendaConfig } from "@/configuracion-tienda";

export default function Footer() {
    return (
        <footer className="bg-[var(--color-secondary)] text-white pt-12 pb-6 mt-auto">
            <div className="container mx-auto px-6">
                {/* Map Section - Low Saturation and Rounded */}
                <div className="mb-12 w-full h-64 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white/10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.23456789!2d-99.0123456!3d19.2890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE3JzIwLjQiTiA5OcKwMDAnNDQuNCJX!5e0!3m2!1ses-419!2smx!4v1600000000000!5m2!1ses-419!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "grayscale(0.4) saturate(0.6)" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Metro Tláhuac"
                        className="w-full h-full"
                    ></iframe>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold font-heading mb-4 text-[var(--color-accent)]">
                            FrutasDesh
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            {tiendaConfig.pilares.mision.texto}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading text-[var(--color-accent)]">Enlaces</h4>
                        <ul className="space-y-2">
                            <li><Link href="#store" className="hover:text-[var(--color-accent)] transition-colors">Tienda</Link></li>
                            <li><Link href="#about" className="hover:text-[var(--color-accent)] transition-colors">Nosotros</Link></li>
                            <li><Link href="#certifications" className="hover:text-[var(--color-accent)] transition-colors">Certificaciones</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading text-[var(--color-accent)]">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                                <span className="text-sm">{tiendaConfig.contacto.direccion}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-[var(--color-accent)]" />
                                <span className="text-sm">{tiendaConfig.contacto.telefono}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                                <span className="text-sm">{tiendaConfig.contacto.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading text-[var(--color-accent)]">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href={tiendaConfig.redesSociales.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-all">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href={tiendaConfig.redesSociales.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-all">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href={tiendaConfig.redesSociales.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-all">
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm opacity-75">
                    <p>© {new Date().getFullYear()} Colectivo Nutricional. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

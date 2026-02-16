import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
    return (
        <footer className="bg-[var(--color-secondary)] text-white py-12 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold font-heading mb-4 text-[var(--color-accent)]">
                            FrutasDesh
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            {siteConfig.pillars.mission.text}
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
                                <span className="text-sm">{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-[var(--color-accent)]" />
                                <span className="text-sm">{siteConfig.contact.phone}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                                <span className="text-sm">{siteConfig.contact.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 font-heading text-[var(--color-accent)]">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-all">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-all">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 hover:bg-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-all">
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

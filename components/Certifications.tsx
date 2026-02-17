"use client";

import React, { useState } from "react";
import { tiendaConfig } from "@/configuracion-tienda";
import { ShieldCheck, Award } from "lucide-react";

export default function Certifications() {
    const [hoveredCert, setHoveredCert] = useState<string | null>(null);

    // Helper to get an icon (placeholder)
    const getIcon = (name: string) => {
        if (name.includes("ISO")) return <ShieldCheck className="w-16 h-16 text-[var(--color-secondary)]" />;
        return <Award className="w-16 h-16 text-[var(--color-primary)]" />;
    };

    return (
        <section id="certifications" className="py-16 bg-[var(--color-bg)] border-y border-[var(--color-accent)]/20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold font-heading text-[var(--color-primary)] mb-12">
                    Certificaciones de Calidad
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {tiendaConfig.certificaciones.map((cert) => (
                        <div
                            key={cert.nombre}
                            className="relative group p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 w-48 flex flex-col items-center justify-center border border-gray-100"
                            onMouseEnter={() => setHoveredCert(cert.nombre)}
                            onMouseLeave={() => setHoveredCert(null)}
                        >
                            <div className="transition-transform duration-300 transform group-hover:-translate-y-2 cursor-help flex flex-col items-center">
                                {getIcon(cert.nombre)}
                                <p className="mt-4 font-bold text-[var(--color-primary)] text-lg">{cert.nombre}</p>
                            </div>

                            {/* Tooltip */}
                            {hoveredCert === cert.nombre && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-56 bg-white text-gray-800 text-sm p-4 shadow-2xl rounded-xl border border-[var(--color-accent)] z-20 animate-in fade-in zoom-in-95 duration-200">
                                    <p className="font-bold mb-1 text-[var(--color-secondary)]">{cert.nombre}</p>
                                    <p className="leading-snug">{cert.descripcion}</p>
                                    {/* Triangle */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

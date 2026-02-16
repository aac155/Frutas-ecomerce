"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
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

                <div className="flex flex-wrap justify-center gap-12">
                    {siteConfig.certifications.map((cert) => (
                        <div
                            key={cert.name}
                            className="relative group p-4"
                            onMouseEnter={() => setHoveredCert(cert.name)}
                            onMouseLeave={() => setHoveredCert(null)}
                        >
                            <div className="transition-transform duration-300 transform group-hover:-translate-y-2 cursor-help">
                                {getIcon(cert.name)}
                                <p className="mt-2 font-bold text-gray-700">{cert.name}</p>
                            </div>

                            {/* Tooltip */}
                            {hoveredCert === cert.name && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-48 bg-white text-gray-800 text-xs p-3 shadow-xl border border-[var(--color-accent)] z-20 animate-in fade-in zoom-in-95 duration-200">
                                    <p className="font-semibold mb-1">{cert.name}</p>
                                    <p>{cert.description}</p>
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

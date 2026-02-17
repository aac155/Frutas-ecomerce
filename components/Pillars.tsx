"use client";

import React from "react";
import Image from "next/image";
import { tiendaConfig } from "@/configuracion-tienda";

export default function Pillars() {
    const pillars = [
        tiendaConfig.pilares.mision,
        tiendaConfig.pilares.vision,
        tiendaConfig.pilares.valores,
        tiendaConfig.pilares.diferenciador,
    ];

    return (
        <section id="pillars" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition-transform hover:-translate-y-2 duration-300">
                            {/* Rounded Special: Excepción solicitada - Keeping visual style but wrapped in card */}
                            <div className="relative w-40 h-40 mb-6 bg-gray-100 rounded-special overflow-hidden shadow-md border-4 border-[var(--color-bg)]">
                                <Image
                                    src={pillar.imagen}
                                    alt={pillar.titulo}
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-2 text-[var(--color-primary)]">
                                {pillar.titulo}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {pillar.texto}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

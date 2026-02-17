"use client";

import React from "react";
import Image from "next/image";
import { tiendaConfig } from "@/configuracion-tienda";

export default function Process() {
    return (
        <section id="process" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading text-[var(--color-primary)] mb-4">
                        {tiendaConfig.proceso.titulo}
                    </h2>
                    <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />

                    {tiendaConfig.proceso.pasos.map((step, index) => (
                        <div key={index} className="flex flex-col items-center bg-white p-4">
                            <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-[var(--color-bg)] shadow-md">
                                <Image
                                    src={step.imagen}
                                    alt={step.titulo}
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="bg-[var(--color-primary)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3">
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-[var(--color-secondary)]">
                                {step.titulo}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

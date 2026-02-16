"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

export default function Pillars() {
    const pillars = [
        siteConfig.pillars.mission,
        siteConfig.pillars.vision,
        siteConfig.pillars.values,
        siteConfig.pillars.differentiator,
    ];

    return (
        <section id="pillars" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Rounded Special: Excepción solicitada */}
                            <div className="relative w-48 h-48 mb-6 bg-gray-100 rounded-special overflow-hidden shadow-lg border-4 border-[var(--color-bg)]">
                                <Image
                                    src={pillar.image}
                                    alt={pillar.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-2 text-[var(--color-primary)]">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">
                                {pillar.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

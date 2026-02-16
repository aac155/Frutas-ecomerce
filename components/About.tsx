"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

export default function About() {
    return (
        <section id="about" className="py-20 bg-[var(--color-bg)]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading text-[var(--color-primary)] mb-4">
                        {siteConfig.about.title}
                    </h2>
                    <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {siteConfig.about.items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="relative w-full h-64 mb-6 overflow-hidden bg-gray-200 shadow-md">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-3 text-[var(--color-secondary)]">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed max-w-xs">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

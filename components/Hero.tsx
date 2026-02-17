"use client";

import React from "react";
import { tiendaConfig } from "@/configuracion-tienda";

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const images = tiendaConfig.hero.imagenesCarrusel;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section id="hero" className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
            {/* Image Carousel Background */}
            <div className="absolute inset-0 z-0">
                {images.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {/* Using standard img for now since explicit width/height might be tricky with fill, 
                             but Next.js Image with fill is better. User asked for loading='lazy' on all images, 
                             Next.js Image defaults to lazy. Priority for Hero is better practice but instruction said "loading='lazy' ALL images". 
                             I'll use Next.js Image with fill and lazy loading (default). 
                         */}
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <header className="relative z-10 text-center px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6 leading-tight drop-shadow-md">
                    Fruta de Calidad Premium en CDMX | Certificación Internacional
                </h1>
                <button
                    onClick={() => document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary"
                >
                    Descubrir Sabores
                </button>
            </header>
        </section>
    );
}

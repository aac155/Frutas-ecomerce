"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";

export default function Hero() {
    return (
        <section id="hero" className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder for video. In production, this would be a real video file. 
             Since I don't have the video file, I'll use a commercially available placeholder or a div with a gradient/image.
             The user requested a video loop. I will code it to look for /video/hero-loop.mp4 but fallback to a nice background if missing.
         */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src={siteConfig.hero.video} type="video/mp4" />
                    {/* Fallback if video fails or is missing during dev */}
                    <div className="h-full w-full bg-neutral-800" />
                </video>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6 leading-tight drop-shadow-md">
                    "{siteConfig.hero.text}"
                </h1>
                <button
                    onClick={() => document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary"
                >
                    Descubrir Sabores
                </button>
            </div>
        </section>
    );
}

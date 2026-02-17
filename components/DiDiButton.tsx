"use client";

import React from "react";
import { Bike } from "lucide-react";

export default function DiDiButton() {
    return (
        <a
            href="https://www.didi-food.com" // Placeholder link
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-[#FF7D00] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
            aria-label="Pedir en DiDi"
        >
            {/* Double Ring Pulse Animation */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF7D00] opacity-75 animate-ping duration-[2000ms]"></span>
            <span className="absolute inline-flex h-[120%] w-[120%] rounded-full bg-[#FF7D00] opacity-50 animate-ping delay-300 duration-[2000ms]"></span>

            {/* DiDi SVG Logo */}
            <svg viewBox="0 0 100 40" fill="currentColor" className="w-12 h-6 relative z-10">
                <path d="M15,5 Q25,5 25,20 T15,35 H5 V5 H15 M15,10 H10 V30 H15 Q20,30 20,20 T15,10 Z M50,10 V30 H55 V10 H50 M52.5,2 A2.5,2.5 0 1,1 52.5,7 A2.5,2.5 0 1,1 52.5,2 M80,5 Q90,5 90,20 T80,35 H70 V5 H80 M80,10 H75 V30 H80 Q85,30 85,20 T80,10 Z M35,10 V30 H40 V10 H35 M37.5,2 A2.5,2.5 0 1,1 37.5,7 A2.5,2.5 0 1,1 37.5,2" />
            </svg>

            <span className="absolute right-full mr-3 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
                Pedir en DiDi
            </span>
        </a>
    );
}

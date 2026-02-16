"use client";

import React from "react";
import { Bike } from "lucide-react";

export default function DiDiButton() {
    return (
        <a
            href="https://www.didi-food.com" // Placeholder link
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 right-6 z-40 bg-[#FF7D00] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
            aria-label="Pedir en DiDi"
        >
            <Bike className="w-8 h-8 group-hover:animate-bounce" />
            <span className="absolute right-full mr-3 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
                Pedir en DiDi
            </span>
        </a>
    );
}

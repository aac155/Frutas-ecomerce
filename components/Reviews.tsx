"use client";

import React from "react";
import { Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Reviews() {
    return (
        <section id="reviews" className="py-20 bg-[var(--color-bg)]">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold font-heading text-center text-[var(--color-primary)] mb-12">
                    Lo que dicen nuestros clientes
                </h2>

                {/* Grid autoadaptable: si quito 1, los otros se acomodan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {siteConfig.reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-[var(--color-accent)]"
                        >
                            <div className="flex text-[var(--color-accent)] mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                            <p className="font-bold text-[var(--color-secondary)] text-sm">- {review.user}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

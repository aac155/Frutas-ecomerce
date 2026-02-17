
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { tiendaConfig } from "@/configuracion-tienda";
import { useStore, Product } from "@/context/store-context";

export default function Store() {
    const { addToCart } = useStore();
    const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

    const handleAddToCart = (product: Product) => {
        addToCart(product, 1, []); // No toppings
    };

    const sortedProducts = [...tiendaConfig.tienda.productos].sort((a, b) => {
        if (sortOrder === "asc") return a.precio - b.precio;
        if (sortOrder === "desc") return b.precio - a.precio;
        return 0;
    });

    return (
        <section id="store" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-heading text-[var(--color-primary)] mb-4">
                        {tiendaConfig.tienda.titulo}
                    </h2>
                    <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto mb-8" />

                    {/* Sorting Controls */}
                    <div className="flex justify-center gap-4 mb-8">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-[var(--color-primary)]"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as any)}
                        >
                            <option value="default">Orden por Defecto</option>
                            <option value="asc">Precio: Menor a Mayor</option>
                            <option value="desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </div>

                {/* Flex System: Centered and wrapped */}
                <div className="flex flex-wrap justify-center gap-12">
                    {sortedProducts.map((producto, index) => (
                        <div
                            key={producto.id}
                            className={`group relative bg-[whitesmoke] rounded-[3rem] border border-[var(--color-accent)]/20 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] aspect-square hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-2/3 p-6 overflow-hidden bg-[whitesmoke] rounded-[2.5rem]">
                                <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-[var(--color-secondary)]/5 blur-3xl transform group-hover:scale-125 transition-transform duration-700"></div>
                                <div className="relative w-full h-full drop-shadow-2xl">
                                    <Image
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        fill
                                        loading="lazy"
                                        className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 rounded-[2rem]"
                                    />
                                </div>
                            </div>

                            {/* Clean Info & Neon Button */}
                            <div className="p-6 pt-0 flex flex-col items-center text-center flex-grow justify-end pb-8">
                                <h3 className="text-2xl font-bold font-heading mb-2 text-[var(--color-primary)]">
                                    {producto.nombre}
                                </h3>

                                <span className="text-3xl text-[var(--color-primary)] mb-6 font-[family-name:var(--font-playfair)]">
                                    MXN {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(producto.precio)}
                                </span>

                                <button
                                    onClick={() => handleAddToCart({
                                        id: producto.id,
                                        name: producto.nombre,
                                        price: producto.precio,
                                        image: producto.imagen,
                                        description: producto.descripcion
                                    })}
                                    className="w-full bg-[var(--color-primary)] text-white py-3 rounded-full font-bold uppercase tracking-wider shadow-lg transition-all duration-300 relative overflow-hidden group/btn border border-white/20 hover:shadow-[0_0_15px_#FF7D00] hover:border-[#FF7D00]/50"
                                >
                                    <span className="relative z-10">Añadir</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

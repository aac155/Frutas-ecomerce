
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
                <div className="flex flex-wrap justify-center gap-8">
                    {sortedProducts.map((producto, index) => (
                        <div
                            key={producto.id}
                            className={`group relative bg-white rounded-[1.5rem] border border-transparent hover:border-orange-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col w-full sm:w-[45%] lg:w-[30%] xl:w-[22%] aspect-[3/4] animate-in fade-in slide-in-from-bottom-4`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Image Container - Clean & Visible */}
                            <div className="relative w-full aspect-square overflow-hidden rounded-[1.5rem] p-4">
                                <Image
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    fill
                                    loading="lazy"
                                    className="object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Clean Info */}
                            <div className="p-6 pt-2 flex flex-col items-center text-center flex-grow justify-between">
                                <div>
                                    <h3 className="text-xl font-bold font-heading mb-1 text-[var(--color-primary)]">
                                        {producto.nombre}
                                    </h3>

                                    <span className="text-2xl text-[var(--color-secondary)] font-bold block mb-4">
                                        MXN {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(producto.precio)}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleAddToCart({
                                        id: producto.id,
                                        name: producto.nombre,
                                        price: producto.precio,
                                        image: producto.imagen,
                                        description: producto.descripcion
                                    })}
                                    className="w-full bg-[var(--color-primary)] text-white py-3 rounded-full font-bold uppercase tracking-wide text-sm hover:bg-[var(--color-primary)]/90 transition-colors"
                                >
                                    Añadir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

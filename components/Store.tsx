"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { tiendaConfig } from "@/configuracion-tienda";
import { useStore, Product } from "@/context/store-context";

// Modal component specific to the store
function ToppingsModal({
    product,
    isOpen,
    onClose,
    onConfirm
}: {
    product: Product | null,
    isOpen: boolean,
    onClose: () => void,
    onConfirm: (toppings: any[]) => void
}) {
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

    if (!isOpen || !product) return null;

    const toggleTopping = (toppingId: string) => {
        setSelectedToppings(prev =>
            prev.includes(toppingId)
                ? prev.filter(id => id !== toppingId)
                : [...prev, toppingId]
        );
    };

    const handleConfirm = () => {
        const toppings = tiendaConfig.tienda.toppings.filter(t => selectedToppings.includes(t.id));
        onConfirm(toppings);
        setSelectedToppings([]);
        onClose();
    };

    const currentPrice = product.price + tiendaConfig.tienda.toppings
        .filter(t => selectedToppings.includes(t.id))
        .reduce((sum, t) => sum + t.precio, 0);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl p-4">
            <div className="bg-white/90 backdrop-blur-md p-6 w-full max-w-md shadow-2xl rounded-3xl animate-in fade-in zoom-in-95 duration-200 border border-white/20">
                <h3 className="text-2xl font-bold font-heading text-[var(--color-primary)] mb-2">
                    Personaliza tu {product.name}
                </h3>
                <p className="text-gray-600 mb-4">Agrega +100g de tus frutas favoritas.</p>

                <div className="space-y-3 mb-6">
                    {tiendaConfig.tienda.toppings.map((topping) => (
                        <div
                            key={topping.id}
                            onClick={() => toggleTopping(topping.id)}
                            className={`flex justify-between items-center p-3 border cursor-pointer transition-colors rounded-xl ${selectedToppings.includes(topping.id)
                                ? "border-[var(--color-primary)] bg-[var(--color-bg)]"
                                : "border-gray-200 hover:border-[var(--color-accent)]"
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`w-5 h-5 border flex items-center justify-center rounded-full ${selectedToppings.includes(topping.id) ? "bg-[var(--color-primary)] border-[var(--color-primary)]" : "border-gray-300"
                                    }`}>
                                    {selectedToppings.includes(topping.id) && <span className="text-white text-xs">✓</span>}
                                </div>
                                <span>{topping.nombre}</span>
                            </div>
                            <span className="font-bold text-[var(--color-secondary)]">+{formatPrice(topping.precio)}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="text-xl font-bold">Total: {formatPrice(currentPrice)}</div>
                    <div className="space-x-3">
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 px-4 py-2"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="btn-primary"
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Store() {
    const { addToCart } = useStore();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

    const handleAddToCartClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmToppings = (toppings: any[]) => {
        if (selectedProduct) {
            addToCart(selectedProduct, 1, toppings);
        }
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
                            className={`group relative bg-[whitesmoke] rounded-[2.5rem] border border-[var(--color-accent)]/20 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Container with Circular Background */}
                            <div className="relative aspect-square w-full p-8 overflow-hidden bg-[whitesmoke]">
                                <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-[var(--color-secondary)]/5 blur-3xl transform group-hover:scale-125 transition-transform duration-700"></div>
                                <div className="relative w-full h-full drop-shadow-2xl">
                                    <Image
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        fill
                                        loading="lazy"
                                        className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                                    />
                                </div>
                            </div>

                            {/* Clean Info */}
                            <div className="p-8 pt-0 flex flex-col items-center text-center flex-grow">
                                <h3 className="text-2xl font-bold font-heading mb-2 text-[var(--color-primary)]">
                                    {producto.nombre}
                                </h3>

                                <span className="text-3xl text-[var(--color-primary)] mb-6 font-[family-name:var(--font-playfair)]">
                                    {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(producto.precio)}
                                </span>

                                <button
                                    onClick={() => handleAddToCartClick({
                                        id: producto.id,
                                        name: producto.nombre,
                                        price: producto.precio,
                                        image: producto.imagen,
                                        description: producto.descripcion
                                    })}
                                    className="w-full mt-auto bg-[var(--color-primary)] text-[var(--color-secondary)] py-3 rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn border border-[var(--color-secondary)]/30"
                                >
                                    <span className="relative z-10">Comprar Ahora</span>
                                    <div className="absolute inset-0 bg-[var(--color-secondary)]/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ToppingsModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmToppings}
            />
        </section>
    );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
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
        const toppings = siteConfig.store.toppings.filter(t => selectedToppings.includes(t.id));
        onConfirm(toppings);
        setSelectedToppings([]);
        onClose();
    };

    const currentPrice = product.price + siteConfig.store.toppings
        .filter(t => selectedToppings.includes(t.id))
        .reduce((sum, t) => sum + t.price, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-6 w-full max-w-md shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-2xl font-bold font-heading text-[var(--color-primary)] mb-2">
                    Personaliza tu {product.name}
                </h3>
                <p className="text-gray-600 mb-4">Agrega +100g de tus frutas favoritas.</p>

                <div className="space-y-3 mb-6">
                    {siteConfig.store.toppings.map((topping) => (
                        <div
                            key={topping.id}
                            onClick={() => toggleTopping(topping.id)}
                            className={`flex justify-between items-center p-3 border cursor-pointer transition-colors ${selectedToppings.includes(topping.id)
                                    ? "border-[var(--color-primary)] bg-[var(--color-bg)]"
                                    : "border-gray-200 hover:border-[var(--color-accent)]"
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <div className={`w-5 h-5 border flex items-center justify-center ${selectedToppings.includes(topping.id) ? "bg-[var(--color-primary)] border-[var(--color-primary)]" : "border-gray-300"
                                    }`}>
                                    {selectedToppings.includes(topping.id) && <span className="text-white text-xs">✓</span>}
                                </div>
                                <span>{topping.name}</span>
                            </div>
                            <span className="font-bold text-[var(--color-secondary)]">+${topping.price}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="text-xl font-bold">Total: ${currentPrice}</div>
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

    const handleAddToCartClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmToppings = (toppings: any[]) => {
        if (selectedProduct) {
            addToCart(selectedProduct, 1, toppings);
        }
    };

    return (
        <section id="store" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-heading text-[var(--color-primary)] mb-4">
                        {siteConfig.store.title}
                    </h2>
                    <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto" />
                </div>

                {/* Grid System: Auto-fill/fit to center items if fewer than 5 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-center">
                    {siteConfig.store.products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-[var(--color-bg)] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                                {/* Fallback for missing images */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    Sin Imagen
                                </div>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Add Button Overlay */}
                                <button
                                    onClick={() => handleAddToCartClick(product)}
                                    className="absolute bottom-4 right-4 bg-[var(--color-primary)] text-white p-3 shadow-lg hover:bg-[var(--color-secondary)] transition-colors transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
                                    aria-label="Agregar al carrito"
                                >
                                    <Plus className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold font-heading mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                                </div>
                                <div className="flex justify-between items-end mt-auto">
                                    <span className="text-2xl font-bold text-[var(--color-secondary)]">
                                        ${product.price}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCartClick(product)}
                                        className="text-sm text-[var(--color-primary)] font-bold hover:underline"
                                    >
                                        PERSONALIZAR
                                    </button>
                                </div>
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

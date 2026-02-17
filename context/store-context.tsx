"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
    toppings: string[]; // List of topping names
    totalPrice: number; // Base + toppings
}

interface User {
    name: string;
    email: string;
}

interface StoreContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number, toppings: any[]) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const addToCart = (product: Product, quantity: number, toppings: any[]) => {
        // toppings are from tiendaConfig: { id, nombre, precio }
        const toppingsPrice = toppings.reduce((sum, t) => sum + t.precio, 0);
        const itemTotalPrice = (product.price + toppingsPrice) * quantity;

        // Create a unique ID based on product + toppings to distinguish variations
        const cartItemId = `${product.id}-${toppings.map(t => t.id).join("-")}`;

        setCart((prev) => {
            const existing = prev.find((item) => item.id === cartItemId);
            if (existing) {
                return prev.map((item) =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + quantity, totalPrice: item.totalPrice + itemTotalPrice }
                        : item
                );
            }
            return [
                ...prev,
                {
                    ...product,
                    id: cartItemId, // Use unique ID for cart item
                    quantity,
                    toppings: toppings.map(t => t.nombre),
                    totalPrice: itemTotalPrice,
                },
            ];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== itemId));
    };

    const clearCart = () => setCart([]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    const login = (email: string) => {
        setUser({ name: "Usuario Demo", email });
        closeAuthModal();
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <StoreContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                isCartOpen,
                toggleCart,
                isAuthModalOpen,
                openAuthModal,
                closeAuthModal,
                user,
                login,
                logout,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}

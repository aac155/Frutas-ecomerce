"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { useStore } from "@/context/store-context";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart, toggleCart, openAuthModal, user } = useStore();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", href: "#hero" },
        { name: "Tienda", href: "#store" },
        { name: "Nosotros", href: "#about" },
        { name: "Proceso", href: "#process" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold font-heading text-[var(--color-primary)]">
                    Fruti<span className="text-[var(--color-secondary)]">Nutric</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[var(--color-secondary)] font-medium hover:text-[var(--color-primary)] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Icons / Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={openAuthModal}
                        className="flex items-center space-x-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        <User className="h-5 w-5" />
                        <span className="text-sm font-medium">{user ? user.name.split(" ")[0] : "Ingresar"}</span>
                    </button>

                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        <ShoppingBag className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-[var(--color-secondary)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[var(--color-bg)] border-b border-gray-200">
                    <div className="flex flex-col p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-[var(--color-secondary)]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    openAuthModal();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-[var(--color-secondary)]"
                            >
                                <User className="h-5 w-5" />
                                <span>{user ? user.name : "Ingresar / Registrarse"}</span>
                            </button>
                            <button
                                onClick={() => {
                                    toggleCart();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-[var(--color-secondary)]"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                <span>Carrito ({cartCount})</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

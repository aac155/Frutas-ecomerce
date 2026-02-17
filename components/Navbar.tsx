"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Added Import
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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[var(--color-primary)]/95 backdrop-blur-md shadow-md py-4" : "bg-[var(--color-primary)] py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-heading text-white">
                    <div className="relative w-10 h-10 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                        {/* Placeholder or Logo */}
                        <Image
                            src={siteConfig.metadata.logoPath || "/img/logo.png"}
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                    <span>
                        Fruti<span className="text-white/90">Nutric</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/90 font-medium hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Icons / Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={openAuthModal}
                        className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                    >
                        <User className="h-5 w-5" />
                        <span className="text-sm font-medium">{user ? user.name.split(" ")[0] : "Ingresar"}</span>
                    </button>

                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-white/90 hover:text-white transition-colors"
                    >
                        <ShoppingBag className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-white text-[var(--color-primary)] text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[var(--color-primary)] border-b border-white/10 shadow-xl">
                    <div className="flex flex-col p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-white/90 hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex justify-between items-center pt-4 border-t border-white/20">
                            <button
                                onClick={() => {
                                    openAuthModal();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-white/90"
                            >
                                <User className="h-5 w-5" />
                                <span>{user ? user.name : "Ingresar / Registrarse"}</span>
                            </button>
                            <button
                                onClick={() => {
                                    toggleCart();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-white/90"
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

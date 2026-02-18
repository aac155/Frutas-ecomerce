"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, CreditCard, Banknote, FileText } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { useStore } from "@/context/store-context";

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cart, removeFromCart, clearCart } = useStore();
    const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "success">("cart");
    const [paymentMethod, setPaymentMethod] = useState("");

    if (!isCartOpen) return null;

    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    const handleCheckout = () => setCheckoutStep("shipping");
    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStep("payment");
    };
    const handlePayment = () => {
        setCheckoutStep("success");
        // Simulate API call
        setTimeout(() => {
            // Could auto-close or keep success message
        }, 2000);
    };

    const close = () => {
        toggleCart();
        if (checkoutStep === "success") {
            clearCart();
            setCheckoutStep("cart");
        }
    };

    const buttonClass = "w-full bg-[var(--color-primary)] text-white py-4 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-[var(--color-primary)]/90 transition-all uppercase tracking-wide";

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

            {/* Drawer - Glassmorphism Card Styling */}
            <div className="relative w-full max-w-md mx-4 my-4 h-[calc(100vh-2rem)] rounded-[2.5rem] bg-white/90 backdrop-blur-xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border border-white/40 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[var(--color-primary)]/5">
                    <h2 className="text-2xl font-bold font-heading text-[var(--color-primary)]">
                        {checkoutStep === "cart" ? "Tu Carrito" :
                            checkoutStep === "shipping" ? "Envío" :
                                checkoutStep === "payment" ? "Pago" : "¡Pedido Exitoso!"}
                    </h2>
                    {/* Prominent Close Button */}
                    <button onClick={close} className="bg-white/50 p-2 rounded-full hover:bg-white hover:text-red-500 transition-all text-[var(--color-primary)] shadow-sm">
                        <X className="w-8 h-8" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
                    {checkoutStep === "cart" && (
                        <>
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">
                                    <p className="text-lg">Tu carrito está vacío.</p>
                                    <button onClick={close} className="mt-6 text-[var(--color-primary)] font-bold hover:underline">
                                        Explorar Productos
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4 items-center">
                                            {/* Product Thumbnail */}
                                            <div className="w-24 h-24 relative flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>

                                            <div className="flex-grow">
                                                <h4 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h4>

                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm text-gray-500">Cantidad: {item.quantity}</span>
                                                    <span className="text-lg font-bold text-[var(--color-primary)] font-playfair">
                                                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.totalPrice)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {checkoutStep === "shipping" && (
                        <form id="shipping-form" onSubmit={handleShippingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1 text-[var(--color-secondary)]">Nombre Completo</label>
                                <input type="text" required className="w-full border-gray-300 rounded-xl p-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-white/50" placeholder="Ingresa tu nombre completo" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1 text-[var(--color-secondary)]">Dirección Completa</label>
                                <input type="text" required className="w-full border-gray-300 rounded-xl p-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-white/50" placeholder="Calle, Número, Col..." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-[var(--color-secondary)]">Ciudad</label>
                                    <input type="text" required className="w-full border-gray-300 rounded-xl p-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-white/50" placeholder="CDMX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-[var(--color-secondary)]">Alcaldía</label>
                                    <input type="text" required className="w-full border-gray-300 rounded-xl p-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-white/50" placeholder="CDMX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-[var(--color-secondary)]">CP</label>
                                    <input type="text" required className="w-full border-gray-300 rounded-xl p-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-white/50" placeholder="00000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-[var(--color-secondary)]">Teléfono</label>
                                    <input type="text" required className="w-full border-gray-300 rounded-xl p-3 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-white/50" placeholder="55 1234 5678" />
                                </div>
                            </div>
                        </form>
                    )}

                    {checkoutStep === "payment" && (
                        <div className="space-y-4">
                            <h3 className="font-bold mb-2 text-[var(--color-secondary)]">Selecciona Método de Pago</h3>
                            {[
                                { id: "stripe", name: "Tarjeta (Crédito/Débito)", icon: <CreditCard className="w-5 h-5" /> },
                                { id: "oxxo", name: "Oxxo Pay", icon: <Banknote className="w-5 h-5" /> },
                                { id: "transfer", name: "Transferencia SPEI", icon: <Banknote className="w-5 h-5" /> },
                                { id: "cash", name: "Pago Contra Entrega", icon: <Banknote className="w-5 h-5" /> },
                            ].map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === method.id
                                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]"
                                        : "border-gray-200 hover:bg-white hover:shadow-md bg-white/50"
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${paymentMethod === method.id ? "bg-[var(--color-primary)] text-white" : "bg-gray-100 text-gray-500"}`}>
                                        {method.icon}
                                    </div>
                                    <span className="font-medium">{method.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {checkoutStep === "success" && (
                        <div className="text-center py-8 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-[#F5F5DC] text-[#4F7942] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#4F7942]/20">
                                <FileText className="w-10 h-10" />
                            </div>

                            <h3 className="text-2xl font-bold font-heading text-[var(--color-primary)] mb-2">
                                ¡Gracias por tu compra!
                            </h3>
                            <p className="text-gray-600 mb-6 text-sm">
                                Tu pedido ha sido registrado con éxito. <br />
                                <span className="font-semibold text-[var(--color-secondary)]">Muestra el ticket digital en sucursal para recibir tus productos.</span>
                            </p>

                            {/* Digital Ticket */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-left mb-8 relative mx-2">
                                {/* Decorator - Ripped Edge Effect or just a Line */}
                                <div className="border-b-2 border-dashed border-gray-300 mb-4 pb-2 text-center">
                                    <h4 className="font-bold text-xl text-gray-800 uppercase tracking-widest">FrutiNutric</h4>
                                    <p className="text-xs text-gray-500">Ticket de Compra</p>
                                </div>

                                <div className="text-xs text-gray-500 mb-4 space-y-1">
                                    <p className="flex justify-between"><span>Fecha:</span> <span>{new Date().toLocaleDateString()}</span></p>
                                    <p className="flex justify-between"><span>Orden:</span> <span className="font-mono text-gray-800 font-bold">#FT-{Math.floor(1000 + Math.random() * 9000)}</span></p>
                                    <p className="flex justify-between"><span>Sucursal:</span> <span>{siteConfig.contact.address}</span></p>
                                </div>

                                <div className="border-t border-b border-gray-100 py-3 mb-3 space-y-2">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-800"><span className="font-bold">{item.quantity}x</span> {item.name}</span>
                                            <span className="text-gray-600 font-mono">
                                                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.totalPrice)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center text-lg font-bold text-[var(--color-primary)] mb-6">
                                    <span>Total</span>
                                    <span>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cart.reduce((a, c) => a + c.totalPrice, 0))}</span>
                                </div>

                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Gracias por su preferencia</p>
                                </div>
                            </div>

                            <button className="w-full bg-[#4F7942] text-white py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-[#3E5F33] transition-all flex items-center justify-center gap-2 mb-3">
                                <FileText className="w-5 h-5" />
                                Descargar Ticket PDF
                            </button>

                            <button onClick={close} className="text-sm text-gray-500 hover:text-gray-800 underline">
                                Cerrar Ventana
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {checkoutStep !== "success" && cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
                        {checkoutStep === "cart" && (
                            <>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <span>Subtotal:</span>
                                        <span>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total / 1.16)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-600">
                                        <span>IVA (16%):</span>
                                        <span>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total - (total / 1.16))}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-bold border-t border-gray-200 pt-3">
                                        <span className="text-[var(--color-secondary)]">Total:</span>
                                        <span className="text-[var(--color-primary)] font-playfair">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}</span>
                                    </div>
                                </div>
                                <button onClick={handleCheckout} className={buttonClass}>
                                    Proceder al Pago
                                </button>
                            </>
                        )}
                        {checkoutStep === "shipping" && (
                            <button form="shipping-form" type="submit" className={buttonClass}>
                                Ir a Pagar
                            </button>
                        )}
                        {checkoutStep === "payment" && (
                            <button
                                onClick={handlePayment}
                                className={`${buttonClass} ${!paymentMethod ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!paymentMethod}
                            >
                                Pagar {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)}
                            </button>
                        )}
                        {checkoutStep !== "cart" && (
                            <button
                                onClick={() => setCheckoutStep(prev => prev === "payment" ? "shipping" : "cart")}
                                className="text-sm text-gray-500 hover:text-[var(--color-primary)] underline mt-4 w-full text-center transition-colors"
                            >
                                Volver
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

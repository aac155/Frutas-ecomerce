"use client";

import React, { useState } from "react";
import { X, Trash2, CreditCard, Banknote, Truck } from "lucide-react";
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
        // Reset state after closing if needed? 
        // Maybe keep it if user accidentally closes.
        if (checkoutStep === "success") {
            clearCart();
            setCheckoutStep("cart");
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b flex justify-between items-center bg-[var(--color-bg)]">
                    <h2 className="text-xl font-bold font-heading text-[var(--color-primary)]">
                        {checkoutStep === "cart" ? "Tu Carrito" :
                            checkoutStep === "shipping" ? "Pago" :
                                checkoutStep === "payment" ? "Pago" : "¡Pedido Exitoso!"}
                    </h2>
                    <button onClick={close} className="text-gray-500 hover:text-gray-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6">
                    {checkoutStep === "cart" && (
                        <>
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">
                                    <p>Tu carrito está vacío.</p>
                                    <button onClick={close} className="mt-4 text-[var(--color-primary)] font-bold hover:underline">
                                        Ir a la tienda
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                                            <div className="w-20 h-20 bg-gray-100 relative flex-shrink-0">
                                                {/* Placeholder image */}
                                                <div className="absolute inset-0 bg-gray-200" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-gray-800">{item.name}</h4>
                                                {item.toppings.length > 0 && (
                                                    <p className="text-xs text-gray-500">
                                                        + {item.toppings.join(", ")}
                                                    </p>
                                                )}
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                                    <span className="font-bold text-[var(--color-secondary)]">${item.totalPrice}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 self-start"
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
                                <label className="block text-sm font-bold mb-1">Nombre Completo</label>
                                <input type="text" required className="input-flat w-full border p-2" placeholder="Calle, Número, Col..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Dirección Completa</label>
                                <input type="text" required className="input-flat w-full border p-2" placeholder="Calle, Número, Col..." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Ciudad</label>
                                    <input type="text" required className="input-flat w-full border p-2" placeholder="Calle, Número, Col..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Alcaldía</label>
                                    <input type="text" required className="input-flat w-full border p-2" placeholder="CDMX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">CP</label>
                                    <input type="text" required className="input-flat w-full border p-2" placeholder="00000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Número de Teléfono</label>
                                    <input type="text" required className="input-flat w-full border p-2" placeholder="Calle, Número, Col..." />
                                </div>
                            </div>
                        </form>
                    )}

                    {checkoutStep === "payment" && (
                        <div className="space-y-4">
                            <h3 className="font-bold mb-2">Selecciona Método de Pago</h3>
                            {[
                                { id: "stripe", name: "Tarjeta (Stripe)", icon: <CreditCard className="w-5 h-5" /> },
                                { id: "oxxo", name: "Oxxo Pay", icon: <Banknote className="w-5 h-5" /> },
                                { id: "7eleven", name: "7-Eleven", icon: <Banknote className="w-5 h-5" /> },
                                { id: "transfer", name: "Transferencia", icon: <Banknote className="w-5 h-5" /> },
                            ].map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${paymentMethod === method.id
                                        ? "border-[var(--color-primary)] bg-[var(--color-bg)]"
                                        : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {method.icon}
                                    <span className="font-medium">{method.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {checkoutStep === "success" && (
                        <div className="text-center py-10 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Truck className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading text-[var(--color-secondary)] mb-2">
                                ¡Gracias por su compra!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Su pedido ha sido procesado exitosamente. Recibirá un correo de confirmación pronto.
                            </p>
                            <button onClick={close} className="btn-primary">
                                Cerrar
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {checkoutStep !== "success" && cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        {checkoutStep === "cart" && (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">Total:</span>
                                    <span className="text-2xl font-bold text-[var(--color-primary)]">${total}</span>
                                </div>
                                <button onClick={handleCheckout} className="btn-primary w-full">
                                    Proceder al Pago
                                </button>
                            </>
                        )}
                        {checkoutStep === "shipping" && (
                            <button form="shipping-form" type="submit" className="btn-primary w-full">
                                Ir a Pagar
                            </button>
                        )}
                        {checkoutStep === "payment" && (
                            <button
                                onClick={handlePayment}
                                className="btn-primary w-full"
                                disabled={!paymentMethod}
                            >
                                Pagar ${total}
                            </button>
                        )}
                        {checkoutStep !== "cart" && (
                            <button
                                onClick={() => setCheckoutStep(prev => prev === "payment" ? "shipping" : "cart")}
                                className="text-sm text-gray-500 underline mt-3 w-full text-center"
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

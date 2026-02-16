"use client";

import React, { useState } from "react";
import { X, Mail, Lock, ArrowRight } from "lucide-react";
import { useStore } from "@/context/store-context";

export default function AuthModal() {
    const { isAuthModalOpen, closeAuthModal, login } = useStore();
    const [step, setStep] = useState<"login" | "register" | "verify">("login");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    if (!isAuthModalOpen) return null;

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("verify");
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === "527237") {
            alert("Gracias por verificar, registro completado");
            login(email);
            setStep("login"); // Reset for next time or close
        } else {
            setError("Código incorrecto. Intenta con 527237");
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email); // Simular login directo
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={closeAuthModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold font-heading text-[var(--color-primary)] mb-6 text-center">
                    {step === "login" ? "Bienvenido de Nuevo" : step === "register" ? "Crear Cuenta" : "Verificar Cuenta"}
                </h2>

                {step === "login" && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none"
                                    placeholder="******"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2">
                            Ingresar <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-center text-sm mt-4">
                            ¿No tienes cuenta? <button type="button" onClick={() => setStep("register")} className="text-[var(--color-primary)] font-bold hover:underline">Regístrate</button>
                        </p>
                    </form>
                )}

                {step === "register" && (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none"
                                placeholder="Juan Pérez"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none"
                                placeholder="******"
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            Continuar
                        </button>
                        <p className="text-center text-sm mt-4">
                            ¿Ya tienes cuenta? <button type="button" onClick={() => setStep("login")} className="text-[var(--color-primary)] font-bold hover:underline">Ingresa</button>
                        </p>
                    </form>
                )}

                {step === "verify" && (
                    <form onSubmit={handleVerify} className="space-y-4">
                        <p className="text-sm text-gray-600 text-center mb-4">
                            Hemos enviado un código a <strong>{email}</strong>.
                        </p>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Código de Verificación</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 focus:border-[var(--color-primary)] focus:outline-none text-center text-2xl tracking-widest"
                                placeholder="000000"
                                value={code}
                                onChange={(e) => { setCode(e.target.value); setError(""); }}
                                maxLength={6}
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            Verificar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

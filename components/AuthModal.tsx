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
    const [attempts, setAttempts] = useState(0);
    const [resendTimer, setResendTimer] = useState(0);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    if (!isAuthModalOpen) return null;

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("verify");
        setResendTimer(10); // Start timer
    };

    const handleResendCode = () => {
        if (resendTimer === 0) {
            setResendTimer(10);
            alert(`Código reenviado a ${email}`);
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (attempts >= 3) {
            setError("Límite de intentos alcanzado. Contacte a soporte.");
            return;
        }

        if (code === "527237") {
            alert("Gracias por verificar, registro completado");
            login(email);
            setStep("login");
            setAttempts(0);
            setError("");
            closeAuthModal(); // Close on success
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 3) {
                setError("Límite de intentos alcanzado. Contacte a soporte.");
            } else {
                setError(`Código incorrecto. Intentos restantes: ${3 - newAttempts}`);
            }
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-xl">
            <div className="bg-white/80 backdrop-blur-md w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 rounded-3xl border border-white/20">
                <button
                    onClick={closeAuthModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
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
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white/50"
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
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white/50"
                                    placeholder="******"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2 rounded-lg shadow-lg">
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white/50"
                                placeholder="Juan Pérez"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white/50"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[var(--color-primary)] focus:outline-none bg-white/50"
                                placeholder="******"
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full rounded-lg shadow-lg">
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
                                disabled={attempts >= 3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[var(--color-primary)] focus:outline-none text-center text-2xl tracking-widest bg-white/50 disabled:opacity-50"
                                placeholder="000000"
                                value={code}
                                onChange={(e) => { setCode(e.target.value); setError(""); }}
                                maxLength={6}
                            />
                            {error && <p className="text-red-500 text-xs mt-1 font-bold">{error}</p>}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={resendTimer > 0 || attempts >= 3}
                                className="text-sm text-[var(--color-secondary)] hover:underline disabled:text-gray-400 disabled:no-underline"
                            >
                                {resendTimer > 0 ? `Reenviar en ${resendTimer}s` : "Reenviar código"}
                            </button>
                        </div>

                        <button type="submit" disabled={attempts >= 3} className="btn-primary w-full rounded-lg shadow-lg disabled:bg-gray-400">
                            Verificar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

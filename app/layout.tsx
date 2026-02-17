import type { Metadata } from "next";
import { Arvo, Open_Sans, Playfair_Display } from "next/font/google"; // Added Playfair_Display
import "./globals.css";
import { tiendaConfig } from "@/configuracion-tienda";
import { StoreProvider } from "@/context/store-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import CartDrawer from "@/components/CartDrawer";
import Chatbot from "@/components/Chatbot";

const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const playfair = Playfair_Display({ // Configured Playfair
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: tiendaConfig.metadatos.titulo,
  description: tiendaConfig.metadatos.descripcion,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${arvo.variable} ${openSans.variable} ${playfair.variable} antialiased bg-[var(--color-bg)] text-gray-800`}
      >
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <AuthModal />
          <CartDrawer />
          <Chatbot />
        </StoreProvider>
      </body>
    </html>
  );
}

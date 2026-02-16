import type { Metadata } from "next";
import { Arvo, Open_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
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

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${arvo.variable} ${openSans.variable} antialiased bg-[var(--color-bg)] text-gray-800`}
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

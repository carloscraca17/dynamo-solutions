import type { Metadata } from "next";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dynamo Solutions | Automatización y Escala",
  description:
    "Diseñamos ecosistemas digitales, optimizamos tu posicionamiento y construimos soluciones tecnológicas que convierten visitantes en clientes recurrentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} dark scroll-smooth h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#050505] text-white font-sans selection:bg-[#FF5B22]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

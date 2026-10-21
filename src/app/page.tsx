"use client";

import React, { useState } from "react";
import {
  motion,
  Variants,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Sun,
  Moon,
  X,
} from "lucide-react";

const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Onda topográfica 3D (inspirada en el video de referencia DigitalPro)
function TopographicWaveSVG({ className = "" }: { className?: string }) {
  const lines = Array.from({ length: 26 });
  return (
    <svg
      viewBox="0 0 900 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="topoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5246FF" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#9E38F5" stopOpacity="0.34" />
          <stop offset="80%" stopColor="#FF5864" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {lines.map((_, i) => {
        const offset = i * 9.5;
        const curveShift = Math.sin(i * 0.28) * 35;
        return (
          <path
            key={i}
            d={`M ${-80 + offset * 0.4} ${560 - offset * 1.4} C ${
              220 + curveShift
            } ${120 + offset * 1.2}, ${480 - curveShift} ${
              520 - offset * 1.1
            }, ${960 - offset * 0.3} ${80 + offset * 1.3}`}
            stroke="url(#topoGrad)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

// Escultura 3D de Anillos Concéntricos Iridiscentes (segundos 00:02-00:03 del video)
function IridescentRingsSculpture() {
  return (
    <div className="relative w-full h-[320px] sm:h-[440px] flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#5246FF]/30 via-[#9E38F5]/25 to-[#FF5864]/20 blur-3xl" />

      <motion.div
        animate={{
          rotateZ: [0, 6, 0, -4, 0],
          y: [0, -14, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-[0_25px_60px_rgba(139,61,255,0.38)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ringMetal1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#140F2D" />
              <stop offset="28%" stopColor="#5246FF" />
              <stop offset="58%" stopColor="#B832F5" />
              <stop offset="85%" stopColor="#FF5864" />
              <stop offset="100%" stopColor="#1A0B1E" />
            </linearGradient>
            <linearGradient id="ringMetal2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7A6B" />
              <stop offset="35%" stopColor="#9E38F5" />
              <stop offset="70%" stopColor="#2B1E66" />
              <stop offset="100%" stopColor="#090712" />
            </linearGradient>
            <linearGradient id="ringRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C6BFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#E965C9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <ellipse
            cx="250"
            cy="290"
            rx="215"
            ry="120"
            transform="rotate(-14 250 290)"
            fill="url(#ringMetal1)"
            stroke="url(#ringRim)"
            strokeWidth="2"
          />
          <ellipse
            cx="250"
            cy="282"
            rx="175"
            ry="92"
            transform="rotate(-14 250 282)"
            fill="#06050B"
            stroke="#5246FF"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />

          <ellipse
            cx="250"
            cy="245"
            rx="185"
            ry="102"
            transform="rotate(-10 250 245)"
            fill="url(#ringMetal2)"
            stroke="url(#ringRim)"
            strokeWidth="2.2"
          />
          <ellipse
            cx="250"
            cy="238"
            rx="140"
            ry="74"
            transform="rotate(-10 250 238)"
            fill="#080610"
            stroke="#B832F5"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />

          <ellipse
            cx="250"
            cy="198"
            rx="145"
            ry="78"
            transform="rotate(-6 250 198)"
            fill="url(#ringMetal1)"
            stroke="url(#ringRim)"
            strokeWidth="2.5"
          />
          <ellipse
            cx="250"
            cy="192"
            rx="100"
            ry="50"
            transform="rotate(-6 250 192)"
            fill="#07050E"
            stroke="#FF5864"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />

          <ellipse
            cx="250"
            cy="155"
            rx="82"
            ry="40"
            transform="rotate(-3 250 155)"
            fill="url(#ringMetal2)"
            stroke="url(#ringRim)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// Esfera wireframe luminosa para los ítems 01, 02, 03, 04 (como en 00:02 del video)
function WireframeSphereIcon({ index }: { index: number }) {
  return (
    <div className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5246FF]/30 via-[#9E38F5]/30 to-[#FF5864]/30 blur-sm" />
      <svg
        viewBox="0 0 36 36"
        className="w-8 h-8 relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="14"
          stroke="url(#sphereGrad)"
          strokeWidth="1.2"
          strokeDasharray={index % 2 === 0 ? "3 2" : "none"}
        />
        <ellipse
          cx="18"
          cy="18"
          rx="14"
          ry="6"
          transform={`rotate(${index * 35 + 20} 18 18)`}
          stroke="url(#sphereGrad)"
          strokeWidth="1.1"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="6"
          ry="14"
          transform={`rotate(${index * 25} 18 18)`}
          stroke="url(#sphereGrad)"
          strokeWidth="1.1"
        />
        <defs>
          <linearGradient id="sphereGrad" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="50%" stopColor="#C039E5" />
            <stop offset="100%" stopColor="#FF5864" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function DynamoLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Estado para la cuadrícula interactiva en la sección "El Manifiesto"
  const [manifestoMouse, setManifestoMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 500, y: 300, active: false });

  // Física Spring para la tarjeta interactiva "BEFORE / AFTER" de The Bellacy Studio
  const revealRaw = useMotionValue(52);
  const revealSpring = useSpring(revealRaw, {
    stiffness: 160,
    damping: 24,
    mass: 0.6,
  });

  const afterClipPath = useTransform(revealSpring, (v) => {
    const topEdge = Math.max(0, Math.min(100, v + 3));
    const bottomEdge = Math.max(0, Math.min(100, v - 3));
    return `polygon(0% 0%, ${topEdge}% 0%, ${bottomEdge}% 100%, 0% 100%)`;
  });

  const beamLeft = useTransform(revealSpring, (v) => `${v}%`);
  const afterScale = useTransform(revealSpring, [0, 50, 100], [1.015, 1.005, 1]);

  // Barra de luminosidad: 0 = Oscuro (Negro DigitalPro), 25..75 = Grises intermedios, 100 = Claro
  const [luminosity, setLuminosity] = useState<number>(0);

  const t = luminosity / 100;
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  const rgb = (
    r1: number,
    g1: number,
    b1: number,
    r2: number,
    g2: number,
    b2: number
  ) => `rgb(${lerp(r1, r2)}, ${lerp(g1, g2)}, ${lerp(b1, b2)})`;

  const bgPrimary = rgb(3, 3, 6, 246, 246, 250);
  const bgSecondary = rgb(7, 7, 12, 236, 236, 242);
  const bgCard = rgb(10, 10, 16, 255, 255, 255);
  const bgCardInner = rgb(6, 6, 10, 240, 240, 246);
  const textPrimary = rgb(250, 250, 252, 12, 12, 18);
  const textSecondary = rgb(168, 168, 182, 75, 75, 90);
  const textMuted = rgb(110, 110, 128, 115, 115, 132);
  const borderColor =
    t < 0.5
      ? `rgba(255, 255, 255, ${(0.08 + t * 0.1).toFixed(2)})`
      : `rgba(15, 15, 25, ${(0.1 + (t - 0.5) * 0.14).toFixed(2)})`;
  const navBg =
    t < 0.5
      ? `rgba(${lerp(4, 245)}, ${lerp(4, 245)}, ${lerp(8, 250)}, 0.86)`
      : `rgba(${lerp(4, 245)}, ${lerp(4, 245)}, ${lerp(8, 250)}, 0.92)`;
  const isLightModeSide = luminosity > 58;

  // MANIFIESTO — Frases cortas, palabras clave y conectores directos (Estilo 00:02 del video)
  const manifestoItems = [
    {
      num: "01",
      heading: "DEMOCRATIZAMOS LA ESCALA",
      body: "Tecnología de alto nivel y captación masiva sin fricción operativa para multiplicar tu rentabilidad.",
    },
    {
      num: "02",
      heading: "INFRAESTRUCTURA EN AUTOMÁTICO",
      body: "Ecosistemas diseñados para convertir visitantes en clientes recurrentes las 24 horas.",
    },
    {
      num: "03",
      heading: "DOS CAMINOS DE CRECIMIENTO",
      body: "Potencia corporativa para empresas y modelo 80/20 sin inversión inicial para profesionales.",
    },
    {
      num: "04",
      heading: "ENFOQUE EN RESULTADOS",
      body: "Nosotros diseñamos, posicionamos y aceleramos; tú te enfocas en lo que mejor sabes hacer.",
    },
  ];

  // ECOSISTEMA 01: SOLUCIONES CORPORATIVAS — Iniciales gigantes + síntesis precisa (Estilo 00:04 A / B / G)
  const corporatePillars = [
    {
      code: "01",
      letter: "W",
      title: "E-COMMERCE & WEB DE ALTO IMPACTO",
      description:
        "Tiendas online y sitios corporativos rápidos, seguros y optimizados para la conversión (CRO). Cero límites técnicos.",
    },
    {
      code: "02",
      letter: "G",
      title: "POSICIONAMIENTO SEO, GEO & MAPS",
      description:
        "Dominio orgánico en Google, motores de Inteligencia Artificial (GEO) y Google Business justo cuando tus clientes buscan comprar.",
    },
    {
      code: "03",
      letter: "A",
      title: "TRÁFICO PAGADO · SEM & META ADS",
      description:
        "No compramos clics, compramos rentabilidad. Campañas de alta precisión enfocadas en ROI y leads calificados.",
    },
  ];

  // ECOSISTEMA 02: IMPULSO PROFESIONALES (MODELO 80/20) — Iniciales gigantes + síntesis directa
  const professionalPillars = [
    {
      code: "01",
      letter: "E",
      title: "ÉXITO COMPARTIDO · MODELO 80/20",
      description:
        "Cero inversión inicial en web. Construimos tu plataforma de reservas: 80% para ti, 20% por cita concretada. Si tú no ganas, nosotros tampoco.",
    },
    {
      code: "02",
      letter: "I",
      title: "RECEPCIONISTA IA EN WHATSAPP 24/7",
      description:
        "Tu asistente con Inteligencia Artificial responde consultas, perfila clientes y agenda citas en automático mientras trabajas.",
    },
    {
      code: "03",
      letter: "M",
      title: "AUTORIDAD LOCAL EN GOOGLE MAPS",
      description:
        "Posicionamos tu oficio como Área de Servicio para dominar las búsquedas de tu zona sin exponer tu dirección personal.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: bgPrimary,
        color: textPrimary,
      }}
      className="relative min-h-screen overflow-hidden transition-colors duration-200"
    >
      {/* BARRA SUPERIOR DE PROGRESO CON EL GRADIENTE DIGITALPRO */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-digital-gradient opacity-95 pointer-events-none" />

      {/* NAVBAR MINIMALISTA ESTILO DIGITALPRO */}
      <header
        style={{
          backgroundColor: navBg,
          borderColor,
        }}
        className="fixed top-[3px] inset-x-0 z-50 border-b backdrop-blur-xl transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Izquierda: Menú Hamburguesa + Links directos */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              style={{
                borderColor,
                color: textPrimary,
              }}
              aria-label="Abrir menú"
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 border hover:border-[#9E38F5] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <>
                  <span
                    style={{ backgroundColor: textPrimary }}
                    className="w-5 h-[1.5px] block"
                  />
                  <span
                    style={{ backgroundColor: textPrimary }}
                    className="w-5 h-[1.5px] block"
                  />
                </>
              )}
            </button>

            <nav
              style={{ color: textSecondary }}
              className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.16em] font-medium"
            >
              <a href="#manifiesto" className="hover:text-white transition-colors">
                Manifiesto
              </a>
              <a href="#corporativo" className="hover:text-white transition-colors">
                Corporativo
              </a>
              <a href="#profesionales" className="hover:text-white transition-colors">
                Modelo 80/20
              </a>
              <a href="#caso-estudio" className="hover:text-white transition-colors">
                Casos
              </a>
            </nav>
          </div>

          {/* Centro: Marca DYNAMO® */}
          <a href="#" className="flex items-center gap-1 shrink-0">
            <span className="font-display font-extrabold text-lg sm:text-2xl tracking-wider uppercase">
              DYNAMO<span className="text-digital-gradient">SOLUTIONS</span>
            </span>
            <sup className="text-[10px] font-mono text-[#9E38F5] font-bold">
              ®
            </sup>
          </a>

          {/* Derecha: Luminosidad + GET STARTED / AGENDAR */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div
              style={{
                backgroundColor: isLightModeSide
                  ? "rgba(0,0,0,0.06)"
                  : "rgba(255,255,255,0.04)",
                borderColor,
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 border"
              title="Nivelar luminosidad"
            >
              <Moon
                style={{ color: luminosity < 35 ? "#9E38F5" : textMuted }}
                className="w-3.5 h-3.5 shrink-0"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={luminosity}
                onChange={(e) => setLuminosity(Number(e.target.value))}
                aria-label="Luminosidad"
                className="w-12 sm:w-16 h-1.5 rounded-lg appearance-none cursor-pointer accent-[#9E38F5]"
                style={{
                  background:
                    "linear-gradient(to right, #050508 0%, #52525b 50%, #f4f4f5 100%)",
                }}
              />
              <Sun
                style={{ color: luminosity > 65 ? "#FF5864" : textMuted }}
                className="w-3.5 h-3.5 shrink-0"
              />
            </div>

            <a
              href="#agendar"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-display font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
              <span>AGENDAR</span>
            </a>
          </div>
        </div>

        {/* Menú Desplegable */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ backgroundColor: bgCard, borderColor }}
              className="border-t overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                  {[
                    { label: "01. Manifiesto", href: "#manifiesto" },
                    { label: "02. Corporativo", href: "#corporativo" },
                    { label: "03. Modelo 80/20", href: "#profesionales" },
                    { label: "04. Caso Bellacy", href: "#caso-estudio" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ color: textPrimary }}
                      className="text-xs font-display uppercase tracking-wider py-1.5 hover:text-[#B832F5] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <a
                  href="#agendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-digital-outline px-5 py-3 text-xs font-display font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 text-white"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_10px_#9E38F5]" />
                  <span>AGENDAR REUNIÓN</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          1. HERO SECTION (Frase solicitada en el título + Video de Fondo + Menos es Más)
         ===================================================================== */}
      <section className="relative min-h-screen pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 flex flex-col justify-between overflow-hidden">
        {/* Video de Fondo con 50% de transparencia + Onda Topográfica */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/ahsxrxpv/video/upload/v1792510146/6930814-uhd_3840_2160_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center opacity-75 mix-blend-screen">
            <TopographicWaveSVG className="w-full h-full max-w-6xl animate-float-slow" />
          </div>
          <div
            style={{
              background: `linear-gradient(to top, ${bgPrimary} 4%, transparent 55%, rgba(0,0,0,0.45) 100%)`,
            }}
            className="absolute inset-0"
          />
        </div>

        <div className="hidden sm:block" />

        {/* TITULAR MONUMENTAL CON LA FRASE EXACTA PEDIDA POR EL USUARIO */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-12 sm:py-20 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUpBlur}
            className="font-display font-extrabold uppercase text-2xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.06] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.85)]"
          >
            <span className="block mb-1.5 sm:mb-2">
              NO SOMOS UNA AGENCIA TRADICIONAL;
            </span>
            <span className="block mb-1.5 sm:mb-2">
              SOMOS ARQUITECTOS DE
            </span>
            <span className="block">
              <span className="text-digital-gradient">
                ECOSISTEMAS DIGITALES.
              </span>
              <span className="inline-block w-[4px] sm:w-[6px] h-[0.82em] bg-white ml-2 sm:ml-3 animate-cursor-blink align-middle shadow-[0_0_15px_#ffffff]" />
            </span>
          </motion.h1>
        </div>

        {/* BARRA INFERIOR EN 3 COLUMNAS MINIMALISTAS (Idéntica a 00:00 del video DigitalPro) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          {/* Izquierda: Número clave en gradiente */}
          <motion.div
            variants={fadeUpBlur}
            className="md:col-span-3 flex items-center gap-3.5"
          >
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-digital-gradient leading-none">
              +330%
            </span>
            <span className="text-xs text-zinc-300 font-light leading-snug max-w-[140px]">
              retorno y escala comprobada
            </span>
          </motion.div>

          {/* Centro: Frase corta y punzante */}
          <motion.p
            variants={fadeUpBlur}
            className="md:col-span-5 text-xs sm:text-sm text-zinc-200 font-light leading-relaxed"
          >
            Tu negocio en piloto automático.Tu crecimiento, sin límites.
            Posicionamiento, automatización e IA que convierten visitas en
            clientes recurrentes.
          </motion.p>

          {/* Derecha: Un único botón rectangular con borde gradiente como en "CONTACT US" */}
          <motion.div
            variants={fadeUpBlur}
            className="md:col-span-4 flex md:justify-end"
          >
            <a
              href="#agendar"
              className="btn-digital-outline w-full sm:w-auto px-8 py-4 text-xs font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
              <span>AGENDAR AUDITORÍA</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================================
          2. EL MANIFIESTO (Layout 00:02-00:03: 01, 02, 03, 04 Concisos + Anillos 3D + Cuadrícula Interactiva)
         ===================================================================== */}
      <section
        id="manifiesto"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setManifestoMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          });
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          if (!touch) return;
          const rect = e.currentTarget.getBoundingClientRect();
          setManifestoMouse({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
            active: true,
          });
        }}
        onMouseLeave={() =>
          setManifestoMouse((prev) => ({ ...prev, active: false }))
        }
        style={{ borderColor }}
        className="relative py-24 sm:py-32 px-4 sm:px-6 border-t overflow-hidden scroll-mt-20"
      >
        {/* CUADRÍCULA DE LÍNEAS INTERACTIVAS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${borderColor} 1px, transparent 1px), linear-gradient(to bottom, ${borderColor} 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
              transform: manifestoMouse.active
                ? `translate3d(${(manifestoMouse.x - 600) * -0.012}px, ${(manifestoMouse.y - 300) * -0.012}px, 0)`
                : "translate3d(0px, 0px, 0)",
            }}
            className="absolute inset-0 opacity-40 transition-transform duration-300 ease-out"
          />

          <div
            style={{
              backgroundImage:
                "linear-gradient(to right, #9E38F5 1.5px, transparent 1.5px), linear-gradient(to bottom, #FF5864 1.5px, transparent 1.5px)",
              backgroundSize: "56px 56px",
              transform: manifestoMouse.active
                ? `translate3d(${(manifestoMouse.x - 600) * 0.024}px, ${(manifestoMouse.y - 300) * 0.024}px, 0)`
                : "translate3d(0px, 0px, 0)",
              WebkitMaskImage: `radial-gradient(340px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              maskImage: `radial-gradient(340px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              opacity: manifestoMouse.active ? 1 : 0,
            }}
            className="absolute inset-0 transition-opacity duration-300 ease-out drop-shadow-[0_0_12px_rgba(158,56,245,0.85)]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Izquierda: Título "POR QUÉ DYNAMO PRO" + 4 puntos concisos */}
            <div className="lg:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpBlur}
                className="mb-12 sm:mb-14"
              >
                <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                  <span className="block">EL MANIFIESTO</span>
                  <span className="block">
                    <span className="text-digital-gradient">DYNAMO</span>
                    <span className="inline-block w-[4px] sm:w-[5px] h-[0.82em] bg-white ml-2 animate-cursor-blink align-middle" />
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="space-y-7 sm:space-y-8"
              >
                {manifestoItems.map((item, idx) => (
                  <motion.div
                    key={item.num}
                    variants={fadeUpBlur}
                    style={{ borderColor }}
                    className="pb-7 sm:pb-8 border-b last:border-b-0 grid grid-cols-12 gap-4 items-start group"
                  >
                    <div className="col-span-2 flex flex-col items-start gap-2.5 pt-0.5">
                      <WireframeSphereIcon index={idx} />
                      <span
                        style={{ color: textMuted }}
                        className="font-mono text-xs tracking-widest group-hover:text-[#B832F5] transition-colors"
                      >
                        {item.num}
                      </span>
                    </div>

                    <div className="col-span-10">
                      <h3 className="font-display font-bold uppercase text-sm sm:text-base md:text-lg tracking-wide mb-2 group-hover:text-[#E24497] transition-colors">
                        {item.heading}
                      </h3>
                      <p
                        style={{ color: textSecondary }}
                        className="text-xs sm:text-sm font-light leading-relaxed max-w-xl"
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Derecha: Escultura 3D limpia como en el segundo 00:02-00:03 del video */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <IridescentRingsSculpture />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SOLUCIONES CORPORATIVAS (Tarjetas A / B / G limpias estilo 00:04 del video)
         ===================================================================== */}
      <section
        id="corporativo"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-4"
          >
            <div>
              <div
                style={{ color: textMuted }}
                className="text-[11px] font-mono uppercase tracking-[0.22em] mb-2"
              >
                01 // EMPRESAS & PYMES
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                SOLUCIONES{" "}
                <span className="text-digital-gradient">CORPORATIVAS</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="text-xs sm:text-sm font-light max-w-xs"
            >
              Infraestructura digital, posicionamiento y pauta de alto retorno.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {corporatePillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeUpBlur}
                whileHover={{ y: -6 }}
                style={{ backgroundColor: bgCard, borderColor }}
                className="group relative border p-7 sm:p-9 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] overflow-hidden transition-all"
              >
                <div className="absolute -top-6 -right-12 w-72 h-56 opacity-45 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <TopographicWaveSVG className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div
                    style={{ color: textMuted }}
                    className="font-mono text-xs tracking-widest mb-2"
                  >
                    {pillar.code}
                  </div>
                  <div className="font-display-light text-7xl sm:text-8xl leading-none text-digital-gradient select-none mb-6">
                    {pillar.letter}
                  </div>
                </div>

                <div className="relative z-10 my-auto">
                  <h3 className="font-display font-bold uppercase text-base sm:text-lg leading-snug mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p
                    style={{ color: textSecondary }}
                    className="text-xs sm:text-sm font-light leading-relaxed"
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6">
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider group-hover:text-[#E24497] transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                    <span>EMPEZAR</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          4. IMPULSO PARA PROFESIONALES · MODELO 80/20 (Tarjetas E / I / M limpias)
         ===================================================================== */}
      <section
        id="profesionales"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-4"
          >
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#E24497] mb-2">
                02 // BARBEROS · ESTÉTICA · TÉCNICOS · OFICIOS
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                IMPULSO{" "}
                <span className="text-digital-gradient">MODELO 80/20</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="text-xs sm:text-sm font-light max-w-xs"
            >
              Digitalizamos tu oficio con $0 de inversión inicial. Crecemos a
              comisión contigo.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {professionalPillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeUpBlur}
                whileHover={{ y: -6 }}
                style={{ backgroundColor: bgCard, borderColor }}
                className="group relative border p-7 sm:p-9 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] overflow-hidden transition-all"
              >
                <div className="absolute -top-6 -right-12 w-72 h-56 opacity-45 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <TopographicWaveSVG className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div
                    style={{ color: textMuted }}
                    className="font-mono text-xs tracking-widest mb-2"
                  >
                    {pillar.code}
                  </div>
                  <div className="font-display-light text-7xl sm:text-8xl leading-none text-digital-gradient select-none mb-6">
                    {pillar.letter}
                  </div>
                </div>

                <div className="relative z-10 my-auto">
                  <h3 className="font-display font-bold uppercase text-base sm:text-lg leading-snug mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p
                    style={{ color: textSecondary }}
                    className="text-xs sm:text-sm font-light leading-relaxed"
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6">
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider group-hover:text-[#E24497] transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                    <span>APLICAR AL 80/20</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          5. CASO DE ESTUDIO: THE BELLACY STUDIO (Estilo "CASES" 00:06 + Tarjeta Interactiva Izquierda a Derecha Concisa)
         ===================================================================== */}
      <section
        id="caso-estudio"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabecera idéntica en estructura a "CASES" (00:06 del video) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="grid lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16"
          >
            <div className="lg:col-span-3">
              <div className="text-xs font-mono uppercase tracking-wider">
                <span className="text-digital-gradient font-bold text-base">
                  +330%
                </span>{" "}
                <span style={{ color: textSecondary }}>en 3 meses</span>
              </div>
              <p
                style={{ color: textMuted }}
                className="text-xs font-light mt-0.5"
              >
                De US$ 300 a US$ 1.300 / mes
              </p>
            </div>

            <div className="lg:col-span-9 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                CASO{" "}
                <span className="text-digital-gradient">BELLACY STUDIO</span>
              </h2>
              <span
                style={{ color: textMuted }}
                className="text-xs font-mono uppercase tracking-wider"
              >
                ← DESLIZA LA TARJETA →
              </span>
            </div>
          </motion.div>

          {/* TARJETA INTERACTIVA ANTES / DESPUÉS (Directa, limpia y sin exceso de texto como en 00:06) */}
          <div
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              revealRaw.set(Math.max(0, Math.min(100, pct)));
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              if (!touch) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((touch.clientX - rect.left) / rect.width) * 100;
              revealRaw.set(Math.max(0, Math.min(100, pct)));
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              revealRaw.set(pct > 50 ? 100 : 0);
            }}
            className="relative grid grid-cols-1 overflow-hidden border border-white/15 select-none cursor-ew-resize touch-pan-y group shadow-2xl"
          >
            {/* CAPA 1: BEFORE (US$ 300 / MES) */}
            <div className="col-start-1 row-start-1 w-full bg-[#07070C] text-white p-6 sm:p-12 md:p-14 flex flex-col justify-between relative">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Columna Izquierda estilo ECOLINE 00:06 */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-display font-bold text-xs text-zinc-400">
                      BS
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase text-lg sm:text-xl tracking-wide text-zinc-200">
                        THE BELLACY STUDIO
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Estudio de Estética · Estado Inicial
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:gap-10 py-6 border-y border-zinc-800/90 mb-6">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        Facturación mensual
                      </div>
                      <div className="font-display font-extrabold text-2xl sm:text-4xl text-zinc-300">
                        US$ 300{" "}
                        <span className="text-xs font-mono font-normal text-zinc-500">
                          /mes
                        </span>
                      </div>
                      <div className="mt-3 inline-block text-xs font-display font-bold uppercase tracking-widest text-zinc-400 border-b-2 border-zinc-600 pb-0.5">
                        BEFORE
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        Diagnóstico previo
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        Visibilidad local mínima en Google Maps y captación
                        limitada al boca a boca.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed max-w-xl">
                    &ldquo;El desafío no era la calidad del servicio, sino su
                    visibilidad digital. Sin pauta activa ni posicionamiento
                    local estructurado.&rdquo;
                  </p>
                </div>

                {/* Columna Derecha: Puntos clave concisos */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { k: "US$ 300", v: "Ingresos mensuales" },
                    { k: "0 ADS", v: "Sin campañas activas" },
                    { k: "BAJA", v: "Visibilidad en Maps" },
                    { k: "MANUAL", v: "Sin sistema predecible" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-zinc-900/60 border border-zinc-800/80"
                    >
                      <div className="font-display font-bold text-base sm:text-lg text-zinc-300 mb-1">
                        {m.k}
                      </div>
                      <div className="text-[11px] text-zinc-500">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>01 / 01 · BEFORE</span>
                <span>← DESLIZA PARA REVELAR EL AFTER →</span>
              </div>
            </div>

            {/* CAPA 2: AFTER (US$ 1.300 / MES - Gradiente DigitalPro) */}
            <motion.div
              style={{
                clipPath: afterClipPath,
                scale: afterScale,
              }}
              className="col-start-1 row-start-1 w-full bg-gradient-to-br from-[#2B1FA8] via-[#6D1EB8] to-[#C82D67] text-white p-6 sm:p-12 md:p-14 flex flex-col justify-between relative z-10 origin-left"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center font-display font-bold text-xs text-white">
                      BS
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase text-lg sm:text-xl tracking-wide text-white">
                        THE BELLACY STUDIO
                      </h3>
                      <p className="text-xs text-white/75">
                        Ecosistema Google Maps + Pauta Precisa
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:gap-10 py-6 border-y border-white/20 mb-6">
                    <div>
                      <div className="text-xs text-white/75 mb-1">
                        Facturación alcanzada
                      </div>
                      <div className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                        US$ 1.300{" "}
                        <span className="text-xs font-mono font-normal text-white/80">
                          /mes
                        </span>
                      </div>
                      <div className="mt-3 inline-block text-xs font-display font-bold uppercase tracking-widest text-white border-b-2 border-[#FF5864] pb-0.5">
                        AFTER (+330%)
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-white/75 mb-1">
                        Resultado en 3 meses
                      </div>
                      <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                        De US$ 300 a US$ 1.300 mensuales con flujo constante y
                        predecible de clientes.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed max-w-xl">
                    &ldquo;Reestructuración completa en Google Maps + campañas
                    de anuncios precisas: de $300 USD a $1.300 USD mensuales en
                    tan solo 3 meses.&rdquo;
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { k: "US$ 1.300", v: "Facturación mensual" },
                    { k: "+330%", v: "Crecimiento directo" },
                    { k: "3 MESES", v: "Tiempo de ejecución" },
                    { k: "TOP MAPS", v: "Flujo predecible" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-black/35 backdrop-blur-md border border-white/20"
                    >
                      <div className="font-display font-bold text-base sm:text-lg text-white mb-1">
                        {m.k}
                      </div>
                      <div className="text-[11px] text-white/80">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white">
                <span>01 / 01 · AFTER (VERIFIED ROI)</span>
                <span>DE US$ 300 A US$ 1.300 / MES</span>
              </div>
            </motion.div>

            {/* HAZ LÁSER ESCÁNER CON INERCIA SPRING */}
            <motion.div
              style={{ left: beamLeft }}
              className="absolute inset-y-0 z-20 pointer-events-none -translate-x-1/2 flex items-center justify-center"
            >
              <div className="absolute right-0 w-16 sm:w-24 h-full bg-gradient-to-l from-white/30 via-[#9E38F5]/35 to-transparent blur-xl -skew-x-3" />
              <div className="w-[2px] h-[110%] bg-gradient-to-b from-[#5246FF] via-white to-[#FF5864] shadow-[0_0_20px_#ffffff,0_0_40px_#9E38F5] -rotate-[2deg]" />
              <div className="relative w-10 h-10 bg-black/90 backdrop-blur-xl text-white shadow-[0_0_25px_rgba(158,56,245,0.9)] border border-white/40 flex items-center justify-center font-mono text-xs group-hover:scale-110 transition-transform">
                <span className="text-digital-gradient font-bold">↔</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. CTA FINAL + FOOTER (Idéntico a 00:07-00:08 "LET'S BEGIN COOPERATION")
         ===================================================================== */}
      <section
        id="agendar"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 border-t overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <TopographicWaveSVG className="w-full h-full max-w-6xl animate-float-slow" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpBlur}
          className="relative z-10 max-w-5xl mx-auto text-center mb-24 sm:mb-32"
        >
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight mb-5">
            <span className="block">INICIEMOS LA</span>
            <span className="block">
              <span className="text-digital-gradient">COOPERACIÓN</span>
              <span className="inline-block w-[4px] sm:w-[6px] h-[0.82em] bg-white ml-2 sm:ml-3 animate-cursor-blink align-middle" />
            </span>
          </h2>

          <p
            style={{ color: textSecondary }}
            className="text-xs sm:text-sm md:text-base font-light mb-10 max-w-md mx-auto"
          >
            Agenda una reunión estratégica de 30 minutos para evaluar tu
            ecosistema y escalar tus resultados.
          </p>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-digital-outline px-10 py-5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_14px_#9E38F5]" />
              <span>CONTACTAR AHORA</span>
            </motion.button>
          </div>
        </motion.div>

        <footer
          style={{ borderColor }}
          className="relative z-10 max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-1">
            <span className="font-display font-extrabold text-base uppercase tracking-wider">
              DYNAMO<span className="text-digital-gradient">SOLUTIONS</span>
            </span>
            <sup className="text-[10px] font-mono text-[#9E38F5] font-bold">
              ®
            </sup>
          </div>

          <div
            style={{ color: textMuted }}
            className="font-mono text-[11px] text-center sm:text-right"
          >
            © 2026 DYNAMO SOLUTIONS. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </footer>
      </section>
    </div>
  );
}
